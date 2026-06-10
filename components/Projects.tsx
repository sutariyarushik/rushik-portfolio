'use client';

import { motion } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import { projects } from '@/lib/data';
import { FiExternalLink } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: '100px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
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
            Projects
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
            Things I&apos;ve{' '}
            <span className="gradient-text">built</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              style={{ height: '100%' }}
            >
              <Card
                id={`project-card-${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                elevation={0}
                sx={{
                  height: '100%',
                  background: 'var(--card-bg) !important',
                  border: '1px solid var(--card-border) !important',
                  borderRadius: '20px !important',
                  backdropFilter: 'blur(12px)',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease !important',
                  cursor: 'default',
                  '&:hover': {
                    borderColor: `${project.accentColor} !important`,
                    boxShadow: `0 0 40px ${project.accentColor}30, 0 20px 60px rgba(0,0,0,0.15) !important`,
                  },
                }}
              >
                <CardContent sx={{ padding: '32px !important', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {/* Top: badge + icon */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '20px',
                    }}
                  >
                    {/* Accent icon */}
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `${project.accentColor}18`,
                        border: `1px solid ${project.accentColor}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: project.accentColor,
                      }}
                    >
                      <HiSparkles size={22} />
                    </div>

                    {/* Badge */}
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 600,
                        background: `${project.accentColor}18`,
                        color: project.accentColor,
                        border: `1px solid ${project.accentColor}30`,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '12px',
                      letterSpacing: '-0.3px',
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      marginBottom: '20px',
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          height: '26px',
                          borderRadius: '6px',
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
