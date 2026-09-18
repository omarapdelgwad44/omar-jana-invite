"use client";

import { InvitationLetter } from "@/components/InvitationLetter";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/lib/language";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function InvitationExperience() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="experience">
          <div className="device">
            <InvitationLetter reducedMotion={reducedMotion} />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
