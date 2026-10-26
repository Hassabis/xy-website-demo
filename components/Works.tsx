'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { site, works } from '@/lib/content';
import Lightbox from './Lightbox';

function Card({
  work,
  index,
  progress,
  onOpen,
}: {
  work: (typeof works)[number];
  index: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  const x = useTransform(progress, [0, 1], ['6%', '-6%']);
  const { photo } = work;
  return (
    <button className="work" data-cursor="查看" onClick={onOpen} aria-label={`查看作品：${work.title}`}>
      <div className="work__frame" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
        <span className="work__no">{String(index + 1).padStart(2, '0')}</span>
        <motion.div className="work__img" style={{ x }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 90vw, 50vw"
          />
        </motion.div>
      </div>
      <div className="work__cap">
        <span className="work__title">
          {work.title}
          <em>{work.en}</em>
        </span>
        <span className="work__meta">
          {work.place} · {work.year}
        </span>
      </div>
    </button>
  );
}

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [vh, setVh] = useState(0);
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setDist(Math.max(0, track.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (v) => -v * dist);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(works.length, Math.floor(v * works.length) + 1));
  });

  return (
    <section
      className="works"
      id="works"
      ref={sectionRef}
      style={{ height: dist && vh ? dist + vh : undefined }}
    >
      <div className="works__sticky">
        <motion.div className="works__track" ref={trackRef} style={{ x }}>
          <div className="works__intro">
            <p className="label">(01) 精选作品</p>
            <h2>
              Selected
              <br />
              <em>Works</em>
            </h2>
            <p className="works__desc">
              过去几年里，我在海边、雪山、城市街头和小小的工作室里，追逐过的那些光。点击任意一张查看大图。
            </p>
          </div>

          {works.map((w, i) => (
            <Card key={w.title} work={w} index={i} progress={scrollYProgress} onOpen={() => setOpen(i)} />
          ))}

          <a className="works__outro" href={site.socials[0].href} data-cursor="前往">
            <span className="label">更多作品</span>
            <span className="works__outro-title">
              See more <em>on</em>
              <br />
              {site.socials[0].label} ↗
            </span>
          </a>
        </motion.div>

        <div className="works__foot label">
          <span>
            {String(current).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
          </span>
          <div className="works__bar">
            <motion.i style={{ scaleX: scrollYProgress }} />
          </div>
          <span className="hide-sm">继续滚动 →</span>
        </div>
      </div>

      <Lightbox
        items={works.map((w) => ({ ...w.photo, caption: `${w.title} — ${w.en}`, meta: `${w.place} · ${w.year} · ${w.category}` }))}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
      />
    </section>
  );
}
