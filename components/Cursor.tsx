'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorState = { hover: boolean; label: string | null };

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>({ hover: false, label: null });
  const [hidden, setHidden] = useState(true);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 });

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-cursor], a, button');
      if (!el) setState({ hover: false, label: null });
      else setState({ hover: true, label: el.getAttribute('data-cursor') });
    };
    const leave = () => setHidden(true);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  const cls = [
    'cursor',
    state.label ? 'is-label' : state.hover ? 'is-hover' : '',
    hidden ? 'is-hidden' : '',
    pressed ? 'is-pressed' : '',
  ].join(' ');

  return (
    <>
      <motion.div className={`cursor__dot ${hidden ? 'is-hidden' : ''}`} style={{ x, y }} />
      <motion.div className={cls} style={{ x: sx, y: sy }}>
        <div className="cursor__ring">
          <span>{state.label}</span>
        </div>
      </motion.div>
    </>
  );
}
