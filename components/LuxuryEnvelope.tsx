"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE, COPY, EVENT_LABEL, tx } from "@/lib/constants";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/language";

type Props = {
  reducedMotion: boolean;
  onOpen: () => void;
  onSkip: () => void;
};

type EnvelopePhase = "idle" | "opening" | "revealed";

export function LuxuryEnvelope({ reducedMotion, onOpen, onSkip }: Props) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState<EnvelopePhase>("idle");
  const finished = useRef(false);
  const timers = useRef<number[]>([]);
  const sealSrc =
    lang === "en" ? "/invite/envelope-wax-en.png" : "/invite/envelope-wax-ar.png";

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onOpen();
  };

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const beginOpen = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    const revealIn = reducedMotion ? 1400 : 1800;
    const finishIn = reducedMotion ? 2600 : 3600;
    timers.current.push(window.setTimeout(() => setPhase("revealed"), revealIn));
    timers.current.push(window.setTimeout(finish, finishIn));
  };

  return (
    <section className={`stage env env--${phase}`}>
      <LanguageToggle />
      <div className="mail-stage">
        <div className="mail">
          <div className="mail__body">
            <div className="mail__back" />
            <div className="mail__card">
              <p>{tx(COPY.eventOf, lang)}</p>
              <h2>
                <span>{lang === "ar" ? COUPLE.first : COUPLE.firstLatin}</span>
                <small>{lang === "ar" ? "و" : "&"}</small>
                <span>{lang === "ar" ? COUPLE.second : COUPLE.secondLatin}</span>
              </h2>
              <em>
                {tx(EVENT_LABEL.weekday, lang)} · {tx(EVENT_LABEL.date, lang)}{" "}
                {tx(EVENT_LABEL.year, lang)}
              </em>
            </div>
            <div className="mail__front" />
          </div>
          <div className="mail__flap">
            <div className="mail__flap-face mail__flap-face--front" />
            <div className="mail__flap-face mail__flap-face--back" />
            <div
              className="mail__seal"
              style={{ backgroundImage: `url(${sealSrc})` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="stage__hit"
        onClick={beginOpen}
        aria-label={tx(COPY.tapToOpen, lang)}
        disabled={phase !== "idle"}
      />
      <p className="tap-hint">{tx(COPY.tapToOpen, lang)}</p>
      <button type="button" className="skip-letter" onClick={onSkip}>
        {tx(COPY.skip, lang)}
      </button>
    </section>
  );
}
