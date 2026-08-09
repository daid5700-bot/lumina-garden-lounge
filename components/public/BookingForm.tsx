import { createBookingAction } from "@/app/actions";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/i18n";
import { legacyCopy } from "@/lib/legacy-copy";

export function BookingForm({ locale, status }: { locale: Locale; status?: string }) {
  const t = ui[locale].booking;
  const copy = legacyCopy[locale];
  const minDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
  return (
    <form action={createBookingAction}>
      <input type="hidden" name="locale" value={locale} />
      {status === "success" && <p className="form-message success" role="status">{t.success}</p>}
      {status === "error" && <p className="form-message error" role="alert">{t.error}</p>}
      <div className="form-group"><label className="sr-only" htmlFor="booking-name">{t.name}</label><input id="booking-name" name="name" type="text" placeholder={`${t.name} *`} required minLength={2} maxLength={80} autoComplete="name" /></div>
      <div className="form-group"><label className="sr-only" htmlFor="booking-phone">{t.phone}</label><input id="booking-phone" name="phone" type="tel" placeholder={`${t.phone} *`} required minLength={8} maxLength={20} autoComplete="tel" /></div>
      <div className="form-group"><label className="sr-only" htmlFor="booking-guests">{t.guests}</label><input id="booking-guests" name="guests" type="number" placeholder={`${t.guests} *`} min="1" max="100" required /></div>
      <div className="form-group"><label className="sr-only" htmlFor="booking-date">{t.date}</label><input id="booking-date" name="date" type="date" min={minDate} required /></div>
      <button className="btn btn-primary w-100" type="submit">{copy.bookingSubmit}</button>
    </form>
  );
}
