"use client";

import React, { createContext, useContext } from "react";

export interface ThemeContextType {
    isDark: boolean;
    toggleTheme: () => void;
    lenisRef: React.RefObject<any>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
