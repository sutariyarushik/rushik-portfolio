'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/data';
import { FaLinkedin } from 'react-icons/fa';
import {
  FiMail,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiDownload,
  FiAlertCircle,
  FiCheckCircle,
  FiPhone,
} from 'react-icons/fi';

// ─── Types ──────────────────────────────────────────────────────────────────
interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormState {
  success?: boolean;
  error?: string;
}

// ─── Validation ─────────────────────────────────────────────────────────────
function validate(
  name: string,
  email: string,
  subject: string,
  message: string
): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = 'Name is required.';
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';

  if (!email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Enter a valid email address.';

  if (!subject.trim()) errors.subject = 'Subject is required.';

  if (!message.trim()) errors.message = 'Message is required.';
  else if (message.trim().length < 10)
    errors.message = 'Message must be at least 10 characters.';

  return errors;
}

// ─── Input Field ─────────────────────────────────────────────────────────────
function Field({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  icon,
  error,
  multiline,
  rows = 1,
  value,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const hasValue = value.trim().length > 0;

  const borderColor = hasError
    ? '#ef4444'
    : focused
    ? 'var(--accent)'
    : 'var(--border-strong)';

  const boxShadow = hasError
    ? '0 0 0 3px rgba(239,68,68,0.12)'
    : focused
    ? '0 0 0 3px rgba(37,99,235,0.15)'
    : 'none';

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--surface)',
    border: `1.5px solid ${borderColor}`,
    borderRadius: '12px',
    padding: multiline ? '14px 14px 14px 44px' : '14px 14px 14px 44px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow,
    resize: multiline ? 'vertical' : undefined,
    fontFamily: 'inherit',
    lineHeight: '1.6',
    boxSizing: 'border-box',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{
          fontSize: '13px',
          fontWeight: 600,
          color: hasError ? '#ef4444' : focused ? 'var(--accent)' : 'var(--text-secondary)',
          transition: 'color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {label}
        <span style={{ color: '#ef4444' }}> *</span>
      </label>

      <div style={{ position: 'relative' }}>
        {/* Leading icon */}
        <div
          style={{
            position: 'absolute',
            left: '14px',
            top: multiline ? '15px' : '50%',
            transform: multiline ? 'none' : 'translateY(-50%)',
            color: hasError ? '#ef4444' : focused ? 'var(--accent)' : 'var(--text-muted)',
            transition: 'color 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {icon}
        </div>

        {/* Trailing status icon */}
        <AnimatePresence>
          {(hasError || (hasValue && !hasError)) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={{
                position: 'absolute',
                right: '14px',
                top: multiline ? '15px' : '50%',
                transform: multiline ? 'none' : 'translateY(-50%)',
                color: hasError ? '#ef4444' : '#22c55e',
                display: 'flex',
              }}
            >
              {hasError ? <FiAlertCircle size={16} /> : <FiCheckCircle size={16} />}
            </motion.div>
          )}
        </AnimatePresence>

        {multiline ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...sharedStyle, paddingRight: '40px' }}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ ...sharedStyle, paddingRight: '40px' }}
          />
        )}
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            style={{
              margin: 0,
              fontSize: '12px',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 500,
            }}
          >
            <FiAlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [state, setState] = useState<FormState | null>(null);
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validate(name, email, subject, message);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsPending(true);
    setState(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await res.json()) as { success: boolean; error?: string };

      if (data.success) {
        setSubmitted(true);
        setState({ success: true });
        setName(''); setEmail(''); setSubject(''); setMessage('');
        setFieldErrors({});
      } else {
        setState({ error: data.error ?? 'Something went wrong.' });
      }
    } catch {
      setState({ error: 'Network error. Please try again.' });
    } finally {
      setIsPending(false);
    }
  }

  const contactCards = [
    {
      id: 'contact-email-btn',
      href: `mailto:${siteConfig.email}`,
      icon: <FiMail size={22} />,
      iconBg: 'rgba(37,99,235,0.12)',
      iconColor: 'var(--accent)',
      glowColor: 'rgba(37,99,235,0.25)',
      label: 'Email Me Directly',
      value: siteConfig.email,
      external: false,
    },
    {
      id: 'contact-linkedin-btn',
      href: siteConfig.linkedin,
      icon: <FaLinkedin size={22} />,
      iconBg: 'rgba(10,102,194,0.12)',
      iconColor: '#0A66C2',
      glowColor: 'rgba(10,102,194,0.25)',
      label: 'Connect on LinkedIn',
      value: 'rushik-sutariya',
      external: true,
    },
    {
      id: 'contact-resume-btn',
      href: siteConfig.resume,
      icon: <FiDownload size={22} />,
      iconBg: 'rgba(124,58,237,0.12)',
      iconColor: '#7C3AED',
      glowColor: 'rgba(124,58,237,0.25)',
      label: 'Download Resume',
      value: 'Rushik_Sutariya_Resume.pdf',
      external: false,
      download: 'Rushik_Sutariya_Resume.pdf',
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="section-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '64px', textAlign: 'center' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(37,99,235,0.08)',
              border: '1px solid rgba(37,99,235,0.2)',
              marginBottom: '16px',
            }}
          >
            <FiPhone size={12} color="var(--accent)" />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
              }}
            >
              Contact
            </span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              margin: '0 0 16px',
            }}
          >
            Let&apos;s{' '}
            <span className="gradient-text">get in touch</span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Have an opportunity or just want to connect? Every message gets a personal reply.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            maxWidth: '960px',
            margin: '0 auto',
          }}
        >
          {/* ─── Left: contact cards ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {contactCards.map((card, i) => (
              <motion.a
                key={card.id}
                id={card.id}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                download={card.download}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '16px',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 12px 40px ${card.glowColor}`;
                  el.style.borderColor = card.iconColor;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'var(--card-border)';
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: card.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: card.iconColor,
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginBottom: '3px',
                      fontWeight: 500,
                    }}
                  >
                    {card.label}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.value}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    color: 'var(--text-muted)',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}
                >
                  →
                </div>
              </motion.a>
            ))}

            {/* Response badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              style={{
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(5,150,105,0.06)',
                border: '1px solid rgba(5,150,105,0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(5,150,105,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0,
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#059669' }}>
                  Fast Response
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Typically replies within 24 hours
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: contact form ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Card accent stripe */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--accent), #7c3aed)',
                  borderRadius: '20px 20px 0 0',
                }}
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ─── Success State ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      textAlign: 'center',
                      padding: '32px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        background: 'rgba(5,150,105,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#059669',
                        fontSize: '36px',
                      }}
                    >
                      ✓
                    </motion.div>
                    <div>
                      <h3
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          marginBottom: '8px',
                        }}
                      >
                        Message received! 🎉
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                        Thanks for reaching out, <strong>{name || 'there'}</strong>. I&apos;ll get
                        back to you within 24 hours.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setSubmitted(false); setState(null); }}
                      style={{
                        padding: '10px 24px',
                        borderRadius: '10px',
                        border: '1.5px solid var(--border-strong)',
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                      }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ─── Form State ─── */
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                  >
                    {/* Form title */}
                    <div style={{ marginBottom: '4px' }}>
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          margin: '0 0 4px',
                          letterSpacing: '-0.3px',
                        }}
                      >
                        Send a message
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                        All fields marked with <span style={{ color: '#ef4444' }}>*</span> are required.
                      </p>
                    </div>

                    {/* API-level error */}
                    <AnimatePresence>
                      {state?.error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          style={{
                            padding: '12px 16px',
                            borderRadius: '10px',
                            background: 'rgba(239,68,68,0.08)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontSize: '13px',
                            color: '#ef4444',
                            fontWeight: 500,
                          }}
                        >
                          <FiAlertCircle size={16} style={{ flexShrink: 0 }} />
                          {state.error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name + Email row */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '16px',
                      }}
                    >
                      <Field
                        id="contact-name"
                        name="name"
                        label="Your Name"
                        placeholder="Rushik Sutariya"
                        icon={<FiUser size={15} />}
                        error={fieldErrors.name}
                        value={name}
                        onChange={setName}
                      />
                      <Field
                        id="contact-email"
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        icon={<FiMail size={15} />}
                        error={fieldErrors.email}
                        value={email}
                        onChange={setEmail}
                      />
                    </div>

                    <Field
                      id="contact-subject"
                      name="subject"
                      label="Subject"
                      placeholder="Job opportunity / Project / Just saying hi"
                      icon={<FiMessageSquare size={15} />}
                      error={fieldErrors.subject}
                      value={subject}
                      onChange={setSubject}
                    />

                    <Field
                      id="contact-message"
                      name="message"
                      label="Message"
                      placeholder="Tell me about the opportunity, project, or whatever's on your mind..."
                      icon={<FiMessageSquare size={15} />}
                      error={fieldErrors.message}
                      multiline
                      rows={5}
                      value={message}
                      onChange={setMessage}
                    />

                    {/* Submit */}
                    <motion.button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={isPending}
                      whileHover={isPending ? {} : { scale: 1.02, boxShadow: '0 0 28px rgba(37,99,235,0.45)' }}
                      whileTap={isPending ? {} : { scale: 0.98 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        background: isPending
                          ? 'var(--surface-2)'
                          : 'linear-gradient(135deg, var(--accent), #7c3aed)',
                        color: isPending ? 'var(--text-muted)' : '#fff',
                        fontWeight: 700,
                        fontSize: '15px',
                        border: 'none',
                        cursor: isPending ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s ease',
                        fontFamily: 'inherit',
                        letterSpacing: '-0.2px',
                      }}
                    >
                      {isPending ? (
                        <>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            style={{ animation: 'spin 0.8s linear infinite' }}
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray="40"
                              strokeDashoffset="10"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <FiSend size={17} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
