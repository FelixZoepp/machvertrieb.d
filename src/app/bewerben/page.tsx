import type { Metadata } from "next";
import { Quiz } from "@/components/quiz";
import { JOBS } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Jetzt bewerben: 2-Minuten-Check für deinen Vertriebsjob",
  description: "Beantworte ein paar kurze Fragen und bewirb dich ohne Lebenslauf für einen Job im Vertrieb. Für dich kostenlos, auch für Quereinsteiger.",
  alternates: { canonical: "/bewerben" },
};

export default async function Bewerben({ searchParams }: { searchParams: Promise<{ stelle?: string }> }) {
  const { stelle } = await searchParams;
  const job = stelle ? JOBS.find((j) => j.slug === stelle) : undefined;
  return (
    <div className="quiz-seite">
      <div className="wrap">
        <Quiz stelle={job?.slug} stelleTitel={job ? `${job.title}, ${job.ort}` : undefined} />
      </div>
    </div>
  );
}
