"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";
import { COUPLE, COPY, EVENT_LABEL, TIMELINE, VENUE, tx } from "@/lib/constants";
import { Countdown } from "@/components/Countdown";
import { GoldHeroArt } from "@/components/GoldHeroArt";
import { LanguageToggle } from "@/components/LanguageToggle";
import { RsvpForm } from "@/components/RsvpForm";
import { useLanguage } from "@/lib/language";

type Props = {
  reducedMotion: boolean;
};

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const fadeUp: Transition = { duration: 1.2, ease: easeOutExpo };
const fadeSection: Transition = { duration: 1.4, ease: "easeOut" };

function StarRule({ className = "" }: { className?: string }) {
  return (
    <div className={`gold-star-rule ${className}`.trim()} aria-hidden="true">
      <span />
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
      </svg>
      <span />
    </div>
  );
}

function HeroReveal({
  children,
  delay,
  className,
  reducedMotion,
}: {
  children: ReactNode;
  delay: number;
  className?: string;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...fadeUp, delay }}
    >
      {children}
    </motion.div>
  );
}

function InViewReveal({
  children,
  delay = 0,
  duration = 1.2,
  y = 16,
  scale,
  scaleX,
  rotate,
  className,
  reducedMotion,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  scaleX?: number;
  rotate?: number;
  className?: string;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        scale: scale ?? 1,
        scaleX: scaleX ?? 1,
        rotate: rotate ?? 0,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1, scaleX: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

export function InvitationLetter({ reducedMotion }: Props) {
  const { lang } = useLanguage();

  return (
    <div className="letter">
      <section className="gold-hero">
        <GoldHeroArt />
        <div className="gold-hero__veil" aria-hidden="true" />
        <LanguageToggle />
        <div className="gold-hero__copy">
          <HeroReveal delay={0.5} reducedMotion={reducedMotion}>
            <p className="gold-hero__verse">{COPY.verseShort.ar}</p>
          </HeroReveal>
          <HeroReveal delay={0.8} className="gold-hero__star-wrap" reducedMotion={reducedMotion}>
            <StarRule />
          </HeroReveal>
          <HeroReveal delay={1.1} reducedMotion={reducedMotion}>
            <h1 className="gold-hero__names" dir="rtl">
              <span className="gold-hero__given">{COUPLE.first}</span>
              <span className="gold-hero__and">و</span>
              <span className="gold-hero__given">{COUPLE.second}</span>
            </h1>
            <div className="gold-hero__name-line" aria-hidden="true" />
            <p className="gold-hero__latin">
              {COUPLE.firstLatin} & {COUPLE.secondLatin}
            </p>
            <p className="gold-hero__date">{EVENT_LABEL.gregorianCaps}</p>
          </HeroReveal>
        </div>
        <HeroReveal delay={1.8} className="gold-scroll-wrap" reducedMotion={reducedMotion}>
          <a className="gold-scroll" href="#gold-ayah">
            <span className="gold-scroll__btn" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 10l5 5 5-5" />
              </svg>
            </span>
            <span>{tx(COPY.scroll, lang)}</span>
          </a>
        </HeroReveal>
      </section>

      <section id="gold-ayah" className="gold-panel gold-ayah">
        <motion.div
          className="gold-ayah__inner"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={fadeSection}
        >
          <InViewReveal delay={0} scale={0.9} y={0} duration={1} reducedMotion={reducedMotion}>
            <StarRule />
          </InViewReveal>
          <InViewReveal delay={0.15} y={16} reducedMotion={reducedMotion}>
            <p className="gold-ayah__ar">{COPY.verseFull.ar}</p>
          </InViewReveal>
          <InViewReveal delay={0.3} y={0} scaleX={0} duration={1} className="gold-hairline-motion" reducedMotion={reducedMotion}>
            <div className="gold-hairline" aria-hidden="true" />
          </InViewReveal>
          <InViewReveal delay={0.5} y={16} reducedMotion={reducedMotion}>
            <p className="gold-ayah__en" dir="ltr">
              {COPY.verseFull.en}
            </p>
          </InViewReveal>
          <InViewReveal delay={0.7} y={0} duration={1} reducedMotion={reducedMotion}>
            <p className="gold-ayah__source" dir="ltr">
              {COPY.verseSource.en}
            </p>
          </InViewReveal>
          <InViewReveal delay={0.7} scale={0.9} y={0} duration={1} reducedMotion={reducedMotion}>
            <div className="gold-fleuron" aria-hidden="true">
              <span />
              ❧
              <span />
            </div>
          </InViewReveal>
        </motion.div>
      </section>

      <section id="gold-details" className="gold-panel gold-event">
        <div className="gold-hearts" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} className="gold-hearts__bit" />
          ))}
        </div>
        <InViewReveal delay={0} y={-12} duration={1} reducedMotion={reducedMotion}>
          <p className="gold-pill">{tx(COPY.togetherForever, lang)}</p>
        </InViewReveal>
        <InViewReveal delay={0.2} scale={0.5} rotate={12} y={0} duration={1} reducedMotion={reducedMotion}>
          <div className="gold-heart" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="#b8925a"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
        </InViewReveal>
        <InViewReveal delay={0.3} y={24} duration={1} reducedMotion={reducedMotion}>
          <h2 className="gold-title">{tx(COPY.joinTitle, lang)}</h2>
        </InViewReveal>
        <InViewReveal delay={0.4} y={0} scaleX={0.75} duration={1} reducedMotion={reducedMotion}>
          <StarRule />
        </InViewReveal>
        <InViewReveal delay={0.5} y={20} duration={1} reducedMotion={reducedMotion}>
          <p className="gold-event__body">{tx(COPY.joinBody, lang)}</p>
        </InViewReveal>
        <InViewReveal delay={0.7} y={32} scale={0.95} duration={1.2} reducedMotion={reducedMotion}>
          <div className="gold-date-card">
            <span className="gold-date-card__corner gold-date-card__corner--bl" aria-hidden="true" />
            <span className="gold-date-card__corner gold-date-card__corner--br" aria-hidden="true" />
            <p className="gold-date-card__label">{tx(COPY.dateCardLabel, lang)}</p>
            <div className="gold-date-card__nums" dir="ltr">
              <div>
                <strong>{EVENT_LABEL.day}</strong>
                <small>{tx(COPY.day, lang)}</small>
              </div>
              <span>/</span>
              <div>
                <strong>{EVENT_LABEL.month}</strong>
                <small>{tx(COPY.month, lang)}</small>
              </div>
              <span>/</span>
              <div>
                <strong>{EVENT_LABEL.yearNum}</strong>
                <small>{tx(COPY.yearWord, lang)}</small>
              </div>
            </div>
            <div className="gold-hairline" aria-hidden="true" />
            <p className="gold-date-card__note">{tx(COPY.dateCardNote, lang)}</p>
          </div>
        </InViewReveal>
      </section>

      <section className="gold-panel gold-sheet">
        <InViewReveal delay={0.1} y={24} reducedMotion={reducedMotion} className="gold-sheet__block">
          <h2 className="gold-title gold-title--sm">{tx(COPY.timeLocation, lang)}</h2>
          <StarRule />
          <p className="sheet__venue">{tx(VENUE.name, lang)}</p>
          <p className="sheet__time">
            {tx(EVENT_LABEL.weekday, lang)} · {tx(VENUE.time, lang)}
          </p>
          {VENUE.mapsUrl ? (
            <a className="maps-btn" href={VENUE.mapsUrl} target="_blank" rel="noreferrer">
              {tx(COPY.openMaps, lang)}
            </a>
          ) : null}
        </InViewReveal>
      </section>

      <section className="gold-panel gold-count">
        <InViewReveal delay={0.1} y={24} scale={0.95} duration={1.2} reducedMotion={reducedMotion}>
          <div className="gold-count__card">
            <h2 className="gold-title gold-title--sm">{tx(COPY.countdown, lang)}</h2>
            <p className="gold-count__until">{tx(COPY.until, lang)}</p>
            <Countdown lang={lang} />
          </div>
        </InViewReveal>
      </section>

      <section className="gold-panel gold-sheet gold-sheet--tail">
        <InViewReveal delay={0.1} y={24} reducedMotion={reducedMotion} className="gold-sheet__block">
          <h2 className="gold-title gold-title--sm">{tx(COPY.timeline, lang)}</h2>
          <p className="sheet__body">{tx(COPY.timelineBody, lang)}</p>
          <div className="timeline-card">
            {TIMELINE.map((item) => (
              <div key={item.title.en} className="timeline-card__item">
                <span>{tx(item.time, lang)}</span>
                <strong>{tx(item.title, lang)}</strong>
              </div>
            ))}
          </div>
        </InViewReveal>

        <InViewReveal delay={0.2} y={24} reducedMotion={reducedMotion} className="gold-sheet__block">
          <h2 className="gold-title gold-title--sm">{tx(COPY.rsvp, lang)}</h2>
          <p className="sheet__body">{tx(COPY.rsvpBy, lang)}</p>
          <RsvpForm />
        </InViewReveal>

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
