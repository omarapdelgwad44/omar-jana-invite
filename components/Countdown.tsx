"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { COPY, EVENT_ISO, type Lang, tx } from "@/lib/constants";
import { getEventDate, getTimeParts, pad, type TimeParts } from "@/lib/countdown";

const LABELS: Record<Lang, { key: keyof Omit<TimeParts, "expired">; label: string }[]> = {
  ar: [
    { key: "days", label: "يوم" },
    { key: "hours", label: "ساعة" },
    { key: "minutes", label: "دقيقة" },
    { key: "seconds", label: "ثانية" },
  ],
  en: [
    { key: "days", label: "Days" },
    { key: "hours", label: "Hours" },
    { key: "minutes", label: "Mins" },
    { key: "seconds", label: "Secs" },
  ],
};

function readParts(): TimeParts | null {
  try {
    return getTimeParts(getEventDate(EVENT_ISO));
  } catch (error) {
    console.error(error);
    return null;
  }
}

type Props = {
  lang: Lang;
};

export function Countdown({ lang }: Props) {
  const [parts, setParts] = useState<TimeParts | null>(readParts);

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(readParts());
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const values = useMemo(() => {
    if (!parts) return null;
    return {
      days: pad(parts.days),
      hours: pad(parts.hours),
      minutes: pad(parts.minutes),
      seconds: pad(parts.seconds),
    };
  }, [parts]);

  if (!parts || !values) {
    return (
      <p className="countdown-fallback" role="status">
        {lang === "ar" ? "٩ أكتوبر ٢٠٢٦" : "9 October 2026"}
      </p>
    );
  }

  if (parts.expired) {
    return (
      <motion.p
        className="countdown-live"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
      >
        {tx(COPY.together, lang)}
      </motion.p>
    );
  }

  return (
    <div className="countdown" role="timer" aria-live="polite">
      {LABELS[lang].map((item) => (
        <div key={item.key} className="countdown__cell">
          <div className="countdown__window">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={values[item.key]}
                className="countdown__value"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {values[item.key]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="countdown__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
