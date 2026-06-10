'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-lg"
        style={{ background: 'var(--surface)' }}
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        id="theme-toggle-btn"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle colour theme"
        size="small"
        sx={{
          color: 'var(--text-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '6px',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: 'var(--accent)',
            borderColor: 'var(--accent)',
            background: 'rgba(37,99,235,0.08)',
            transform: 'rotate(15deg)',
          },
        }}
      >
        {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
      </IconButton>
    </Tooltip>
  );
}
