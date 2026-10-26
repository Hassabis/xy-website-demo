'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useSpring } from 'motion/react';
import { services } from '@/lib/content';
import { FadeUp, Lines } from './Reveal';

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 160, damping: 20, mass: 0.5 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section className="section" id="services">
      <div className="section__head">
        <p className="label">(02) 服务 Services</p>
        <div>
          <h2 className="section__title">
            <Lines lines={['Four ways', <>to hold <em>light.</em></>]} />
          </h2>
          <FadeUp as="p" className="section__sub" delay={0.2}>
            四种拍摄方式，一种对待光的态度。
          </FadeUp>
        </div>
      </div>

      <div ref={listRef} className="svc-wrap" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        <motion.div
          className="svc-preview"
          style={{ x, y }}
          animate={{ scale: active !== null ? 1 : 0, opacity: active !== null ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <div className="svc-preview__inner">
            {services.map((s, i) => (
              <div key={s.en} className={`svc-preview__img ${active === i ? 'is-on' : ''}`}>
                <Image src={s.photo.src} alt="" fill sizes="340px" />
              </div>
            ))}
          </div>
        </motion.div>

        <ul className={`svc-list ${active !== null ? 'has-active' : ''}`}>
        {services.map((s, i) => (
          <FadeUp
            as="li"
            key={s.en}
            delay={i * 0.06}
            className={`svc ${active === i ? 'is-active' : ''}`}
          >
            <div className="svc__row" onPointerEnter={() => setActive(i)}>
              <span className="svc__no label">0{i + 1}</span>
              <div className="svc__thumb">
                <Image src={s.photo.src} alt={s.photo.alt} fill sizes="120px" />
              </div>
              <h3 className="svc__title">
                {s.title}
                <em>{s.en}</em>
              </h3>
              <p className="svc__desc">{s.desc}</p>
              <span className="svc__price">{s.price}</span>
            </div>
          </FadeUp>
        ))}
        </ul>
      </div>
    </section>
  );
}
