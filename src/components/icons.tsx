// Einfache Linien-Icons (24px, currentColor)
const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
type I = { className?: string };
export const IconEuro = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M18 7a7 7 0 1 0 0 10" /><path d="M4 10h9M4 14h9" /></svg>);
export const IconUhr = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const IconStufen = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M3 20h5v-5h5v-5h5V5h3" /></svg>);
export const IconTeam = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></svg>);
export const IconStart = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M5 19c1-4 3-7 7-9l4-4c1.5-1.5 3.5-2 5-2 0 1.5-.5 3.5-2 5l-4 4c-2 4-5 6-9 7z" /><path d="M9 15l-3-3" /></svg>);
export const IconBuch = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5M9 7h6" /></svg>);
export const IconDeckel = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M3 7h18" /><path d="M7 21V11M12 21V11M17 21V11" /></svg>);
export const IconKalender = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>);
export const IconSackgasse = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M12 21V8" /><path d="M6 8h12" /><path d="M8 3h8" /></svg>);
export const IconPapier = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></svg>);
export const IconSchleife = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M17 2l4 4-4 4" /><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4" /><path d="M21 13v2a3 3 0 0 1-3 3H3" /></svg>);
export const IconStille = (p: I) => (<svg viewBox="0 0 24 24" {...P} {...p} aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M9 10h.01M13 10h.01M17 10h.01" /></svg>);
export const Pfeil = () => (<span className="pfeil" aria-hidden="true">→</span>);
