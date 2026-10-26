export type LeadSummary = {
  name: string;
  business_name: string;
  city: string;
  plan_interest: string;
  goal: string;
};

/** Keeps digits only. Returns null when the number is too short to be a valid international number. */
export function normalizeWhatsapp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return null;
  return digits;
}

export function buildLeadMessage(l: LeadSummary): string {
  return [
    "Olá! Vim pelo site da ByJohwGimenes MKT e gostaria de conversar sobre os planos.",
    "",
    `Nome: ${l.name}`,
    `Negócio: ${l.business_name}`,
    `Cidade: ${l.city}`,
    `Plano de interesse: ${l.plan_interest}`,
    `Objetivo: ${l.goal}`,
  ].join("\n");
}

/** Returns a wa.me link, or null when no valid number is configured (never a broken link). */
export function whatsappLink(number: string | null | undefined, message?: string): string | null {
  const n = normalizeWhatsapp(number);
  if (!n) return null;
  return message ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : `https://wa.me/${n}`;
}
