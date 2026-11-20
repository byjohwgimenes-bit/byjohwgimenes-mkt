// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { SERVICES } from '@/lib/briefing';
import { parseSubmission, persistSubmission, MAX_BRIEFING_BYTES, type BriefingStore, type StoredSubmission } from '@/lib/briefing-submission';
import { BRIEFING_ENDPOINT, receiveBriefing, relayBriefing, signBriefingBody } from '@/lib/briefing-relay.server';

// Synthetic values only; no database client or network call in this suite.
const secret = 'synthetic-test-only-shared-signing-secret';
const valid = () => ({ submission_key: '00000000-0000-4000-8000-000000000001', services: [SERVICES[0]], consent: true,
  answers: { name: 'TESTE Local', business_name: 'TESTE Empresa', whatsapp: '(11) 99999-0000', city: 'Suzano', state: 'SP',
    business: 'Teste sintético', audience: 'Teste sintético', goal: 'Teste sintético', difficulty: 'Teste sintético', identity: 'Parcial', start: 'Estou pesquisando' } });
function memoryStore() {
  const rows = new Map<string, StoredSubmission>();
  const store: BriefingStore = {
    insert: vi.fn(async data => {
      if (rows.has(data.submission_key)) return 'duplicate';
      const row = { ...data, reference: 'BJ-LOCAL-ONLY' };
      rows.set(data.submission_key, row);
      return { reference: row.reference };
    }),
    find: vi.fn(async key => rows.get(key) ?? null),
  };
  return { rows, store };
}
async function signedRequest(body: string, timestamp = String(Math.floor(Date.now() / 1000))) {
  return new Request(BRIEFING_ENDPOINT, { method: 'POST', headers: {
    'Content-Type': 'application/json', 'X-Briefing-Timestamp': timestamp,
    'X-Briefing-Signature': await signBriefingBody(secret, timestamp, body),
  }, body });
}
describe('Briefing relay without production writes', () => {
  it('round-trips relay to receiver and returns only the reference; retry creates one row', async () => {
    const { rows, store } = memoryStore();
    const transport: typeof fetch = vi.fn(async (url, init) => {
      expect(url).toBe('https://byjohwgimenes-mkt.lovable.app/api/public/briefing-submission');
      expect(init?.redirect).toBe('manual');
      return receiveBriefing(new Request(url, init), { secret, enabled: true, save: input => persistSubmission(input, store) });
    });
    expect(await relayBriefing(valid(), secret, transport)).toEqual({ ok: true, reference: 'BJ-LOCAL-ONLY' });
    expect(await relayBriefing(valid(), secret, transport)).toEqual({ ok: true, reference: 'BJ-LOCAL-ONLY' });
    expect(rows.size).toBe(1);
  });
  it('never returns a reference for a conflicting retry', async () => {
    const { store } = memoryStore();
    await persistSubmission(valid(), store);
    expect((await persistSubmission({ ...valid(), answers: { ...valid().answers, goal: 'Outro objetivo' } }, store)).ok).toBe(false);
  });
  it('requires consent and strips inactive answers before storage', async () => {
    const { store, rows } = memoryStore();
    expect((await persistSubmission({ ...valid(), consent: false }, store)).ok).toBe(false);
    expect(store.insert).not.toHaveBeenCalled();
    await persistSubmission({ ...valid(), answers: { ...valid().answers, name: '  TESTE Local  ', ads_product: 'Hidden' } }, store);
    const row = rows.get(valid().submission_key);
    expect(row?.answers['name']).toBe('TESTE Local');
    expect(row?.answers['ads_product']).toBeUndefined();
  });
  it('rejects missing, expired and altered signatures before any write', async () => {
    const save = vi.fn();
    const options = { secret, enabled: true, save };
    expect((await receiveBriefing(new Request(BRIEFING_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }), options)).status).toBe(401);
    expect((await receiveBriefing(await signedRequest(JSON.stringify(valid()), String(Math.floor(Date.now() / 1000) - 301)), options)).status).toBe(401);
    const request = await signedRequest(JSON.stringify(valid()));
    expect((await receiveBriefing(new Request(BRIEFING_ENDPOINT, { method: 'POST', headers: request.headers, body: '{}' }), options)).status).toBe(401);
    expect(save).not.toHaveBeenCalled();
  });
  it('rejects oversized raw and serialized payloads', async () => {
    expect(() => parseSubmission({ ...valid(), extra: 'x'.repeat(MAX_BRIEFING_BYTES) })).toThrow();
    const save = vi.fn();
    expect((await receiveBriefing(await signedRequest('x'.repeat(MAX_BRIEFING_BYTES + 1)), { secret, enabled: true, save })).status).toBe(413);
    expect(save).not.toHaveBeenCalled();
  });
  it('fails closed when disabled or missing the dedicated secret', async () => {
    const save = vi.fn();
    expect((await receiveBriefing(await signedRequest('{}'), { secret, enabled: false, save })).status).toBe(503);
    const transport = vi.fn();
    expect((await relayBriefing(valid(), undefined, transport)).ok).toBe(false);
    expect(transport).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });
  it('rejects redirects, network failures and unexpected response fields', async () => {
    for (const response of [new Response(null, { status: 302 }), Response.json({ reference: 'BJ-LOCAL', answers: {} })]) {
      expect((await relayBriefing(valid(), secret, vi.fn(async () => response))).ok).toBe(false);
    }
    expect((await relayBriefing(valid(), secret, vi.fn(async () => { throw new Error('synthetic network error'); }))).ok).toBe(false);
  });
  it('never exposes a public read', async () => {
    const save = vi.fn();
    expect((await receiveBriefing(new Request(BRIEFING_ENDPOINT), { secret, enabled: true, save })).status).toBe(405);
    expect(save).not.toHaveBeenCalled();
  });
});