"use client";
import { useEffect, useRef, useState } from "react";

// Logo-Leiste im Hero: jedes Logo genau einmal, erscheint gestaffelt. Was nicht in die Zeile passt, wird ausgeblendet.
export function LogoLeiste({ logos }: { logos: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [an, setAn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAn(true), 200); return () => clearTimeout(t); }, []);
  return (
    <div className="hero2__lauf">
      <div ref={ref} className={`hero2__spur${an ? " an" : ""}`}>
        {logos.map((l, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={l} src={`/logos/${l}-weiss.png`} alt={l} style={{ ["--i" as string]: i }} />
        ))}
      </div>
    </div>
  );
}
