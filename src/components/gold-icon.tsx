import Image from "next/image";

export type GoldIconName = "bewerber" | "megafon" | "trichter" | "chat" | "cloud" | "schild" | "handschlag" | "ziel" | "kalender" | "wachstum" | "telefon" | "radar";

// 3D-Icons in Gold (aus der Zoepp-Markenwelt, public/premium)
export function GoldIcon({ name, size = 88 }: { name: GoldIconName; size?: number }) {
  return <Image src={`/premium/${name}.webp`} alt="" width={size} height={size} className="gold-icon" aria-hidden="true" />;
}
