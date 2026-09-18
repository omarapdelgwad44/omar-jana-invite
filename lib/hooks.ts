"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type PointerState = {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  active: boolean;
};

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return fine;
}

export function usePointerRef(): RefObject<PointerState> {
  const pointer = useRef<PointerState>({
    x: 0.5,
    y: 0.5,
    clientX: 0,
    clientY: 0,
    active: false,
  });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      pointer.current = {
        x: event.clientX / width,
        y: event.clientY / height,
        clientX: event.clientX,
        clientY: event.clientY,
        active: true,
      };
    };

    const onLeave = () => {
      pointer.current.active = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return pointer;
}

export function useDocumentVisible(): boolean {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => setVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return visible;
}
