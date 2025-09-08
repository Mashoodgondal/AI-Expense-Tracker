// components/ThemeToggle.js
import React from 'react';

import { LuMoon } from "react-icons/lu";
import { TbSun } from "react-icons/tb";
import { useTheme } from './ThemeProvider';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 ${className}`}
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <LuMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
                <TbSun className="w-5 h-5 text-yellow-500" />
            )}
        </button>
    );
};

export default ThemeToggle;