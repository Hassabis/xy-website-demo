'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import Loader from './Loader';
import Cursor from './Cursor';

const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);

let lenis: Lenis | null = null;

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.classList.toggle('is-locked', locked);
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    lockScroll(!ready);
  }, [ready]);

  return (
    <ReadyContext.Provider value={ready}>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      {children}
    </ReadyContext.Provider>
  );
}
