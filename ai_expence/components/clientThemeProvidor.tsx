// components/ClientThemeProvider.tsx
"use client";

import { ThemeProvider } from './ThemeProvider';
import { ReactNode } from 'react';

interface ClientThemeProviderProps {
    children: ReactNode;
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}