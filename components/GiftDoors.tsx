"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { COPY, tx } from "@/lib/constants";
import { useLanguage } from "@/lib/language";

type Props = {
  reducedMotion: boolean;
  onOpen: () => void;
  onSkip: () => void;
};

type DoorPhase = "closed" | "untie" | "swing" | "done";

export function GiftDoors({ reducedMotion, onOpen, onSkip }: Props) {
  const { lang } = useLanguage();
  const [phase, setPhase] = useState<DoorPhase>("closed");
  const ready = useRef(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    onOpen();
  };

  const beginOpen = () => {
    if (!ready.current || phase !== "closed") return;
    if (reducedMotion) {
      finish();
      return;
    }
    setPhase("untie");
  };

  useEffect(() => {
    const armIn = reducedMotion ? 80 : 520;
    const autoIn = armIn + (reducedMotion ? 420 : 1600);
    const arm = window.setTimeout(() => {
      ready.current = true;
    }, armIn);
    const auto = window.setTimeout(() => {
      ready.current = true;
      setPhase((current) => (current === "closed" ? (reducedMotion ? "done" : "untie") : current));
    }, autoIn);
    return () => {
      window.clearTimeout(arm);
      window.clearTimeout(auto);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (phase === "untie") {
      const id = window.setTimeout(() => setPhase("swing"), 520);
      return () => window.clearTimeout(id);
    }
    if (phase === "swing") {
      const id = window.setTimeout(() => setPhase("done"), 1780);
      return () => window.clearTimeout(id);
    }
    if (phase === "done") {
      finish();
    }
  }, [phase]);

  return (
    <section className={`stage doors-stage doors--${phase}`}>
      <div className="doors__beyond" aria-hidden="true">
        <Image
          src="/invite/palace-aisle.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="stage__photo"
        />
        <div className="doors__beyond-shade" />
      </div>

      <div className="doors__split">
        <div className="door-leaf door-leaf--left">
          <div className="door-leaf__clip">
            <div className="door-leaf__skin">
              <Image
                src="/invite/gift-doors-plain.png"
                alt=""
                fill
                sizes="100vw"
                className="door-leaf__photo"
              />
            </div>
          </div>
          <span className="door-leaf__edge" />
        </div>
        <div className="door-leaf door-leaf--right">
          <div className="door-leaf__clip">
            <div className="door-leaf__skin">
              <Image
                src="/invite/gift-doors-plain.png"
                alt=""
                fill
                sizes="100vw"
                className="door-leaf__photo"
              />
            </div>
          </div>
          <span className="door-leaf__edge" />
        </div>
      </div>

      <div className="doors__closed">
        <Image
          src="/invite/gift-doors.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="stage__photo"
        />
      </div>

      <button
        type="button"
        className="stage__hit"
        onClick={beginOpen}
        aria-label={tx(COPY.tapToOpen, lang)}
        disabled={phase !== "closed"}
      />
      <button type="button" className="skip-letter" onClick={onSkip}>
        {tx(COPY.skip, lang)}
      </button>
    </section>
  );
}
