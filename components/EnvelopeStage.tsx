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

const PETALS = ["n", "e", "s", "w"] as const;

export function EnvelopeStage({ reducedMotion, onOpen, onSkip }: Props) {
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
    timers.current.push(window.setTimeout(() => setPhase("revealed"), 1250));
    timers.current.push(window.setTimeout(finish, 1900));
  };

  return (
    <section className={`stage oj-env oj-env--${phase}`}>
      <div className="oj-env__beyond" aria-hidden="true">
        <Image
          src="/invite/gift-doors.png"
          alt=""
          fill
          sizes="100vw"
          className="stage__photo"
        />
      </div>

      <div className="oj-env__petals" aria-hidden="true">
        {PETALS.map((side) => (
          <div key={side} className={`oj-env__petal oj-env__petal--${side}`}>
            <div className="oj-env__petal-clip">
              <Image
                src={envelopeSrc}
                alt=""
                fill
                sizes="100vw"
                className="oj-env__photo"
              />
            </div>
            <div className="oj-env__petal-back" />
          </div>
        ))}
      </div>

      <div className="oj-env__full">
        <Image
          src={envelopeSrc}
          alt=""
          fill
          preload
          sizes="100vw"
          className="oj-env__photo"
        />
      </div>

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
