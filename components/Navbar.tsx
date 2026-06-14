'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { navLinks, siteConfig } from '@/lib/data';
import { FaLinkedin } from 'react-icons/fa';
import { FiMail, FiDownload } from 'react-icons/fi';

// ─── Animated hamburger icon (3 bars → X) ─────
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const variants = {
    top: {
      open: { rotate: 45, y: 7 },
      closed: { rotate: 0, y: 0 },
    },
    mid: {
      open: { opacity: 0, scaleX: 0 },
      closed: { opacity: 1, scaleX: 1 },
    },
    bot: {
      open: { rotate: -45, y: -7 },
      closed: { rotate: 0, y: 0 },
    },
  };

  const bar: React.CSSProperties = {
    display: 'block',
    height: '2px',
    width: '20px',
    borderRadius: '2px',
    background: 'currentColor',
    transformOrigin: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20px',
        height: '20px',
      }}
    >
      <motion.span
        style={bar}
        variants={variants.top}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        style={bar}
        variants={variants.mid}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
      <motion.span
        style={bar}
        variants={variants.bot}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

// ─── Nav link item with number + hover effects ──
function MobileNavItem({
  label,
  href,
  index,
  onClick,
  isActive,
}: {
  label: string;
  href: string;
  index: number;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: 60, filter: 'blur(4px)' }}
      transition={{
        delay: index * 0.07,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.button
        onClick={onClick}
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        initial="rest"
        animate="rest"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '16px 0',
          borderBottom: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'left',
        }}
      >
        {/* Active / hover accent line */}
        <motion.div
          variants={{
            rest: { scaleX: 0 },
            hover: { scaleX: 1 },
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, var(--accent), #7C3AED)',
            transformOrigin: 'left',
          }}
        />

        {/* Index number */}
        <motion.span
          variants={{
            rest: { color: 'var(--text-muted)' },
            hover: { color: 'var(--accent)' },
          }}
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1px',
            fontFamily: 'monospace',
            minWidth: '24px',
            transition: 'color 0.2s ease',
          }}
        >
          0{index + 1}
        </motion.span>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

        {/* Label */}
        <motion.span
          variants={{
            rest: { color: 'var(--text-secondary)', x: 0 },
            hover: { color: 'var(--text-primary)', x: 6 },
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            flex: 1,
          }}
        >
          {label}
        </motion.span>

        {/* Arrow */}
        <motion.span
          variants={{
            rest: { opacity: 0, x: -10 },
            hover: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '18px',
            color: 'var(--accent)',
          }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  );
}

