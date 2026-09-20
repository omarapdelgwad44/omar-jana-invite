"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COUPLE, COPY } from "@/lib/constants";
import { listWishes, type Wish } from "@/lib/guestbook";

function formatWishDate(value: number): string {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

export function WishesBoard() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    listWishes()
      .then((items) => {
        if (!cancelled) {
          setWishes(items);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="wishes-page">
      <header className="wishes-page__hero">
        <p className="gold-pill">{COUPLE.first} و {COUPLE.second}</p>
        <h1 className="gold-title">{COPY.wishesTitle.ar}</h1>
        <p className="sheet__body">{COPY.wishesBody.ar}</p>
        <Link className="maps-btn" href="/">
          {COPY.backToInvite.ar}
        </Link>
      </header>

      {status === "loading" ? (
        <p className="wishes-page__status">{COPY.wishesLoading.ar}</p>
      ) : null}

      {status === "error" ? (
        <p className="wishes-page__status" role="alert">
          {COPY.wishesError.ar}
        </p>
      ) : null}

      {status === "ready" && wishes.length === 0 ? (
        <p className="wishes-page__status">{COPY.wishesEmpty.ar}</p>
      ) : null}

      {wishes.length > 0 ? (
        <ol className="wishes-list">
          {wishes.map((wish) => (
            <li key={wish.id} className="wish-card">
              <p className="wish-card__message">{wish.message}</p>
              <div className="wish-card__meta">
                <strong>{wish.name}</strong>
                {wish.createdAt ? <time dateTime={new Date(wish.createdAt).toISOString()}>{formatWishDate(wish.createdAt)}</time> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </main>
  );
}
