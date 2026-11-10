GRANT DELETE ON public.briefings TO authenticated;
DROP POLICY IF EXISTS "admin deletes briefings" ON public.briefings;
CREATE POLICY "admin deletes briefings" ON public.briefings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));