// ─── Main Navbar ────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at calc(100% - 36px) 36px)',
      transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
    open: {
      clipPath: 'circle(150% at calc(100% - 36px) 36px)',
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
    },
  };

  return (
    <>
      {/* ── Navbar bar ─────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          /* Keep navbar BELOW the mobile menu panel (z-index: 200) */
          zIndex: 50,
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border)'
            : '1px solid transparent',
          transition:
            'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <div
          className="section-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Monogram */}
          <Link href="/" id="nav-logo">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--accent)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '15px',
                letterSpacing: '-0.5px',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(37,99,235,0.4)',
              }}
            >
              RS
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden md:flex items-center gap-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    transition: 'color 0.2s ease, background 0.2s ease',
                    position: 'relative',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(37,99,235,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = isActive ? 'var(--accent)' : 'var(--text-secondary)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: -2,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--accent)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ThemeToggle />

            {/* Animated hamburger button */}
            <motion.button
              id="mobile-menu-btn"
              className="flex md:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              whileTap={{ scale: 0.88 }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                background: menuOpen
                  ? 'rgba(37,99,235,0.12)'
                  : 'var(--surface)',
                border: `1px solid ${menuOpen ? 'rgba(37,99,235,0.4)' : 'var(--border)'}`,
                borderRadius: '10px',
                padding: '8px',
                cursor: 'pointer',
                color: menuOpen ? 'var(--accent)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: menuOpen
                  ? '0 0 16px rgba(37,99,235,0.3)'
                  : 'none',
              }}
            >
              <HamburgerIcon isOpen={menuOpen} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Full-screen mobile menu overlay ────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop — above navbar (50) but below panel (200) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 150,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />

            {/* Menu panel — ABOVE backdrop (150) and navbar (50) */}
            <motion.div
              key="menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 'min(340px, 100vw)',
                height: '100dvh',
                /* Must be above everything: navbar (50), backdrop (150) */
                zIndex: 200,
                display: 'flex',
                flexDirection: 'column',
                /* Fully opaque — no bleed-through. Use explicit colours for both themes. */
                background: 'var(--menu-bg)',
                borderLeft: '1px solid var(--menu-border)',
                overflowY: 'auto',
                overflowX: 'hidden',
                boxShadow: '-8px 0 40px rgba(0,0,0,0.25)',
              }}
            >
              {/* Decorative top gradient */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '240px',
                  height: '240px',
                  background:
                    'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '120px',
                  left: '-40px',
                  width: '200px',
                  height: '200px',
                  background:
                    'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 28px',
                  borderBottom: '1px solid var(--border)',
                  height: '72px',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                      boxShadow: '0 0 14px rgba(37,99,235,0.35)',
                    }}
                  >
                    RS
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}
                    >
                      Rushik Sutariya
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#22c55e',
                          display: 'inline-block',
                          boxShadow: '0 0 6px #22c55e',
                          animation: 'blobFloat 2s ease-in-out infinite',
                        }}
                      />
                      Available · Open to Roles
                    </div>
                  </div>
                </div>

                {/* Close button */}
                <motion.button
                  onClick={() => setMenuOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    width: '36px',
                    height: '36px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '18px',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Navigation links */}
              <nav
                style={{
                  flex: 1,
                  padding: '24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'var(--text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  Navigation
                </div>

                <div>
                  {navLinks.map((link, i) => (
                    <MobileNavItem
                      key={link.href}
                      label={link.label}
                      href={link.href}
                      index={i}
                      onClick={() => handleNavClick(link.href)}
                      isActive={activeSection === link.href.replace('#', '')}
                    />
                  ))}
                </div>
              </nav>

              {/* Bottom panel — contact shortcuts + socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.45, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: '20px 28px 32px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  flexShrink: 0,
                }}
              >
                {/* Quick contact pill */}
                <a
                  href={`mailto:${siteConfig.email}`}
                  id="mobile-menu-email"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(37,99,235,0.07)',
                    border: '1px solid rgba(37,99,235,0.2)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      'rgba(37,99,235,0.14)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      'rgba(37,99,235,0.07)';
                  }}
                >
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <FiMail size={15} />
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Email me directly
                    </div>
                    <div
                      style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}
                    >
                      {siteConfig.email}
                    </div>
                  </div>
                </a>

                {/* Social row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    Find me online
                  </span>

                  {[
                    {
                      id: 'mobile-menu-linkedin',
                      href: siteConfig.linkedin,
                      icon: <FaLinkedin size={15} />,
                      color: '#0A66C2',
                      label: 'LinkedIn',
                      isDownload: false,
                    },
                    {
                      id: 'mobile-menu-resume',
                      href: siteConfig.resume,
                      icon: <FiDownload size={15} />,
                      color: 'var(--accent)',
                      label: 'Resume',
                      isDownload: true,
                    },
                  ].map((s) => (
                    <motion.a
                      key={s.id}
                      id={s.id}
                      href={s.href}
                      target={s.isDownload ? undefined : '_blank'}
                      rel={s.isDownload ? undefined : 'noopener noreferrer'}
                      download={s.isDownload ? 'Rushik_Sutariya_Resume.pdf' : undefined}
                      aria-label={s.label}
                      whileHover={{ scale: 1.12, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        background: 'var(--surface)',
                        transition: 'color 0.2s ease, border-color 0.2s ease',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = s.color;
                        (e.currentTarget as HTMLElement).style.borderColor = s.color;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          'var(--text-secondary)';
                        (e.currentTarget as HTMLElement).style.borderColor =
                          'var(--border)';
                      }}
                    >
                      {s.icon}
                    </motion.a>
                  ))}
                </div>

                {/* Footer tagline */}
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    paddingTop: '4px',
                  }}
                >
                  © 2025 · Rushik Sutariya
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
