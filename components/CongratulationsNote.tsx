"use client";

import { FormEvent, useEffect, useState } from "react";
import { COPY } from "@/lib/constants";
import { addWish, isGuestbookConfigured } from "@/lib/guestbook";
import { MESSAGE_MAX, NAME_MAX } from "@/lib/guestbook-config";

type Status = "idle" | "saving" | "error";

export function CongratulationsNote() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const configured = isGuestbookConfigured();

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(false), 4200);
    return () => window.clearTimeout(id);
  }, [toast]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "saving") return;
    if (!configured) {
      setStatus("error");
      setError(COPY.guestbookSetup.ar);
      return;
    }
    // Bots fill honeypot — refuse silently without a false "saved" state.
    if (honeypot.trim()) {
      setStatus("error");
      setError(COPY.blessingError.ar);
      return;
    }

    setStatus("saving");
    setError("");
    setToast(false);
    try {
      await addWish(name, message);
      setName("");
      setMessage("");
      setStatus("idle");
      setToast(true);
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : COPY.blessingError.ar);
    }
  }

  return (
    <>
      <form className="bless" onSubmit={onSubmit} aria-busy={status === "saving"}>
        <p className="sheet__body">{COPY.blessingBody.ar}</p>
        {!configured ? <p className="bless__hint">{COPY.guestbookSetup.ar}</p> : null}
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
            disabled={!configured || status === "saving"}
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
            disabled={!configured || status === "saving"}
          />
        </label>
        <button
          className="maps-btn bless__send"
          type="submit"
          disabled={!configured || status === "saving"}
        >
          {status === "saving" ? (
            <>
              <span className="bless__spinner" aria-hidden="true" />
              <span>{COPY.blessingSending.ar}</span>
            </>
          ) : (
            COPY.sendBlessing.ar
          )}
        </button>
        {status === "error" ? (
          <p className="bless__error" role="alert">
            {error}
          </p>
        ) : (
          <p className="bless__hint">{COPY.blessingHint.ar}</p>
        )}
      </form>

      {toast ? (
        <div className="bless-toast" role="status" aria-live="polite">
          <span className="bless-toast__check" aria-hidden="true">
            ✓
          </span>
          <p>{COPY.blessingThanks.ar}</p>
        </div>
      ) : null}
    </>
  );
}
