"use client";

import Image from "next/image";
import { useEffect } from "react";
import { COPY, tx } from "@/lib/constants";
import { useLanguage } from "@/lib/language";

type Props = {
  reducedMotion: boolean;
  onDone: () => void;
  onSkip: () => void;
};

export function VenueWalk({ reducedMotion, onDone, onSkip }: Props) {
  const { lang } = useLanguage();

  useEffect(() => {
    const wait = reducedMotion ? 500 : 3800;
    const id = window.setTimeout(onDone, wait);
    return () => window.clearTimeout(id);
  }, [onDone, reducedMotion]);

  return (
    <section className="stage">
      <Image
        src="/invite/palace-aisle.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={`stage__photo${reducedMotion ? "" : " stage__photo--walk"}`}
      />
      <div className="stage__vignette" aria-hidden="true" />
      <button type="button" className="skip-letter" onClick={onSkip}>
        {tx(COPY.skip, lang)}
      </button>
    </section>
  );
}
