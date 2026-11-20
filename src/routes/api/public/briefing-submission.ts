import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/public/briefing-submission')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { receiveBriefing } = await import('@/lib/briefing-relay.server');
        return receiveBriefing(request, {
          secret: process.env['BRIEFING_RELAY_SECRET'],
          enabled: process.env['BRIEFING_SUBMISSION_MODE'] !== 'relay' &&
            process.env['NETLIFY'] !== 'true' && Boolean(process.env['SUPABASE_URL'] && process.env['SUPABASE_SERVICE_ROLE_KEY']),
          save: async (input) => {
            const { saveBriefingLocally } = await import('@/lib/briefing-storage.server');
            return saveBriefingLocally(input);
          },
        });
      },
      GET: () => new Response(null, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } }),
    },
  },
});