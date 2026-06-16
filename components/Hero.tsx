'use client';

import { motion, type Variants } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import { heroTypewriterStrings, heroBio, siteConfig } from '@/lib/data';
import { FaLinkedin } from 'react-icons/fa';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '60px',
            alignItems: 'center',
            padding: '120px 0 80px',
          }}
        >
          {/* Left — text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '640px',
            }}
          >
            {/* Availability status pill */}
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
                  border: '1px solid rgba(5,150,105,0.3)',
                  background: 'rgba(5,150,105,0.08)',
                  color: '#059669',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#059669',
                    boxShadow: '0 0 6px #059669',
                    display: 'inline-block',
                    animation: 'blobFloat 2s ease-in-out infinite',
                  }}
                />
                Open to Opportunities
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
              <span id="typewriter-text">
                <TypeAnimation
                  sequence={typeSequence}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  style={{ color: 'var(--accent)' }}
                />
              </span>
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
              {/* View Work */}
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
                <FiArrowRight size={16} />
              </motion.a>

              {/* Resume Download */}
              <motion.a
                id="hero-cta-resume"
                href={siteConfig.resume}
                download="Rushik_Sutariya_Resume.pdf"
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
                <FiDownload size={16} />
                Resume
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                id="hero-cta-linkedin"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: '#0A66C2',
                  fontWeight: 600,
                  fontSize: '15px',
                  textDecoration: 'none',
                  border: '1px solid rgba(10,102,194,0.3)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(10,102,194,0.08)';
                  (e.currentTarget as HTMLElement).style.borderColor = '#0A66C2';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,102,194,0.3)';
                }}
              >
                <FaLinkedin size={18} />
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: 'min(340px, 90vw)',
                height: 'min(340px, 90vw)',
              }}
            >
              {/* Glow ring */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-4px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed, #059669)',
                  animation: 'profileRingRotate 6s linear infinite',
                  zIndex: 0,
                }}
              />
              {/* White gap */}
              <div
                style={{
                  position: 'absolute',
                  inset: '0px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  zIndex: 1,
                }}
              />
              {/* Photo */}
              <div
                style={{
                  position: 'absolute',
                  inset: '6px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  zIndex: 2,
                  boxShadow: '0 20px 60px rgba(37,99,235,0.25)',
                }}
              >
                <Image
                  src="/my_profile.webp"
                  alt="Rushik Sutariya — Software Developer"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  priority
                />
              </div>

              {/* Experience badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '-20px',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  boxShadow: '0 8px 30px rgba(37,99,235,0.4)',
                  zIndex: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                3+ Years Exp
              </motion.div>

              {/* React/Next badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '-24px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '16px' }}>⚛️</span>
                React & Next.js
              </motion.div>
            </div>
          </motion.div>
        </div>
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
