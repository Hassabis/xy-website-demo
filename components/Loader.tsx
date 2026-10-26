'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/lib/content';

const DURATION = 1600;

export default function Loader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      onDoneRef.current();
      return;
    }
    let raf = 0;
    let timer = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        timer = window.setTimeout(() => {
          setDone(true);
          onDoneRef.current();
        }, 200);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader__top label">
            <span>
              {site.brand} — {site.brandCn}摄影
            </span>
            <span>
              {site.cityEn} · Est. {site.since}
            </span>
          </div>
          <div className="loader__mid">
            <p className="loader__line">
              <span>正在寻找光线</span>
              <em>Finding the light</em>
            </p>
          </div>
          <div className="loader__bottom">
            <div className="loader__bar">
              <i style={{ transform: `scaleX(${count / 100})` }} />
            </div>
            <span className="loader__count">{String(count).padStart(3, '0')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
