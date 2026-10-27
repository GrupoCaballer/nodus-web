"use server";

import { z } from "zod";
import { SITE } from "@/lib/site";

export type EstadoNewsletter = { ok: true; dev?: boolean } | { ok: false; error: string };

const Schema = z.object({
  email: z.string().trim().email("Revisa el correo."),
  web: z.string().max(0).optional().or(z.literal("")),
});

/**
 * Alta en la newsletter. Con RESEND_API_KEY y RESEND_AUDIENCE_ID crea el contacto
 * en la audiencia de Resend; sin ellas, avisa por correo (o registra en consola).
 */
export async function suscribir(_prev: EstadoNewsletter | null, form: FormData): Promise<EstadoNewsletter> {
  const parsed = Schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa el correo." };
  if (parsed.data.web) return { ok: true };
  const email = parsed.data.email;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[newsletter] sin RESEND_API_KEY; alta no registrada:", email);
    return { ok: true, dev: true };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (audience) {
    const { error } = await resend.contacts.create({ audienceId: audience, email, unsubscribed: false });
    if (error) return { ok: false, error: "No hemos podido darte de alta. Escríbenos a " + SITE.email };
    return { ok: true };
  }
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Nodus Web <web@nodusrealestate.com>",
    to: process.env.CONTACT_TO ?? SITE.email,
    subject: "Web · Alta en newsletter",
    text: `Nuevo suscriptor: ${email}`,
  });
  if (error) return { ok: false, error: "No hemos podido darte de alta. Escríbenos a " + SITE.email };
  return { ok: true };
}
