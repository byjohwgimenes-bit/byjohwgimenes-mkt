ALTER TABLE public.clients ADD COLUMN briefing_id uuid REFERENCES public.briefings(id) ON DELETE RESTRICT;
CREATE UNIQUE INDEX clients_briefing_id_unique ON public.clients(briefing_id) WHERE briefing_id IS NOT NULL;
ALTER TABLE public.deliveries ADD COLUMN services text[] NOT NULL DEFAULT '{}';
CREATE OR REPLACE FUNCTION public.convert_briefing_to_client(_briefing_id uuid) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE b public.briefings%ROWTYPE; existing_id uuid; bridge_id uuid; result_id uuid;
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden' USING ERRCODE = '42501'; END IF;
 SELECT * INTO b FROM public.briefings WHERE id = _briefing_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Briefing not found'; END IF;
 SELECT id INTO existing_id FROM public.clients WHERE briefing_id = b.id;
 IF existing_id IS NOT NULL THEN RETURN existing_id; END IF;
 INSERT INTO public.leads(name,business_name,segment,city,whatsapp,instagram,plan_interest,goal,needs,consent,status) VALUES (b.name,b.business_name,'Não informado',concat_ws(' / ',b.answers->>'city',b.answers->>'state'),b.answers->>'whatsapp',nullif(b.answers->>'links',''),'Não definido',b.answers->>'goal',b.answers->>'business',b.consent,'cliente') RETURNING id INTO bridge_id;
 INSERT INTO public.clients(lead_id,briefing_id,plan) VALUES(bridge_id,b.id,NULL) RETURNING id INTO result_id;
 RETURN result_id;
END $$;
REVOKE ALL ON FUNCTION public.convert_briefing_to_client(uuid) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.convert_briefing_to_client(uuid) TO authenticated;
COMMENT ON COLUMN public.clients.briefing_id IS 'Persistent originating briefing; legacy clients retain their original lead link.';
COMMENT ON COLUMN public.clients.plan IS 'DEPRECATED for new clients: contracted services are managed per delivery; retained for historical records.';