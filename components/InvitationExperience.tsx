"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GiftDoors } from "@/components/GiftDoors";
import { InvitationLetter } from "@/components/InvitationLetter";
import { LuxuryEnvelope } from "@/components/LuxuryEnvelope";
import { VenueWalk } from "@/components/VenueWalk";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/lib/language";
import { type ExperienceStage } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { useCallback, useState } from "react";

export function InvitationExperience() {
  const reducedMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState<ExperienceStage>("envelope");

  const openDoors = useCallback(() => setStage("doors"), []);
  const openVenue = useCallback(() => setStage("venue"), []);
  const skipToLetter = useCallback(() => setStage("letter"), []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div
          className={`experience${stage === "letter" ? " experience--open" : ""}`}
          data-stage={stage}
        >
          <div className="device">
          <AnimatePresence mode="wait">
            {stage === "envelope" && (
              <motion.div
                key="envelope"
                className="stage-wrap"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.35 }}
              >
                <LuxuryEnvelope
                  reducedMotion={reducedMotion}
                  onOpen={openDoors}
                  onSkip={skipToLetter}
                />
              </motion.div>
            )}
            {stage === "doors" && (
              <motion.div
                key="doors"
                className="stage-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.45 }}
              >
                <GiftDoors
                  reducedMotion={reducedMotion}
                  onOpen={openVenue}
                  onSkip={skipToLetter}
                />
              </motion.div>
            )}
            {stage === "venue" && (
              <motion.div
                key="venue"
                className="stage-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0.2 : 0.9 }}
              >
                <VenueWalk
                  reducedMotion={reducedMotion}
                  onDone={skipToLetter}
                  onSkip={skipToLetter}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {stage === "letter" && <InvitationLetter reducedMotion={reducedMotion} />}
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
