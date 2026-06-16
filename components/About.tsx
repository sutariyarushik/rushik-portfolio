'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { aboutBio, stats } from '@/lib/data';

// ─── Count-Up Hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return count;
}

// ─── Stat Card with Count-Up ─────────────────────────────────────────────────
function StatCard({ stat }: { stat: { value: string; label: string } }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse numeric part and suffix (e.g. "3+" → num=3, suffix="+")
  const match = stat.value.match(/^(\d+)(\D*)$/);
  const numericTarget = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : stat.value;
  const isNumeric = !!match;

  const count = useCountUp(numericTarget, 1400, inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Card
        id={`stat-card-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
        elevation={0}
        sx={{
          background: 'var(--card-bg) !important',
          border: '1px solid var(--card-border) !important',
          borderRadius: '16px !important',
          backdropFilter: 'blur(12px)',
          cursor: 'default',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease !important',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 16px 40px var(--accent-glow) !important',
          },
        }}
      >
        <CardContent sx={{ padding: '28px !important' }}>
          <div
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--accent)',
              letterSpacing: '-1px',
              lineHeight: 1,
              marginBottom: '8px',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {isNumeric ? `${count}${suffix}` : stat.value}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            {stat.label}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const sectionVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="section-container">
        {/* Section header */}
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
            About Me
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
            The developer behind{' '}
            <span className="gradient-text">the work</span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'start',
          }}
        >
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '24px',
              }}
            >
              {aboutBio}
            </p>
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '32px',
              }}
            >
              I thrive at the intersection of design and engineering — obsessing over
              performance, accessibility, and pixel-perfect implementation. When I&apos;m
              not shipping features, you&apos;ll find me exploring new patterns in the
              React ecosystem or optimising Core Web Vitals.
            </p>

            {/* Quick facts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { label: '📍 Location', value: 'Ahmedabad, Gujarat, India' },
                { label: '🏢 Company', value: 'Vivansh Infotech Pvt Ltd' },
                { label: '📧 Email', value: 'rushiks.work@gmail.com' },
                { label: '📱 Phone', value: '+91 7043234063' },
                { label: '🎯 Focus', value: 'React.js · Next.js · Node.js' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'baseline',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)', minWidth: '130px' }}>
                    {fact.label}
                  </span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats cards with count-up */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <StatCard stat={stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
