"use client";
import Link from "next/link";
import { useState } from "react";
import type { Job } from "@/lib/jobs";
import { Pfeil } from "./icons";

export function JobsBoard({ jobs }: { jobs: Job[] }) {
  const branchen = Array.from(new Set(jobs.map((j) => j.branche)));
  const [aktiv, setAktiv] = useState<string>("Alle");
  const liste = aktiv === "Alle" ? jobs : aktiv === "Quereinstieg" ? jobs.filter((j) => j.quereinstieg) : jobs.filter((j) => j.branche === aktiv);
  return (
    <>
      <div className="filter" role="group" aria-label="Stellen filtern">
        {["Alle", "Quereinstieg", ...branchen].map((b) => (
          <button key={b} type="button" aria-pressed={aktiv === b} onClick={() => setAktiv(b)}>{b}</button>
        ))}
      </div>
      <div className="jobs">
        {liste.map((j) => (
          <article key={j.slug} className="job">
            <div style={{ minWidth: 0 }}>
              <h3>{j.title}</h3>
              <p>{j.summary}</p>
              {j.verdienst && <div className="job__verdienst">{j.verdienst}</div>}
              <div className="job__meta">
                <span className="chip">📍 {j.ort}</span>
                <span className="chip">{j.branche}</span>
                <span className="chip">{j.modell}</span>
                {j.quereinstieg && <span className="chip chip--y">Quereinstieg möglich</span>}
              </div>
            </div>
            <Link className="btn btn--red" href={`/bewerben?stelle=${j.slug}`}>Bewerben <Pfeil /></Link>
          </article>
        ))}
      </div>
    </>
  );
}
