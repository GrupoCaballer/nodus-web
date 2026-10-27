"use server";

import { z } from "zod";
import { SITE } from "@/lib/site";

const Schema = z.object({
  nombre: z.string().trim().min(2, "Dinos tu nombre.").max(120),
  telefono: z.string().trim().min(6, "Necesitamos un teléfono.").max(30),
  email: z.string().trim().email("Revisa el correo.").max(160),
  vivienda: z.string().trim().max(200).optional().or(z.literal("")),
  mensaje: z.string().trim().max(3000).optional().or(z.literal("")),
  origen: z.string().trim().max(80).optional().or(z.literal("")),
  // Página por la que entró a la web y de dónde venía (lo rellena el navegador).
  entrada: z.string().trim().max(300).optional().or(z.literal("")),
  // Honeypot: los humanos no lo ven; si llega relleno, es un bot.
  web: z.string().max(0).optional().or(z.literal("")),
});

export type EstadoContacto = { ok: true; dev?: boolean } | { ok: false; error: string };

// Rate limit en memoria por IP (suficiente en una instancia; en Vercel es por lambda).
const hits = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function limitado(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
}

export async function enviarContacto(_prev: EstadoContacto | null, form: FormData): Promise<EstadoContacto> {
  const parsed = Schema.safeParse(Object.fromEntries(form));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Revisa los datos." };
  }
  const d = parsed.data;
  if (d.web) return { ok: true }; // bot: fingimos éxito

  const { headers } = await import("next/headers");
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limitado(ip)) return { ok: false, error: "Demasiados envíos seguidos. Prueba en unos minutos." };

  const texto = [
    `Nombre: ${d.nombre}`,
    `Teléfono: ${d.telefono}`,
    `Email: ${d.email}`,
    d.vivienda ? `Vivienda / zona: ${d.vivienda}` : null,
    d.origen ? `Origen: ${d.origen}` : null,
    d.entrada ? `Entró por: ${d.entrada}` : null,
    "",
    d.mensaje || "(sin mensaje)",
  ]
    .filter((l) => l !== null)
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[contacto] RESEND_API_KEY no definida; mensaje no enviado:\n" + texto);
    return { ok: true, dev: true };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM ?? "Nodus Web <web@nodusrealestate.com>",
    to: process.env.CONTACT_TO ?? SITE.email,
    replyTo: d.email,
    subject: `Web · ${d.origen || "Contacto"} · ${d.nombre}`,
    text: texto,
  });
  if (error) {
    console.error("[contacto] Resend:", error);
    return { ok: false, error: "No hemos podido enviar el mensaje. Escríbenos a " + SITE.email };
  }
  return { ok: true };
}
