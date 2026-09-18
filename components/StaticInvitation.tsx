import { COUPLE, COPY, EVENT_LABEL, tx } from "@/lib/constants";

export function StaticInvitation() {
  return (
    <main className="fallback-invite">
      <p className="fallback-invite__eyebrow">{COPY.verseShort.ar}</p>
      <h1>
        {COUPLE.first} و {COUPLE.second}
      </h1>
      <p className="fallback-invite__latin">
        {COUPLE.firstLatin} & {COUPLE.secondLatin}
      </p>
      <p>{tx(COPY.inviteLine, "ar")}</p>
      <p className="fallback-invite__date">
        {tx(EVENT_LABEL.weekday, "ar")} · {tx(EVENT_LABEL.date, "ar")} {tx(EVENT_LABEL.year, "ar")}
      </p>
    </main>
  );
}
