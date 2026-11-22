// Leitet aus den Tracking-Daten die Quelle für candidates.quelle ab
// (erlaubt: reel, organisch, empfehlung, anzeige) plus eine lesbare Detailangabe.
export type Tracking = {
  first?: Touch;
  last?: Touch;
};
export type Touch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  fbclid?: boolean;
  gclid?: boolean;
  ttclid?: boolean;
  ref?: string;
  referrer?: string;
  landing?: string;
  at?: string;
};

const PAID = /^(paid|cpc|ppc|ads?|paid_social|paidsocial|social_paid|display|retargeting)$/i;

export function quelleAus(t: Tracking): { quelle: string; detail: string } {
  const x = t.last ?? t.first ?? {};
  const f = t.first ?? x;
  const blob = `${x.utm_medium ?? ""} ${x.utm_content ?? ""} ${x.utm_source ?? ""}`.toLowerCase();
  let quelle = "organisch";
  if (x.ref || f.ref || /empfehlung|referral/.test(blob)) quelle = "empfehlung";
  else if (/reel/.test(blob)) quelle = "reel";
  else if (PAID.test(x.utm_medium ?? "") || x.fbclid || x.gclid || x.ttclid) quelle = "anzeige";

  let detail: string;
  if (x.utm_source || x.utm_medium || x.utm_campaign) {
    detail = [x.utm_source, x.utm_medium, x.utm_campaign].filter(Boolean).join(" / ");
  } else if (x.ref || f.ref) {
    detail = `ref ${x.ref ?? f.ref}`;
  } else if (x.referrer) {
    try {
      detail = `${new URL(x.referrer).hostname} (Verweis)`;
    } catch {
      detail = "Verweis";
    }
  } else {
    detail = "direkt";
  }
  if (x.landing) detail += ` · ${x.landing}`;
  return { quelle, detail: detail.slice(0, 300) };
}
