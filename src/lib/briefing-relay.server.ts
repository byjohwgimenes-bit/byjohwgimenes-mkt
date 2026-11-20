import { z } from 'zod';
import { MAX_BRIEFING_BYTES, parseSubmission, submissionFailure, type SubmissionResult } from './briefing-submission';

// Origin confirmed by project_urls.get_urls; no caller-supplied URL or redirects.
export const BRIEFING_ENDPOINT = 'https://byjohwgimenes-mkt.lovable.app/api/public/briefing-submission';
const ENDPOINT_PATH = '/api/public/briefing-submission';
export const RELAY_TIMEOUT_MS = 10_000;
export const SIGNATURE_WINDOW_SECONDS = 300;
const referenceSchema = z.object({ reference: z.string().min(1).max(120) }).strict();
const encoder = new TextEncoder();

async function hmacKey(secret: string) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}
function signedMessage(timestamp: string, body: string) {
  return encoder.encode(`POST\n${ENDPOINT_PATH}\n${timestamp}\n${body}`);
}
export async function signBriefingBody(secret: string, timestamp: string, body: string) {
  const bytes = new Uint8Array(await crypto.subtle.sign('HMAC', await hmacKey(secret), signedMessage(timestamp, body)));
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Stream limits cover chunked payloads as well as bodies with no Content-Length.
export async function readLimitedBody(body: ReadableStream<Uint8Array> | null, limit: number): Promise<string> {
  if (!body) throw new Error('Missing body');
  const reader = body.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw new Error('Payload too large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

export async function relayBriefing(input: unknown, secret: string | undefined, transport: typeof fetch = fetch): Promise<SubmissionResult> {
  if (!secret || secret.length < 32) return submissionFailure();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), RELAY_TIMEOUT_MS);
  try {
    const body = JSON.stringify(parseSubmission(input));
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = await signBriefingBody(secret, timestamp, body);
    const response = await transport(BRIEFING_ENDPOINT, {
      method: 'POST', redirect: 'manual', signal: controller.signal,
      headers: { 'Content-Type': 'application/json', 'X-Briefing-Timestamp': timestamp, 'X-Briefing-Signature': signature }, body,
    });
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('application/json')) return submissionFailure();
    const result = referenceSchema.safeParse(JSON.parse(await readLimitedBody(response.body, 2048)));
    return result.success ? { ok: true, reference: result.data.reference } : submissionFailure();
  } catch { return submissionFailure(); }
  finally { clearTimeout(timeout); }
}

function reply(status: number, reference?: string) {
  return Response.json(reference ? { reference } : { error: 'Envio indisponível' }, {
    status, headers: { 'Cache-Control': 'no-store' },
  });
}

// The raw HTTP receiver has no public read route and never invokes the relay.
export async function receiveBriefing(request: Request, options: {
  secret: string | undefined; enabled: boolean;
  save: (input: unknown) => Promise<SubmissionResult>;
  now?: number;
}): Promise<Response> {
  if (request.method !== 'POST') return reply(405);
  if (!options.enabled || !options.secret || options.secret.length < 32) return reply(503);
  if (request.headers.get('content-type')?.split(';')[0]?.trim() !== 'application/json') return reply(415);
  const timestamp = request.headers.get('X-Briefing-Timestamp') ?? '';
  const signature = request.headers.get('X-Briefing-Signature') ?? '';
  if (!/^\d{10}$/.test(timestamp) || !/^[a-f0-9]{64}$/.test(signature) ||
    Math.abs(Math.floor((options.now ?? Date.now()) / 1000) - Number(timestamp)) > SIGNATURE_WINDOW_SECONDS) return reply(401);
  const contentLength = request.headers.get('content-length');
  if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_BRIEFING_BYTES)) return reply(413);
  let body: string;
  try { body = await readLimitedBody(request.body, MAX_BRIEFING_BYTES); }
  catch { return reply(413); }
  const signatureBytes = Uint8Array.from(signature.match(/.{2}/g) ?? [], hex => parseInt(hex, 16));
  const verified = await crypto.subtle.verify('HMAC', await hmacKey(options.secret), signatureBytes, signedMessage(timestamp, body));
  if (!verified) return reply(401);
  let input: unknown;
  try { input = parseSubmission(JSON.parse(body)); }
  catch { return reply(400); }
  try {
    const result = await options.save(input);
    return result.ok ? reply(200, result.reference) : reply(503);
  } catch { return reply(503); }
}