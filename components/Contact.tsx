'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { siteConfig } from '@/lib/data';
import { submitContact } from '@/lib/actions';
import { FaLinkedin } from 'react-icons/fa';
import { FiMail, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

export default function Contact() {
  const [state, action, isPending] = useActionState(submitContact, null);

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      color: 'var(--text-primary)',
      background: 'var(--surface)',
      borderRadius: '12px',
      '& fieldset': { borderColor: 'var(--border-strong)', borderRadius: '12px' },
      '&:hover fieldset': { borderColor: 'var(--accent)' },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--accent)',
        boxShadow: '0 0 0 3px rgba(37,99,235,0.15)',
      },
    },
    '& .MuiInputLabel-root': { color: 'var(--text-muted)' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'var(--accent)' },
    '& .MuiInputAdornment-root': { color: 'var(--text-muted)' },
  };

  return (
    <section
      id="contact"
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px', textAlign: 'center' }}
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
            Contact
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-1px',
              lineHeight: 1.2,
              margin: '0 0 16px',
            }}
          >
            Let&apos;s{' '}
            <span className="gradient-text">work together</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'start',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Direct contact options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Email card */}
            <motion.a
              id="contact-email-btn"
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 20px var(--accent-glow)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(37,99,235,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  flexShrink: 0,
                }}
              >
                <FiMail size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Email Me
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>
                  {siteConfig.email}
                </div>
              </div>
            </motion.a>

            {/* LinkedIn card */}
            <motion.a
              id="contact-linkedin-btn"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px 24px',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 20px rgba(10,102,194,0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(10,102,194,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0A66C2',
                  flexShrink: 0,
                }}
              >
                <FaLinkedin size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Connect on LinkedIn
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600 }}>
                  rushik-sutariya
                </div>
              </div>
            </motion.a>

            {/* Response time note */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(5,150,105,0.08)',
                border: '1px solid rgba(5,150,105,0.2)',
                fontSize: '13px',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '16px' }}>⚡</span>
              Typically responds within 24 hours
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="glass-card"
              style={{ padding: '32px' }}
            >
              {state?.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '20px 0',
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    Message sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
                    Send a message
                  </h3>

                  {state?.error && (
                    <Alert severity="error" sx={{ borderRadius: '10px', fontSize: '13px' }}>
                      {state.error}
                    </Alert>
                  )}

                  <TextField
                    id="contact-name"
                    name="name"
                    label="Your Name"
                    placeholder="Jane Smith"
                    required
                    fullWidth
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <span style={{ marginRight: '8px', color: 'var(--text-muted)', display: 'flex' }}>
                            <FiUser size={14} />
                          </span>
                        ),
                      },
                    }}
                    sx={inputSx}
                  />

                  <TextField
                    id="contact-email"
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    fullWidth
                    size="small"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <span style={{ marginRight: '8px', color: 'var(--text-muted)', display: 'flex' }}>
                            <FiMail size={14} />
                          </span>
                        ),
                      },
                    }}
                    sx={inputSx}
                  />

                  <TextField
                    id="contact-message"
                    name="message"
                    label="Message"
                    placeholder="Tell me about your project..."
                    required
                    fullWidth
                    multiline
                    rows={4}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <span style={{ marginRight: '8px', marginTop: '2px', color: 'var(--text-muted)', display: 'flex', alignSelf: 'flex-start' }}>
                            <FiMessageSquare size={14} />
                          </span>
                        ),
                      },
                    }}
                    sx={inputSx}
                  />

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      id="contact-submit-btn"
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isPending}
                      startIcon={
                        isPending ? (
                          <CircularProgress size={16} sx={{ color: 'white' }} />
                        ) : (
                          <FiSend size={16} />
                        )
                      }
                      sx={{
                        background: 'var(--accent)',
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '15px',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                          background: 'var(--accent-hover)',
                          boxShadow: '0 0 20px var(--accent-glow)',
                        },
                        '&:disabled': {
                          background: 'var(--surface-2)',
                          color: 'var(--text-muted)',
                        },
                      }}
                    >
                      {isPending ? 'Sending…' : 'Send Message'}
                    </Button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
