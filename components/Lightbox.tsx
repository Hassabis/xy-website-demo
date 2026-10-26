'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import type { Photo } from '@/lib/content';
import { lockScroll } from './Providers';

type Item = Photo & { caption: string; meta: string };

export default function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: Item[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const isOpen = index !== null;
  const step = (d: number) => {
    if (index === null) return;
    onIndex((index + d + items.length) % items.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal
          aria-label={item.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
        >
          <div className="lightbox__stage">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                className="lightbox__img"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'contain' }}
                  draggable={false}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="lightbox__caption">{item.caption}</p>
              <p className="label">{item.meta}</p>
            </div>
            <div className="lightbox__ctrl">
              <button onClick={() => step(-1)} aria-label="上一张">
                ←
              </button>
              <span className="label">
                {String(index! + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
              <button onClick={() => step(1)} aria-label="下一张">
                →
              </button>
            </div>
          </div>

          <button className="lightbox__close" onClick={onClose} aria-label="关闭">
            关闭 ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
