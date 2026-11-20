import { persistSubmission, submissionFailure, type BriefingStore } from './briefing-submission';

export async function saveBriefingLocally(input: unknown) {
  try {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const store: BriefingStore = {
      async insert(data) {
        const { data: created, error } = await supabaseAdmin.from('briefings').insert({
          submission_key: data.submission_key, name: data.answers['name'] ?? '',
          business_name: data.answers['business_name'] ?? '', services: data.services,
          answers: data.answers, consent: data.consent,
        }).select('reference').single();
        if (!error && created) return created;
        return error?.code === '23505' ? 'duplicate' : null;
      },
      async find(key) {
        const { data, error } = await supabaseAdmin.from('briefings')
          .select('reference,services,answers,consent').eq('submission_key', key).maybeSingle();
        if (error || !data || !data.answers || typeof data.answers !== 'object' || Array.isArray(data.answers)) return null;
        const answers: Record<string, string> = {};
        for (const [key, value] of Object.entries(data.answers)) {
          if (typeof value !== 'string') return null;
          answers[key] = value;
        }
        return { reference: data.reference, services: data.services, consent: data.consent, answers };
      },
    };
    return await persistSubmission(input, store);
  } catch { return submissionFailure(); }
}