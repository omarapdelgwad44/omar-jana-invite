"use client";

import { COUPLE, COPY, tx } from "@/lib/constants";

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="fallback-invite">
      <p className="fallback-invite__eyebrow">{tx(COPY.eventOf, "ar")}</p>
      <h1>
        {COUPLE.first} و {COUPLE.second}
      </h1>
      <p>تعذّر تحميل التجربة. يمكنكم المحاولة من جديد.</p>
      <button type="button" className="maps-btn" onClick={reset}>
        إعادة المحاولة
      </button>
    </main>
  );
}
