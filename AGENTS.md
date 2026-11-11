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
- Authorized portfolio PDFs stay byte-identical in permanent Lovable Assets with committed pointers; a shared manifest pairs originals with first-page covers, and native disclosure mounts only lazy covers, never prefetching PDFs. Why: repository size limits, durable originals and lightweight browsing; verify SHA256 against uploads after storage.
- Admin access is checked in the database (`has_role`, RLS on every table); the `/admin` page is client-only and only a UI gate. Why: hiding a page is not security.
- Public visitors may only INSERT leads (status forced to `novo`); they read only `plans` and `site_settings`. Why: lead/client data must stay admin-only.
- Lead→client conversion goes through the `convert_lead_to_client` DB function (one client per lead, unique `lead_id`). Why: prevents duplicates and retyping.
- Public signup is disabled; the first user added via the Users panel claims admin on first sign-in via `claim_first_admin`. Why: no hard-coded admin credentials.
- WhatsApp links are built only via `src/lib/whatsapp.ts`, which returns null without a valid configured number. Why: never show a broken or invented contact.

- New briefings live in an additive private table with admin-only RLS; the narrow public server function validates and writes without exposing a read endpoint. Why: preserve legacy records and prevent public response access.
- Submission UUIDs are retry keys, never public lookup keys; retries return only the reference after matching the full validated payload. Why: prevent duplicates without leaking another submission.
- Briefing schema and conditional field definitions are shared by form, server and admin/PDF views. Why: validation and exported answers stay consistent.
- PDF exports run client-side after admin RLS reads with an embedded Unicode font and omit internal notes. Why: selectable accented text without a public document endpoint.
- Official full and symbol logos are optional slots in the shared public shell, rendered with object-contain only after supplied. Why: never fabricate brand assets.
- Briefing conversion uses the admin-checked atomic `convert_briefing_to_client` RPC and unique `clients.briefing_id`; the legacy required lead link is populated only as a compatibility bridge. Why: preserve historical clients and prevent concurrent duplicate conversion without inferring contracted services.
- Contracted services are explicitly selected per delivery, not copied from briefing interests. Why: an inquiry is not a contract.
- Public content has independent leaf routes; case detail uses an unnested route. Why: each page needs shareable metadata and independent rendering.
- System typography and the existing palette are provisional pending official materials; optional portrait and gallery slots stay empty. Why: never represent invented assets as authorized branding.
