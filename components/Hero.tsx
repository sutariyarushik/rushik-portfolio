'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { heroTypewriterStrings, heroBio } from '@/lib/data';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Build the sequences array for TypeAnimation: [string, pause, ...]
const typeSequence = heroTypewriterStrings.flatMap((s) => [s, 2000]);

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Animated gradient blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />

      {/* Dot grid */}
      <div
        className="dot-grid"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, var(--bg) 100%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ width: '100%', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '780px',
            padding: '120px 0 80px',
          }}
        >
          {/* Eyebrow pill */}
          <motion.div variants={itemVariants}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 500,
                border: '1px solid rgba(37,99,235,0.3)',
                background: 'rgba(37,99,235,0.08)',
                color: 'var(--accent)',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 6px var(--accent)',
                  display: 'inline-block',
                  animation: 'blobFloat 2s ease-in-out infinite',
                }}
              />
              Available for freelance work
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">Rushik Sutariya</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            variants={itemVariants}
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.75rem)',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              minHeight: '2.5rem',
            }}
          >
            <TypeAnimation
              sequence={typeSequence}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              style={{ color: 'var(--accent)' }}
              id="typewriter-text"
            />
          </motion.div>

          {/* One-liner */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: 0,
            }}
          >
            {heroBio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
          >
            <motion.a
              id="hero-cta-work"
              href="#projects"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(37,99,235,0.5)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'var(--accent)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              View My Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1l7 7-7 7M1 8h14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </motion.a>

            <motion.a
              id="hero-cta-contact"
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                borderRadius: '12px',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
                border: '1px solid var(--border-strong)',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '8px',
              color: 'var(--text-muted)',
              fontSize: '13px',
            }}
          >
            <div style={{ display: 'flex', gap: '-8px' }}>
              {['#2563EB', '#7C3AED', '#059669', '#D97706'].map((c, i) => (
                <div
                  key={c}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: c,
                    border: '2px solid var(--bg)',
                    marginLeft: i > 0 ? '-8px' : 0,
                  }}
                />
              ))}
            </div>
            Trusted by clients across 3 industries
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '12px',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '22px',
            height: '36px',
            border: '2px solid var(--border-strong)',
            borderRadius: '11px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px',
          }}
        >
          <div
            style={{
              width: '4px',
              height: '8px',
              borderRadius: '2px',
              background: 'var(--accent)',
            }}
          />
        </motion.div>
        scroll
      </motion.div>
    </section>
  );
}
