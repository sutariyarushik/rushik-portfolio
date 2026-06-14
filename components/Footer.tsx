'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { FaLinkedin } from 'react-icons/fa';
import { FiHeart, FiDownload } from 'react-icons/fi';

export default function Footer() {
  const [year, setYear] = useState(2025);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '40px 0',
      }}
    >
      <div
        className="section-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center',
        }}
      >
        {/* Monogram */}
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9px',
            background: 'var(--accent)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(37,99,235,0.3)',
          }}
        >
          RS
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <motion.a
            id="footer-linkedin"
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#0A66C2';
              (e.currentTarget as HTMLElement).style.borderColor = '#0A66C2';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            }}
          >
            <FaLinkedin size={17} />
          </motion.a>

          <motion.a
            id="footer-resume"
            href={siteConfig.resume}
            download="Rushik_Sutariya_Resume.pdf"
            aria-label="Download Resume"
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
            }}
          >
            <FiDownload size={17} />
          </motion.a>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          Designed &amp; built by{' '}
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            Rushik Sutariya
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            with <FiHeart size={12} color="var(--accent)" /> · {year}
          </span>
        </p>
      </div>
    </footer>
  );
}
