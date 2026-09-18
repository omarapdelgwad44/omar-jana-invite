"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COPY, tx } from "@/lib/constants";
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
  const envelopeSrc =
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
    if (reducedMotion) {
      finish();
      return;
    }
    setPhase("opening");
    timers.current.push(window.setTimeout(() => setPhase("revealed"), 1500));
    timers.current.push(window.setTimeout(finish, 2000));
  };

  return (
    <section className={`stage env env--${phase}`}>
      <div className="env__scene">
        <div
          className="env__body"
          style={{ backgroundImage: `url(${envelopeSrc})` }}
        />

        <div className="env__flap">
          <div
            className="env__flap-front"
            style={{ backgroundImage: `url(${envelopeSrc})` }}
          />
          <div className="env__flap-back" aria-hidden="true" />
        </div>

        <div className="env__full">
          <Image
            src={envelopeSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="env__photo"
          />
        </div>

        <div className="env__seal" aria-hidden="true">
          <div className="env__seal-sync">
            <Image
              src={envelopeSrc}
              alt=""
              fill
              sizes="100vw"
              className="env__photo"
            />
          </div>
        </div>
      </div>

      <div className="stage__veil" aria-hidden="true" />
      <LanguageToggle />
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
