import { describe, expect, it } from "vitest";
import { buildLeadMessage, whatsappLink } from "@/lib/whatsapp";

describe("WhatsApp link", () => {
  it("returns no link when no number is configured", () => {
    expect(whatsappLink(null, "oi")).toBeNull();
    expect(whatsappLink("", "oi")).toBeNull();
    expect(whatsappLink("123")).toBeNull();
  });

  it("uses the configured number with country code and the encoded message", () => {
    expect(whatsappLink("+55 (11) 99999-0000", "Olá mundo")).toBe(
      "https://wa.me/5511999990000?text=Ol%C3%A1%20mundo",
    );
  });

  it("message includes name, business, city, plan and goal", () => {
    const m = buildLeadMessage({
      name: "Ana",
      business_name: "Padaria X",
      city: "Suzano",
      plan_interest: "Plano Presença",
      goal: "Organizar posts",
    });
    for (const part of ["Ana", "Padaria X", "Suzano", "Plano Presença", "Organizar posts"]) {
      expect(m).toContain(part);
    }
  });
});
