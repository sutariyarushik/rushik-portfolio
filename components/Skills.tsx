'use client';

import { motion, type Variants } from 'framer-motion';
import Chip from '@mui/material/Chip';
import { skillGroups } from '@/lib/data';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiAxios,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiSocketdotio,
  SiChartdotjs,
} from 'react-icons/si';
import { TbBrandFramerMotion } from 'react-icons/tb';
import { MdApi } from 'react-icons/md';
import { FiCpu, FiZap, FiCode, FiBarChart2, FiFileText } from 'react-icons/fi';

// Map skill names to react-icons
const iconMap: Record<string, React.ReactNode> = {
  'React.js': <SiReact size={14} />,
  'Next.js': <SiNextdotjs size={14} />,
  'TypeScript': <SiTypescript size={14} />,
  'JavaScript': <SiJavascript size={14} />,
  'Tailwind CSS': <SiTailwindcss size={14} />,
  'Framer Motion': <TbBrandFramerMotion size={14} />,
  'HTML5': <SiHtml5 size={14} />,
  'CSS3': <SiCss size={14} />,
  'Git': <SiGit size={14} />,
  'GitHub': <SiGithub size={14} />,
  'Figma': <SiFigma size={14} />,
  'Vercel': <SiVercel size={14} />,
  'Axios': <SiAxios size={14} />,
  'REST APIs': <MdApi size={14} />,
  'Node.js': <SiNodedotjs size={14} />,
  'Socket.io': <SiSocketdotio size={14} />,
  'Chart.js': <SiChartdotjs size={14} />,
  'Recharts': <FiBarChart2 size={14} />,
  'PDF Generation': <FiFileText size={14} />,
  'TanStack Query': <FiZap size={14} />,
  'GitHub Copilot': <FiCpu size={14} />,
  'Cursor AI': <FiCpu size={14} />,
  'Claude AI': <FiZap size={14} />,
};

const categoryColors: Record<string, string> = {
  Core: '#2563EB',
  Frontend: '#7C3AED',
  'Backend & Services': '#059669',
  'Data & Visualisation': '#D97706',
  Performance: '#0891B2',
  Tools: '#DC2626',
  'AI Tools': '#6D28D9',
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: 'var(--section-padding)', background: 'var(--bg)' }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 'var(--section-header-margin)' }}
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
            Skills
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
            Technologies I{' '}
            <span className="gradient-text">work with</span>
          </h2>
        </motion.div>

        {/* Skill groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {skillGroups.map((group, groupIdx) => {
            const accentColor = categoryColors[group.category] ?? 'var(--accent)';
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIdx * 0.05 }}
              >
                {/* Category label */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: accentColor,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                    }}
                  >
                    {group.category}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '1px',
                      background: 'var(--border)',
                    }}
                  />
                </div>

                {/* Chips */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
                >
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={chipVariants}
                      className="skill-chip"
                    >
                      <Chip
                        id={`skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        icon={
                          iconMap[skill] ? (
                            <span
                              style={{
                                color: accentColor,
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              {iconMap[skill]}
                            </span>
                          ) : undefined
                        }
                        label={skill}
                        variant="outlined"
                        sx={{
                          borderColor: 'var(--border-strong)',
                          color: 'var(--text-primary)',
                          background: 'var(--card-bg)',
                          backdropFilter: 'blur(8px)',
                          fontWeight: 500,
                          fontSize: '13px',
                          height: '36px',
                          borderRadius: '8px',
                          cursor: 'default',
                          transition: 'all 0.2s ease !important',
                          '& .MuiChip-icon': {
                            color: accentColor,
                            marginLeft: '8px',
                          },
                          '&:hover': {
                            borderColor: accentColor,
                            background: `${accentColor}14`,
                            color: accentColor,
                          },
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
