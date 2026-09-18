"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { COUPLE, COPY, EVENT_LABEL, tx } from "@/lib/constants";

type Props = {
  children: ReactNode;
};

type State = {
  failed: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Invitation render failed", error, info.componentStack);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="fallback-invite">
          <p className="fallback-invite__eyebrow">{tx(COPY.eventOf, "ar")}</p>
          <h1>
            {COUPLE.first} و {COUPLE.second}
          </h1>
          <p>{tx(COPY.inviteLine, "ar")}</p>
          <p className="fallback-invite__date">
            {tx(EVENT_LABEL.weekday, "ar")} · {tx(EVENT_LABEL.date, "ar")} {tx(EVENT_LABEL.year, "ar")}
          </p>
        </main>
      );
    }

    return this.props.children;
  }
}
