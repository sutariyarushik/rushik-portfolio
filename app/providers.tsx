'use client';

import { ThemeProvider } from 'next-themes';
import MuiRegistry from './mui-registry';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <MuiRegistry>{children}</MuiRegistry>
    </ThemeProvider>
  );
}
