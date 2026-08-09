import { localeInfo, locales } from "@/lib/i18n";

type Field = { name: string; label: string; type?: "input" | "textarea"; rows?: number; required?: boolean; value?: string | null };

export function LocaleFields({ values }: { values: Record<string, Record<string, string | null | undefined>> }) {
  const definitions: Field[] = [
    { name: "seoTitle", label: "Tiêu đề SEO", required: true },
    { name: "seoDescription", label: "Mô tả SEO", type: "textarea", rows: 2, required: true },
    { name: "heroEyebrow", label: "Dòng nhỏ hero", required: true },
    { name: "heroTitle", label: "Tiêu đề hero", required: true },
    { name: "heroSubtitle", label: "Mô tả hero", type: "textarea", rows: 2, required: true },
    { name: "aboutTitle", label: "Nhãn giới thiệu", required: true },
    { name: "aboutHeading", label: "Tiêu đề giới thiệu", required: true },
    { name: "aboutBody", label: "Nội dung giới thiệu 1", type: "textarea", rows: 3, required: true },
    { name: "aboutBodySecondary", label: "Nội dung giới thiệu 2", type: "textarea", rows: 3, required: true },
    { name: "aboutFeatureOne", label: "Điểm nổi bật 1", required: true },
    { name: "aboutFeatureTwo", label: "Điểm nổi bật 2", required: true },
    { name: "aboutFeatureThree", label: "Điểm nổi bật 3", required: true },
    { name: "featureOneTitle", label: "Thẻ trải nghiệm 1 — tiêu đề", required: true },
    { name: "featureOneBody", label: "Thẻ trải nghiệm 1 — mô tả", type: "textarea", rows: 2, required: true },
    { name: "featureTwoTitle", label: "Thẻ trải nghiệm 2 — tiêu đề", required: true },
    { name: "featureTwoBody", label: "Thẻ trải nghiệm 2 — mô tả", type: "textarea", rows: 2, required: true },
    { name: "featureThreeTitle", label: "Thẻ trải nghiệm 3 — tiêu đề", required: true },
    { name: "featureThreeBody", label: "Thẻ trải nghiệm 3 — mô tả", type: "textarea", rows: 2, required: true },
    { name: "contactTitle", label: "Tiêu đề đặt bàn", required: true },
    { name: "contactDescription", label: "Mô tả đặt bàn", type: "textarea", rows: 3, required: true }
  ];
  return <div className="admin-locales">{locales.map((locale) => <details key={locale} open={locale === "vi"}><summary>{localeInfo[locale].label}<span>{locale.toUpperCase()}</span></summary><div className="admin-form-grid">{definitions.map((field) => <label key={field.name} className={field.type === "textarea" ? "admin-full" : ""}><span>{field.label}</span>{field.type === "textarea" ? <textarea name={`${locale}_${field.name}`} rows={field.rows} required={field.required} defaultValue={values[locale]?.[field.name] || ""} /> : <input name={`${locale}_${field.name}`} required={field.required} defaultValue={values[locale]?.[field.name] || ""} />}</label>)}</div></details>)}</div>;
}
