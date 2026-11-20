import { createServerFn } from '@tanstack/react-start';
import { parseSubmission } from './briefing-submission';

export const submitBriefing = createServerFn({method:'POST'})
 .validator((input:unknown)=>parseSubmission(input))
 .handler(async({data})=>{
  // Netlify never needs or exports a privileged database credential.
  if (process.env['BRIEFING_SUBMISSION_MODE'] === 'relay' || process.env['NETLIFY'] === 'true' ||
      !process.env['SUPABASE_URL'] || !process.env['SUPABASE_SERVICE_ROLE_KEY']) {
    const { relayBriefing } = await import('./briefing-relay.server');
    return relayBriefing(data, process.env['BRIEFING_RELAY_SECRET']);
  }
  const { saveBriefingLocally } = await import('./briefing-storage.server');
  return saveBriefingLocally(data);
 });
