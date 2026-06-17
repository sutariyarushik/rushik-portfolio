'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chip from '@mui/material/Chip';
import { projects } from '@/lib/data';
import { HiSparkles, HiCheckCircle } from 'react-icons/hi2';
import { FiChevronDown } from 'react-icons/fi';

// ─── Individual Project Card ──────────────────────────────────────────────────
function ProjectCard({
  project,
  featured = false,
  delay = 0,
}: {
  project: (typeof projects)[0];
  featured?: boolean;
  delay?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -4 }}
      style={{
        background: 'var(--card-bg)',
        backdropFilter: 'blur(14px)',
        border: '1px solid var(--card-border)',
        borderRadius: '20px',
        padding: featured ? '32px 32px 32px 36px' : '26px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = project.accentColor;
        el.style.boxShadow = `0 0 48px ${project.accentColor}26, 0 20px 56px rgba(0,0,0,0.1)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--card-border)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Accent stripe — left for featured, top for normal */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          ...(featured
            ? { bottom: 0, width: '4px', height: undefined, right: undefined }
            : { right: 0, height: '3px', width: undefined, bottom: undefined }),
          background: `linear-gradient(${featured ? '180deg' : '90deg'}, ${project.accentColor}, ${project.accentColor}55)`,
          borderRadius: featured ? '20px 0 0 20px' : '20px 20px 0 0',
        }}
      />

      {/* Badge row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 11px',
            borderRadius: '7px',
            fontSize: '11px',
            fontWeight: 700,
            background: `${project.accentColor}18`,
            color: project.accentColor,
            border: `1px solid ${project.accentColor}35`,
            textTransform: 'uppercase',
            letterSpacing: '0.7px',
          }}
        >
          <HiSparkles size={10} />
          {project.badge}
        </span>

        {featured && (
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              background: 'var(--surface)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            ★ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: featured ? '1.3rem' : '1.05rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '10px',
          letterSpacing: '-0.4px',
          lineHeight: 1.3,
        }}
      >
        {project.title}
      </h3>

      {/* Description — truncated for non-featured when collapsed */}
      <p
        style={{
          fontSize: '13.5px',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
          marginBottom: '14px',
        }}
      >
        {featured || expanded
          ? project.description
          : `${project.description.slice(0, 105).trim()}…`}
      </p>

      {/* Highlights — always visible on featured; animated for others */}
      {featured ? (
        project.highlights?.length > 0 && (
          <ul
            style={{
              margin: '0 0 18px',
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {project.highlights.map((h) => (
              <li
                key={h}
                style={{
                  display: 'flex',
                  gap: '9px',
                  alignItems: 'flex-start',
                  fontSize: '12.5px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                }}
              >
                <HiCheckCircle
                  size={14}
                  color={project.accentColor}
                  style={{ marginTop: '2px', flexShrink: 0 }}
                />
                {h}
              </li>
            ))}
          </ul>
        )
      ) : (
        <AnimatePresence initial={false}>
          {expanded && project.highlights?.length > 0 && (
            <motion.div
              key="highlights"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ul
                style={{
                  margin: '0 0 14px',
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    style={{
                      display: 'flex',
                      gap: '9px',
                      alignItems: 'flex-start',
                      fontSize: '12.5px',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <HiCheckCircle
                      size={14}
                      color={project.accentColor}
                      style={{ marginTop: '2px', flexShrink: 0 }}
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: featured ? '0' : '14px',
        }}
      >
        {project.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              fontSize: '11px',
              fontWeight: 500,
              height: '24px',
              borderRadius: '5px',
              background: 'var(--surface)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border)',
              '&:hover': {
                background: `${project.accentColor}14`,
                color: project.accentColor,
              },
            }}
          />
        ))}
      </div>

      {/* Expand toggle — non-featured cards only, always at bottom of natural flow */}
      {!featured && (
        <motion.button
          onClick={() => setExpanded((v) => !v)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            width: '100%',
            padding: '9px 16px',
            borderRadius: '10px',
            border: `1px solid ${project.accentColor}40`,
            background: `${project.accentColor}08`,
            color: project.accentColor,
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${project.accentColor}18`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${project.accentColor}08`;
          }}
        >
          {expanded ? 'Show less' : 'View details'}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.28 }}
            style={{ display: 'flex' }}
          >
            <FiChevronDown size={13} />
          </motion.span>
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      style={{
        padding: 'var(--section-padding)',
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
          style={{ marginBottom: 'var(--section-header-margin)', textAlign: 'center' }}
        >
          <p
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '10px',
            }}
          >
            Portfolio
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-1px',
              lineHeight: 1.2,
              margin: '0 0 14px',
            }}
          >
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            A selection of real-world projects shipped for international
            clients — from enterprise platforms to SaaS products.
          </p>
        </motion.div>

        {/* Featured card — full width */}
        <div style={{ marginBottom: '22px' }}>
          <ProjectCard project={featured} featured delay={0} />
        </div>

        {/* Rest — responsive grid, cards size to their own content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            alignItems: 'start',   /* ← key: no forced equal height */
          }}
        >
          {rest.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={i * 0.08}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
