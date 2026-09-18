"use client";

import { FormEvent, useEffect, useState } from "react";
import { COPY, tx } from "@/lib/constants";
import { useLanguage } from "@/lib/language";

type Attendance = "yes" | "no";

const STORAGE_KEY = "oj-rsvp";

type StoredRsvp = {
  attending: Attendance;
  name: string;
  message: string;
};

function readStored(): StoredRsvp | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRsvp;
    if (parsed.attending !== "yes" && parsed.attending !== "no") return null;
    if (!parsed.name) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function RsvpForm() {
  const { lang } = useLanguage();
  const [attending, setAttending] = useState<Attendance>("yes");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<StoredRsvp | null>(null);

  useEffect(() => {
    const stored = readStored();
    if (stored) setSent(stored);
  }, []);

  if (sent) {
    return (
      <p className="rsvp__thanks" role="status">
        {tx(sent.attending === "yes" ? COPY.sentYes : COPY.sentNo, lang)}
      </p>
    );
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: StoredRsvp = {
      attending,
      name: name.trim(),
      message: message.trim(),
    };
    if (!payload.name) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSent(payload);
  };

  return (
    <form className="rsvp" onSubmit={onSubmit}>
      <fieldset className="rsvp__attend">
        <legend>{tx(COPY.willYou, lang)}</legend>
        <label>
          <input
            type="radio"
            name="attending"
            value="yes"
            checked={attending === "yes"}
            onChange={() => setAttending("yes")}
          />
          {tx(COPY.yes, lang)}
        </label>
        <label>
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === "no"}
            onChange={() => setAttending("no")}
          />
          {tx(COPY.no, lang)}
        </label>
      </fieldset>

      <label className="rsvp__field">
        <span>{tx(COPY.fullName, lang)}</span>
        <input
          required
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={tx(COPY.fullNamePlaceholder, lang)}
        />
      </label>

      <label className="rsvp__field">
        <span>{tx(COPY.message, lang)}</span>
        <textarea
          name="message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={tx(COPY.messagePlaceholder, lang)}
        />
      </label>

      <button type="submit" className="rsvp__send">
        {tx(COPY.send, lang)}
      </button>
    </form>
  );
}
