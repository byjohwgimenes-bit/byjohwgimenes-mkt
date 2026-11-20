import { briefingSchema, cleanBriefing, type BriefingInput } from './briefing';

export const MAX_BRIEFING_BYTES = 64 * 1024;
export const SUBMISSION_FAILURE = 'Não foi possível salvar. Suas respostas continuam aqui; tente novamente.';
export type SubmissionResult = { ok: true; reference: string } | { ok: false; error: string };
export const submissionFailure = (): SubmissionResult => ({ ok: false, error: SUBMISSION_FAILURE });

export function parseSubmission(input: unknown): BriefingInput {
  const encoded = JSON.stringify(input);
  if (!encoded || new TextEncoder().encode(encoded).byteLength > MAX_BRIEFING_BYTES) {
    throw new Error('Payload inválido');
  }
  return cleanBriefing(briefingSchema.parse(input));
}

export type StoredSubmission = { services: string[]; answers: Record<string, string>; consent: boolean; reference: string };
export interface BriefingStore {
  insert(data: BriefingInput): Promise<{ reference: string } | 'duplicate' | null>;
  find(key: string): Promise<StoredSubmission | null>;
}

function canonicalAnswers(answers: Record<string, string>): string {
  return JSON.stringify(Object.entries(answers).sort(([a], [b]) => a.localeCompare(b)));
}

// The only retry read stays server-side and matches the entire normalized payload.
export async function persistSubmission(input: unknown, store: BriefingStore): Promise<SubmissionResult> {
  try {
    const data = parseSubmission(input);
    const inserted = await store.insert(data);
    if (inserted && inserted !== 'duplicate') return { ok: true, reference: inserted.reference };
    if (inserted === 'duplicate') {
      const previous = await store.find(data.submission_key);
      if (previous && previous.consent === data.consent &&
        JSON.stringify(previous.services) === JSON.stringify(data.services) &&
        canonicalAnswers(previous.answers) === canonicalAnswers(data.answers)) {
        return { ok: true, reference: previous.reference };
      }
    }
  } catch { /* Never expose payloads, credentials or database errors. */ }
  return submissionFailure();
}