"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { COUPLE, COPY, EVENT_LABEL, TIMELINE, VENUE, tx } from "@/lib/constants";
import { Countdown } from "@/components/Countdown";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RsvpForm } from "@/components/RsvpForm";
import { useLanguage } from "@/lib/language";

type Props = {
  reducedMotion: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function InvitationLetter({ reducedMotion }: Props) {
  const { lang } = useLanguage();
  const fade = reducedMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.35 },
        transition: { duration: 0.8, ease },
      };

  return (
    <div className="letter">
      <section className="hero">
        <div className="hero__visual">
          <Image
            src="/invite/gazebo-hero.png"
            alt=""
            fill
            preload
            sizes="(min-width: 960px) 58vw, 100vw"
            className="hero__photo"
          />
          <div className="hero__shade" aria-hidden="true" />
          <LanguageToggle />
        </div>
        <div className="hero__copy">
          <p className="hero__quote">{tx(COPY.together, lang)}</p>
          <p className="hero__kicker">{tx(COPY.eventOf, lang)}</p>
          <h1 className="hero__names">
            <span>{lang === "ar" ? COUPLE.first : COUPLE.firstLatin}</span>
            <small>{lang === "ar" ? "و" : "&"}</small>
            <span>{lang === "ar" ? COUPLE.second : COUPLE.secondLatin}</span>
          </h1>
          <p className="hero__date">
            {tx(EVENT_LABEL.date, lang)} {tx(EVENT_LABEL.year, lang)}
          </p>
        </div>
      </section>

      <section className="sheet">
        <motion.div className="sheet__block" {...fade}>
          <h2 className="script-title">{tx(COPY.joinTitle, lang)}</h2>
          <p className="sheet__body">{tx(COPY.joinBody, lang)}</p>
          <p className="sheet__poem">{tx(COPY.poem, lang)}</p>
        </motion.div>

        <motion.div className="sheet__block" {...fade}>
          <h2 className="script-title">{tx(COPY.timeLocation, lang)}</h2>
          <p className="sheet__venue">{tx(VENUE.name, lang)}</p>
          <p className="sheet__time">
            {tx(EVENT_LABEL.weekday, lang)} · {tx(VENUE.time, lang)}
          </p>
          {VENUE.mapsUrl ? (
            <a className="maps-btn" href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
              {tx(COPY.openMaps, lang)}
            </a>
          ) : null}
        </motion.div>
      </section>

      <section className="drapes">
        <Image
          src="/invite/pink-drapes.png"
          alt=""
          fill
          sizes="100vw"
          className="drapes__photo"
        />
        <div className="drapes__content">
          <h2 className="script-title script-title--on-drapes">{tx(COPY.countdown, lang)}</h2>
          <p className="drapes__until">{tx(COPY.until, lang)}</p>
          <Countdown lang={lang} />
        </div>
      </section>

      <section className="sheet sheet--tail">
        <motion.div className="sheet__block" {...fade}>
          <h2 className="script-title">{tx(COPY.timeline, lang)}</h2>
          <p className="sheet__body">{tx(COPY.timelineBody, lang)}</p>
          <div className="timeline-card">
            {TIMELINE.map((item) => (
              <div key={item.title.en} className="timeline-card__item">
                <span>{tx(item.time, lang)}</span>
                <strong>{tx(item.title, lang)}</strong>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="sheet__block" {...fade}>
          <h2 className="script-title">{tx(COPY.rsvp, lang)}</h2>
          <p className="sheet__body">{tx(COPY.rsvpBy, lang)}</p>
          <RsvpForm />
        </motion.div>

        <footer className="letter-footer">
          <span className="letter-footer__monogram">{COUPLE.monogram}</span>
          <p>
            {lang === "ar"
              ? `${COUPLE.first} و ${COUPLE.second}`
              : `${COUPLE.firstLatin} & ${COUPLE.secondLatin}`}
          </p>
          <small>{tx(COPY.presence, lang)}</small>
        </footer>
      </section>
    </div>
  );
}
