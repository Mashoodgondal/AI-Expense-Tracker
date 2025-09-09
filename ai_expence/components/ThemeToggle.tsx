// // components/ThemeToggle.js
// import React from 'react';

// import { LuMoon } from "react-icons/lu";
// import { TbSun } from "react-icons/tb";
// import { useTheme } from './ThemeProvider';

// const ThemeToggle = ({ className = "" }) => {
//     const { theme, toggleTheme } = useTheme();

//     return (
//         <button
//             onClick={toggleTheme}
//             className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 ${className}`}
//             aria-label="Toggle theme"
//         >
//             {theme === 'light' ? (
//                 <LuMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
//             ) : (
//                 <TbSun className="w-5 h-5 text-yellow-500" />
//             )}
//         </button>
//     );
// };

// export default ThemeToggle;


// components/ThemeToggle.tsx
"use client";

import React from 'react';
import { LuMoon } from "react-icons/lu";
import { TbSun } from "react-icons/tb";
import { useTheme } from './ThemeProvider';

const ThemeToggle = ({ className = "" }) => {
    // Safely try to use theme context
    let theme: "light" | "dark" = "light";
    let toggleTheme: () => void = () => { };

    try {
        const themeContext = useTheme();
        theme = themeContext.theme;
        toggleTheme = themeContext.toggleTheme;
    } catch (error) {
        console.warn("ThemeToggle: useTheme hook failed, falling back to default behavior");
        // Fallback: just toggle between icons without actual theme change
        const [localTheme, setLocalTheme] = React.useState<"light" | "dark">("light");
        theme = localTheme;
        toggleTheme = () => setLocalTheme(prev => prev === "light" ? "dark" : "light");
    }

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