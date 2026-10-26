'use client';

import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

/** 进入视口时上浮淡入 */
export function FadeUp({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'p' | 'li';
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** 标题逐行从遮罩下方升起（监听外层，避免被 overflow 裁切后无法触发） */
export function Lines({
  lines,
  className,
  delay = 0,
  show,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  /** 传入时由外部控制显示；不传则进入视口时触发 */
  show?: boolean;
}) {
  const trigger =
    show !== undefined
      ? { initial: 'hidden', animate: show ? 'show' : 'hidden' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };
  return (
    <>
      {lines.map((line, i) => (
        <motion.span className={`line ${className ?? ''}`} key={i} {...trigger}>
          <motion.span
            className="line__inner"
            variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
            transition={{ duration: 1.2, ease, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}
