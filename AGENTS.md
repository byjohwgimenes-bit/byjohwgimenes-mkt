<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Admin access is checked in the database (`has_role`, RLS on every table); the `/admin` page is client-only and only a UI gate. Why: hiding a page is not security.
- Public visitors may only INSERT leads (status forced to `novo`); they read only `plans` and `site_settings`. Why: lead/client data must stay admin-only.
- Lead→client conversion goes through the `convert_lead_to_client` DB function (one client per lead, unique `lead_id`). Why: prevents duplicates and retyping.
- Public signup is disabled; the first user added via the Users panel claims admin on first sign-in via `claim_first_admin`. Why: no hard-coded admin credentials.
- WhatsApp links are built only via `src/lib/whatsapp.ts`, which returns null without a valid configured number. Why: never show a broken or invented contact.
