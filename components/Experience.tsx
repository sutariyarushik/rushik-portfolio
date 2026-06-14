'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { experience } from '@/lib/data';
import { FiBriefcase } from 'react-icons/fi';
import { HiCheckCircle } from 'react-icons/hi2';

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.3'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      style={{ padding: '100px 0', background: 'var(--bg)' }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px' }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '8px',
            }}
          >
            Experience
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-1px',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Where I&apos;ve{' '}
            <span className="gradient-text">worked</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div
          ref={ref}
          style={{
            position: 'relative',
            maxWidth: '720px',
            paddingLeft: '48px',
          }}
        >
          {/* Animated vertical line — track */}
          {/* left: 17px centres the 2px line on the dot (dot left-edge = 48-41=7px, dot centre = 7+11=18px, line centre = 17+1=18px) */}
          {/* top: 15px aligns the line start with the dot centre (dot top=4px, dot h=22px → centre=15px) */}
          <div
            style={{
              position: 'absolute',
              left: '17px',
              top: '15px',
              bottom: 0,
              width: '2px',
              background: 'var(--border)',
              borderRadius: '2px',
            }}
          />
          {/* Animated fill */}
          <motion.div
            style={{
              position: 'absolute',
              left: '17px',
              top: '15px',
              width: '2px',
              height: lineHeight,
              borderRadius: '2px',
              background: 'linear-gradient(to bottom, var(--accent), #7C3AED)',
            }}
          />

          {experience.map((item, idx) => (
            <motion.div
              key={item.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{ position: 'relative', paddingBottom: '48px' }}
            >
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-41px',
                  top: '4px',
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  border: '3px solid var(--bg)',
                  boxShadow: '0 0 12px rgba(37,99,235,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                <FiBriefcase size={10} color="#fff" />
              </div>

              {/* Card */}
              <div
                className="glass-card"
                style={{
                  padding: '28px',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '20px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '4px',
                      }}
                    >
                      {item.role}
                    </h3>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'var(--accent)',
                      }}
                    >
                      {item.company}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 500,
                      background: 'rgba(37,99,235,0.1)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(37,99,235,0.2)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {item.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                        fontSize: '14px',
                        lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <HiCheckCircle
                        size={16}
                        color="var(--accent)"
                        style={{ marginTop: '3px', flexShrink: 0 }}
                      />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
