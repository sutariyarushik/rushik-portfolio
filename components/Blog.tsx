'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { blogPosts } from '@/lib/data';
import { FiArrowUpRight, FiClock, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const INITIAL_VISIBLE = 2;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ post, delay = 0 }: { post: (typeof blogPosts)[0]; delay?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -6 }}
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--card-border)',
        borderRadius: '20px',
        padding: '32px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = post.accentColor;
        el.style.boxShadow = `0 0 40px ${post.accentColor}28, 0 20px 60px rgba(0,0,0,0.12)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--card-border)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Accent top bar */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, ${post.accentColor}, ${post.accentColor}60)`,
          borderRadius: '20px 20px 0 0',
        }}
      />

      {/* Icon + category */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div
          style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: `${post.accentColor}18`, border: `1px solid ${post.accentColor}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: post.accentColor,
          }}
        >
          <HiSparkles size={20} />
        </div>
        <span
          style={{
            padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
            background: `${post.accentColor}18`, color: post.accentColor,
            border: `1px solid ${post.accentColor}30`,
            textTransform: 'uppercase', letterSpacing: '0.5px',
          }}
        >
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1.35, margin: 0 }}>
        {post.title}
      </h3>

      {/* Excerpt */}
      <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>
        {post.excerpt}
      </p>

      {/* Footer */}
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FiCalendar size={12} /> {post.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <FiClock size={12} /> {post.readTime}
          </span>
        </div>
        <motion.div
          whileHover={{ x: 2, y: -2 }}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: post.accentColor, cursor: 'pointer' }}
        >
          Read more <FiArrowUpRight size={15} />
        </motion.div>
      </div>
    </motion.article>
  );
}

// ─── Main Blog Section ────────────────────────────────────────────────────────
export default function Blog() {
  const [expanded, setExpanded] = useState(false);
  const hasMore = blogPosts.length > INITIAL_VISIBLE;
  const extraPosts = blogPosts.slice(INITIAL_VISIBLE);

  return (
    <section
      id="blog"
      style={{ padding: '100px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
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
          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
            Blog
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1px', lineHeight: 1.2, margin: '0 0 16px' }}>
            Thoughts &amp;{' '}
            <span className="gradient-text">insights</span>
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '560px', margin: 0 }}>
            Deep dives into architecture decisions, performance optimisations, and real-world patterns from production projects.
          </p>
        </motion.div>

        {/* Always-visible cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}
        >
          {blogPosts.slice(0, INITIAL_VISIBLE).map((post, i) => (
            <motion.article
              key={post.slug}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--card-border)',
                borderRadius: '20px',
                padding: '32px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = post.accentColor;
                el.style.boxShadow = `0 0 40px ${post.accentColor}28, 0 20px 60px rgba(0,0,0,0.12)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--card-border)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${post.accentColor}, ${post.accentColor}60)`, borderRadius: '20px 20px 0 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${post.accentColor}18`, border: `1px solid ${post.accentColor}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: post.accentColor }}>
                  <HiSparkles size={20} />
                </div>
                <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: `${post.accentColor}18`, color: post.accentColor, border: `1px solid ${post.accentColor}30`, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {post.category}
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1.35, margin: 0 }}>{post.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, flex: 1 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiCalendar size={12} /> {post.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><FiClock size={12} /> {post.readTime}</span>
                </div>
                <motion.div whileHover={{ x: 2, y: -2 }} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: post.accentColor, cursor: 'pointer' }}>
                  Read more <FiArrowUpRight size={15} />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Expandable extra cards — height animates 0 → auto */}
        <AnimatePresence initial={false}>
          {expanded && extraPosts.length > 0 && (
            <motion.div
              key="extra-posts"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '24px',
                  marginTop: '24px',
                }}
              >
                {extraPosts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} delay={i * 0.08} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show more / Collapse button */}
        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px' }}>
            <motion.button
              id="blog-toggle-btn"
              onClick={() => setExpanded((v) => !v)}
              whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(37,99,235,0.25)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '12px',
                border: '1px solid var(--border-strong)',
                background: 'var(--card-bg)', backdropFilter: 'blur(8px)',
                color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)'; }}
            >
              {expanded ? 'Show less' : `Show ${extraPosts.length} more`}
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <FiChevronDown size={16} />
              </motion.div>
            </motion.button>
          </div>
        )}


      </div>
    </section>
  );
}
