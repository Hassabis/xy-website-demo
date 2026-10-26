'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { photos, site } from '@/lib/content';
import Magnetic from './Magnetic';
import { useClock } from './Nav';
import { scrollToTarget } from './Providers';
import { FadeUp, Lines } from './Reveal';

export default function Contact() {
  const time = useClock(site.timeZone);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const markY = useTransform(scrollYProgress, [0.4, 1], ['40%', '0%']);

  return (
    <section className="contact" id="contact" ref={ref}>
      <p className="label">(05) 联系 Contact</p>

      <div className="contact__head">
        <h2 className="contact__title">
          <Lines
            lines={[
              "Let's make",
              <span className="contact__row" key="r">
                <span className="contact__pill">
                  <Image src={photos.sea.src} alt="" fill sizes="240px" />
                </span>
                <em>something</em>
              </span>,
              'beautiful.',
            ]}
          />
        </h2>
        <Magnetic strength={0.4} className="contact__cta-wrap">
          <a className="cta-circle" href={`mailto:${site.email}`}>
            <span>
              预约拍摄
              <br />
              <small>Book a shoot</small>
            </span>
          </a>
        </Magnetic>
      </div>

      <FadeUp className="contact__mail">
        <p className="contact__note">有想拍的故事？告诉我你的想法，48 小时内回复。</p>
        <a className="contact__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </FadeUp>

      <div className="contact__grid">
        <div>
          <p className="label">工作室 Studio</p>
          <p>{site.address}</p>
          <p className="muted">{site.hours}</p>
        </div>
        <div>
          <p className="label">社交 Social</p>
          <ul className="contact__socials">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="ulink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">本地时间 Local time</p>
          <p className="mono">
            {site.city} {time}
          </p>
          <p className="muted">
            <span className="dot" /> {site.availability}
          </p>
        </div>
        <div className="contact__top">
          <button className="ulink" onClick={() => scrollToTarget(0)}>
            回到顶部 ↑
          </button>
        </div>
      </div>

      <div className="wordmark" aria-hidden>
        <motion.span style={{ y: markY }}>{site.brand}</motion.span>
      </div>

      <footer className="footer label">
        <span>
          © {new Date().getFullYear()} {site.fullName}
        </span>
        <a className="ulink" href="/photo-credits.html">Photography credits ↗</a>
      </footer>
    </section>
  );
}
