'use client';

import { useEffect, useRef, useState } from 'react';
import { getImageProps } from 'next/image';
import { motion } from 'motion/react';
import { heroTrail, site } from '@/lib/content';
import { useReady } from './Providers';
import { Lines } from './Reveal';

const ease = [0.16, 1, 0.3, 1] as const;
const SPACING = 90;

const trailImages = heroTrail.map(
  (p) =>
    getImageProps({
      src: p.src,
      alt: '',
      width: p.width,
      height: p.height,
      sizes: '(max-width: 768px) 40vw, 18vw',
    }).props,
);

export default function Hero() {
  const ready = useReady();
  const heroRef = useRef<HTMLElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const state = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, i: 0, z: 1, moved: false });
  const [pill, setPill] = useState(0);
  const [touch, setTouch] = useState(false);

  const spawn = (x: number, y: number) => {
    const s = state.current;
    const el = imgs.current[s.i % trailImages.length];
    if (!el) return;
    s.i++;
    el.style.zIndex = String(++s.z);
    const rot = (Math.random() - 0.5) * 14;
    el.getAnimations().forEach((a) => a.cancel());
    el.animate(
      [
        { opacity: 0, transform: `translate(${s.lastX}px, ${s.lastY}px) translate(-50%, -50%) scale(.5) rotate(${rot}deg)` },
        { opacity: 1, transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1) rotate(0deg)`, offset: 0.3 },
        { opacity: 1, transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1) rotate(0deg)`, offset: 0.7 },
        { opacity: 0, transform: `translate(${x}px, ${y + 40}px) translate(-50%, -50%) scale(.85) rotate(0deg)` },
      ],
      { duration: 1500, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
    );
    s.lastX = x;
    s.lastY = y;
  };

  // 鼠标移动生成图片轨迹
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const s = state.current;
    s.moved = true;
    if (Math.hypot(x - s.lastX, y - s.lastY) > SPACING) spawn(x, y);
  };

  // 鼠标未移动前 / 触屏设备：自动播放
  useEffect(() => {
    if (!ready || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isTouch = !matchMedia('(hover: hover) and (pointer: fine)').matches;
    setTouch(isTouch);
    const hero = heroRef.current;
    if (!hero) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(hero);
    const s = state.current;
    s.lastX = hero.clientWidth / 2;
    s.lastY = hero.clientHeight / 2;
    let t = 0;
    const id = setInterval(() => {
      if (!visible || (s.moved && !isTouch)) return;
      t += 1;
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      // 沿一条柔和的李萨如曲线游走
      const x = w / 2 + Math.sin(t * 0.9) * w * 0.32;
      const y = h / 2 + Math.sin(t * 1.4 + 1) * h * 0.22;
      spawn(x, y);
    }, isTouch ? 650 : 420);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [ready]);

  useEffect(() => {
    const id = setInterval(() => setPill((p) => (p + 1) % trailImages.length), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero" id="top" ref={heroRef} onPointerMove={onPointerMove}>
      <div className="hero__trail" aria-hidden>
        {trailImages.map((props, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} {...props} alt="" ref={(el) => void (imgs.current[i] = el)} loading="eager" />
        ))}
      </div>

      <motion.div
        className="hero__meta blend label"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <span>(摄影师 — Photographer)</span>
        <span className="hide-sm">
          Based in {site.cityEn} — {site.city}
        </span>
        <span>Est. {site.since}</span>
      </motion.div>

      <h1 className="hero__title">
        <span className="sr-only">{site.fullName}：光，在瞬间之间</span>
        <span className="hero__row" aria-hidden>
          <Lines className="blend" show={ready} lines={[<em key="a">Light,</em>]} />
        </span>
        <span className="hero__row hero__row--2" aria-hidden>
          <motion.span
            className="hero__pill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: ready ? 1 : 0 }}
            transition={{ duration: 1.4, ease, delay: 0.35 }}
          >
            {trailImages.map((props, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} {...props} alt="" className={i === pill ? 'is-on' : ''} />
            ))}
          </motion.span>
          <Lines className="blend" show={ready} delay={0.1} lines={['between']} />
        </span>
        <span className="hero__row hero__row--3" aria-hidden>
          <Lines className="blend" show={ready} delay={0.2} lines={['moments.']} />
        </span>
      </h1>

      <motion.p
        className="hero__vert blend"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        aria-hidden
      >
        追光而行 · 留住瞬间
      </motion.p>

      <motion.div
        className="hero__bottom blend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
        transition={{ duration: 1.2, ease, delay: 0.7 }}
      >
        <p className="hero__lede">
          {site.brandCn}摄影工作室。
          <br />
          用镜头留住那些转瞬即逝的光，和光里的人。
        </p>
        <span className="hero__hint label">{touch ? '(人像 · 婚礼 · 商业 · 旅拍)' : '(移动鼠标，看看光)'}</span>
        <span className="hero__status label">
          <i /> {site.availability}
        </span>
      </motion.div>
    </section>
  );
}
