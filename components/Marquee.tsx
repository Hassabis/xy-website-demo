'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

const items = [
  ['人像', 'Portrait'],
  ['婚礼', 'Wedding'],
  ['商业', 'Commercial'],
  ['旅拍', 'Travel'],
  ['胶片', 'Film'],
];

function Band({ speed, className }: { speed: number; className: string }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2000, 2000], [-6, 6]);
  const dir = useRef(1);
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * speed * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    move += dir.current * Math.abs(move) * Math.abs(b);
    base.set(base.get() + move);
  });

  return (
    <div className={`marquee__band ${className}`}>
      <motion.div className="marquee__track" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((k) => (
          <div className="marquee__group" key={k} aria-hidden={k > 0}>
            {items.map(([cn, en]) => (
              <span className="marquee__item" key={en}>
                <span>{en}</span>
                <small>{cn}</small>
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="拍摄类型">
      <Band speed={-2.4} className="marquee__band--ghost" />
      <Band speed={3} className="marquee__band--accent" />
    </section>
  );
}
