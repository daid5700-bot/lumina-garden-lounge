"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isLocale } from "@/lib/i18n";

function vietnamToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(8).max(20).regex(/^[+0-9().\s-]+$/),
  guests: z.coerce.number().int().min(1).max(100),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => value >= vietnamToday(), { message: "Ngày đặt bàn không được thuộc quá khứ" }).transform((value) => new Date(`${value}T12:00:00+07:00`)),
  note: z.string().trim().max(500).optional(),
  locale: z.string()
});

export async function createBookingAction(formData: FormData) {
  const parsed = bookingSchema.safeParse(Object.fromEntries(formData));
  const requestedLocale = String(formData.get("locale"));
  const locale = isLocale(requestedLocale) ? requestedLocale : "vi";
  if (!parsed.success || !process.env.DATABASE_URL) redirect(`/${locale}?booking=error#booking`);

  try {
    await prisma.booking.create({ data: { name: parsed.data.name, phone: parsed.data.phone, guests: parsed.data.guests, date: parsed.data.date, note: parsed.data.note || null, locale } });
  } catch (error) {
    console.error("Booking creation failed", error);
    redirect(`/${locale}?booking=error#booking`);
  }
  redirect(`/${locale}?booking=success#booking`);
}
