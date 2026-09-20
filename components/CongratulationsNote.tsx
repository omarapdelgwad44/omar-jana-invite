"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { COPY } from "@/lib/constants";
import { addWish, isGuestbookConfigured } from "@/lib/guestbook";
import { GUESTBOOK_SCRIPT_URL, MESSAGE_MAX, NAME_MAX } from "@/lib/guestbook-config";

type Status = "idle" | "saving" | "saved" | "error";

export function CongratulationsNote() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const configured = isGuestbookConfigured();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "saving") return;
    if (honeypot.trim()) {
      setStatus("saved");
      return;
    }

    setStatus("saving");
    setError("");
    try {
      await addWish(name, message);
      setStatus("saved");
      setName("");
      setMessage("");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : COPY.blessingError.ar);
    }
  }

  if (status === "saved") {
    return (
      <div className="bless bless--done">
        <p className="sheet__body">{COPY.blessingThanks.ar}</p>
        <Link className="maps-btn bless__send" href="/tahani/">
          {COPY.readWishes.ar}
        </Link>
      </div>
    );
  }

  return (
    <form className="bless" onSubmit={onSubmit}>
      <p className="sheet__body">{COPY.blessingBody.ar}</p>
      {!configured && !GUESTBOOK_SCRIPT_URL ? (
        <p className="bless__hint">{COPY.guestbookSetup.ar}</p>
      ) : null}
      <label className="bless__hp" aria-hidden="true">
        <span>Company</span>
        <input
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </label>
      <label className="bless__field">
        <span>{COPY.blessingName.ar}</span>
        <input
          name="guest-name"
          required
          maxLength={NAME_MAX}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={COPY.blessingNamePlaceholder.ar}
        />
      </label>
      <label className="bless__field">
        <span>{COPY.blessingLabel.ar}</span>
        <textarea
          name="blessing"
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={COPY.blessingPlaceholder.ar}
        />
      </label>
      <button className="maps-btn bless__send" type="submit" disabled={status === "saving"}>
        {status === "saving" ? COPY.blessingSending.ar : COPY.sendBlessing.ar}
      </button>
      {status === "error" ? (
        <p className="bless__error" role="alert">
          {error}
        </p>
      ) : (
        <p className="bless__hint">{COPY.blessingHint.ar}</p>
      )}
      <Link className="bless__wall" href="/tahani/">
        {COPY.readWishes.ar}
      </Link>
    </form>
  );
}
