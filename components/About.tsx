'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, MotionValue, useInView, useScroll, useTransform } from 'motion/react';
import { about, photos, site } from '@/lib/content';
import { FadeUp } from './Reveal';

function Char({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

function Statement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const chars = Array.from(text);
  return (
    <p className="statement" ref={ref} aria-label={text}>
      {chars.map((c, i) => (
        <Char key={i} progress={scrollYProgress} range={[i / chars.length, (i + 1) / chars.length]}>
          {c}
        </Char>
      ))}
    </p>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className="stat__num">
      {n.toLocaleString('en-US')}
      <sup>{suffix}</sup>
    </span>
  );
}

export default function About() {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section className="section about" id="about">
      <div className="about__media">
        <motion.div
          ref={frameRef}
          className="about__frame"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div className="about__img" style={{ y: imgY }}>
            <Image src={photos.photographer.src} alt={photos.photographer.alt} fill sizes="(max-width: 860px) 100vw, 40vw" />
          </motion.div>
        </motion.div>
        <div className="about__caption label">
          <span>
            {site.photographer} / {site.photographerEn}
          </span>
          <span>Photographer &amp; Founder</span>
        </div>
      </div>

      <div className="about__body">
        <p className="label">(03) 关于 About</p>
        <Statement text={about.statement} />
        <div className="about__bio">
          {about.bio.map((p, i) => (
            <FadeUp as="p" key={i} delay={i * 0.1}>
              {p}
            </FadeUp>
          ))}
        </div>
        <div className="stats">
          {about.stats.map((s) => (
            <div className="stat" key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
