CREATE TABLE public.briefings (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 submission_key uuid NOT NULL UNIQUE,
 reference text NOT NULL UNIQUE DEFAULT ('BJ-' || upper(replace(gen_random_uuid()::text, '-', ''))),
 name text NOT NULL,
 business_name text NOT NULL,
 services text[] NOT NULL,
 answers jsonb NOT NULL,
 consent boolean NOT NULL,
 status text NOT NULL DEFAULT 'novo',
 internal_notes text,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT briefings_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
 CONSTRAINT briefings_business_length CHECK (char_length(business_name) BETWEEN 2 AND 120),
 CONSTRAINT briefings_services_count CHECK (cardinality(services) BETWEEN 1 AND 12),
 CONSTRAINT briefings_consent CHECK (consent = true),
 CONSTRAINT briefings_status CHECK (status IN ('novo','em_atendimento','proposta_enviada','fechado','nao_avancou')),
 CONSTRAINT briefings_answers_object CHECK (jsonb_typeof(answers) = 'object' AND octet_length(answers::text) <= 60000),
 CONSTRAINT briefings_notes_length CHECK (internal_notes IS NULL OR char_length(internal_notes) <= 5000)
);
GRANT SELECT, UPDATE ON public.briefings TO authenticated;
GRANT ALL ON public.briefings TO service_role;
ALTER TABLE public.briefings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin reads briefings" ON public.briefings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "admin updates briefings" ON public.briefings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role)) WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE INDEX briefings_created_at_idx ON public.briefings(created_at DESC);
CREATE INDEX briefings_status_idx ON public.briefings(status);
CREATE TRIGGER briefings_updated_at BEFORE UPDATE ON public.briefings FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
COMMENT ON TABLE public.briefings IS 'Private project briefings. Public submission only through validated server function; no public read or direct insert.';