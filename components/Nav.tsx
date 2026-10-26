'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { nav, site } from '@/lib/content';
import { lockScroll, scrollToTarget, useReady } from './Providers';
import Magnetic from './Magnetic';

const ease = [0.76, 0, 0.24, 1] as const;

export function useClock(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('zh-CN', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time ?? '--:--:--';
}

function RollLink({ children, onClick, href }: { children: string; onClick: () => void; href: string }) {
  return (
    <a
      href={href}
      className="roll"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <span data-text={children}>{children}</span>
    </a>
  );
}

export default function Nav() {
  const ready = useReady();
  const time = useClock(site.timeZone);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const last = useRef(0);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const diff = y - last.current;
    if (Math.abs(diff) > 6) setHidden(diff > 0 && y > 240);
    last.current = y;
  });

  useEffect(() => {
    if (!ready) return;
    lockScroll(open);
  }, [open, ready]);

  const go = (href: string) => {
    setOpen(false);
    // 等菜单收起、滚动解锁后再滚动
    setTimeout(() => scrollToTarget(href), open ? 450 : 0);
  };

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: ready && (!hidden || open) ? 0 : -100, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <a
          href="#top"
          className="nav__logo"
          onClick={(e) => {
            e.preventDefault();
            go('#top');
          }}
        >
          {site.brand}
          <small>{site.brandCn}摄影</small>
        </a>

        <nav className="nav__links" aria-label="主导航">
          {nav.map((item) => (
            <RollLink key={item.href} href={item.href} onClick={() => go(item.href)}>
              {`${item.label} ${item.en}`}
            </RollLink>
          ))}
        </nav>

        <div className="nav__right">
          <span className="nav__clock">
            {site.city} {time}
          </span>
          <Magnetic>
            <a
              className="nav__cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go('#contact');
              }}
            >
              预约拍摄 <span aria-hidden>↗</span>
            </a>
          </Magnetic>
          <button className="nav__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
            <span className={`burger ${open ? 'is-open' : ''}`} aria-hidden>
              <i />
              <i />
            </span>
            {open ? '关闭' : '菜单'}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <nav className="menu__links">
              {nav.map((item, i) => (
                <div className="line" key={item.href}>
                  <motion.a
                    href={item.href}
                    className="menu__link"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.07 }}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                  >
                    <small>0{i + 1}</small>
                    {item.en}
                    <small>{item.label}</small>
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <div className="menu__socials">
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href}>
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
