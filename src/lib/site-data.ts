import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Plan = {
  id: string;
  name: string;
  description: string;
  price: string | null;
  deliveries: string | null;
  sort_order: number;
};
export type Settings = {
  whatsapp_number: string | null;
  contact_email: string | null;
  instagram: string | null;
};

export const plansQuery = queryOptions({
  queryKey: ["plans"],
  queryFn: async (): Promise<Plan[]> => {
    const { data, error } = await supabase.from("plans").select("*").order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const settingsQuery = queryOptions({
  queryKey: ["settings"],
  queryFn: async (): Promise<Settings> => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("whatsapp_number, contact_email, instagram")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return data ?? { whatsapp_number: null, contact_email: null, instagram: null };
  },
});

export const CUSTOM_PLAN = "Quero uma proposta personalizada";
