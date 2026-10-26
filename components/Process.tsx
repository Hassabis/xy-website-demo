'use client';

import { motion } from 'motion/react';
import { process } from '@/lib/content';
import { Lines } from './Reveal';

const ease = [0.76, 0, 0.24, 1] as const;

export default function Process() {
  return (
    <section className="section">
      <div className="section__head">
        <p className="label">(04) 流程 Process</p>
        <h2 className="section__title">
          <Lines lines={['Simple,', <><em>slow</em> &amp; honest.</>]} />
        </h2>
      </div>
      <ol className="process">
        {process.map((s, i) => (
          <motion.li
            className="step"
            key={s.en}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          >
            <motion.span
              className="step__line"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 1.2, ease, delay: i * 0.12 }}
            />
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.12 }}
            >
              <span className="step__no">0{i + 1}</span>
              <h3 className="step__title">
                {s.title}
                <em>{s.en}</em>
              </h3>
              <p className="step__desc">{s.desc}</p>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
