// Einheitliches Linien-Icon-Set (24px Raster, 1.75 Strich, runde Enden). Nur diese Icons verwenden.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;
const I = (d: React.ReactNode) => function Icon(p: P) { return <svg {...base} {...p}>{d}</svg>; };

export const IcCheck = I(<path d="M5 12.5l4.2 4.2L19 7" />);
export const IcArrow = I(<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>);
export const IcUser = I(<><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>);
export const IcUsers = I(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8" /><path d="M21.5 20a6.5 6.5 0 0 0-4-6" /></>);
export const IcPhone = I(<path d="M5 4h3.5l1.8 4.6-2.3 1.4a11 11 0 0 0 6 6l1.4-2.3L20 15.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />);
export const IcCalendar = I(<><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>);
export const IcPin = I(<><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>);
export const IcCap = I(<><path d="M2.5 9L12 4.5 21.5 9 12 13.5z" /><path d="M6.5 11v5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-5" /></>);
export const IcTrophy = I(<><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5" /><path d="M12 14v3.5M8.5 20.5h7M9.5 17.5h5" /></>);
export const IcShield = I(<><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></>);
export const IcWallet = I(<><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" /><rect x="4" y="8" width="16.5" height="11.5" rx="2.5" /><path d="M16 13.75h.01" /></>);
export const IcTrend = I(<><path d="M3 17l6-6 4 4 7.5-7.5" /><path d="M15 7.5h5.5V13" /></>);
export const IcTarget = I(<><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" /></>);
export const IcSpark = I(<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />);
export const IcPlay = I(<><circle cx="12" cy="12" r="9" /><path d="M10 8.8v6.4l5.2-3.2z" /></>);
export const IcClock = I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></>);
export const IcBriefcase = I(<><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3 12.5h18" /></>);
export const IcCar = I(<><path d="M4 16.5V12l2-5h12l2 5v4.5" /><path d="M3 12h18v4.5H3z" /><circle cx="7.5" cy="16.5" r="1.8" /><circle cx="16.5" cy="16.5" r="1.8" /></>);
export const IcHome = I(<><path d="M3.5 11L12 4l8.5 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" /></>);
export const IcSearch = I(<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>);
export const IcFile = I(<><path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></>);
export const IcX = I(<><circle cx="12" cy="12" r="9" /><path d="M9 9l6 6M15 9l-6 6" /></>);
export const IcBell = I(<><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>);
export const IcStar = I(<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />);
export const IcBolt = I(<path d="M13 2.5L5 13.5h6.5L10.5 21.5 19 10h-6.5z" />);
export const IcLayers = I(<><path d="M12 3.5l9 4.5-9 4.5L3 8z" /><path d="M3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" /></>);
export const IcHandshake = I(<><path d="M2.5 8.5l4-2.5 4 2" /><path d="M21.5 8.5l-4-2.5-5.5 3-3 2.3a1.6 1.6 0 0 0 2 2.4l2.5-1.6 4.5 4" /><path d="M2.5 8.5v6l5 4 1.5-1.2" /><path d="M21.5 8.5v6l-3 2.5" /><path d="M11 18l1.5 1.2a1.5 1.5 0 0 0 2-2.2" /></>);
export const IcLock = I(<><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>);
export const IcEyeOff = I(<><path d="M3 3l18 18" /><path d="M10.6 5.1A9.7 9.7 0 0 1 12 5c5 0 8.5 4.5 9.5 7-.4 1-1.2 2.4-2.4 3.7M6.6 6.6C4.6 8 3.2 10 2.5 12c1 2.5 4.5 7 9.5 7 1.6 0 3-.4 4.3-1.1" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" /></>);
export const IcBuilding = I(<><rect x="4" y="3.5" width="11" height="17" rx="1.5" /><path d="M15 9h4a1 1 0 0 1 1 1v10.5H15M7.5 7.5h1M10.5 7.5h1M7.5 11h1M10.5 11h1M7.5 14.5h1M10.5 14.5h1M8.5 20.5v-3h2v3" /></>);
export const IcSignal = I(<><path d="M5 18.5a10 10 0 0 1 0-13M19 5.5a10 10 0 0 1 0 13M8.2 15.3a5.5 5.5 0 0 1 0-6.6M15.8 8.7a5.5 5.5 0 0 1 0 6.6" /><circle cx="12" cy="12" r="1.5" /></>);
export const IcSun = I(<><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6L6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" /></>);
export const IcWifi = I(<><path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0" /><circle cx="12" cy="19" r="0.9" /></>);

// Alte Namen (Kompatibilität)
export const Pfeil = () => (<span className="pfeil" aria-hidden="true"><IcArrow width={18} height={18} /></span>);
export const IconEuro = IcWallet;
export const IconUhr = IcClock;
export const IconStufen = IcTrend;
export const IconTeam = IcUsers;
export const IconStart = IcBolt;
export const IconBuch = IcCap;
