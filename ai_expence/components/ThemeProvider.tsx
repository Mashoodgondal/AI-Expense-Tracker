// // components/ThemeProvider.tsx
// "use client";

// import React, { useState, createContext, useContext, ReactNode } from "react";

// type ThemeContextType = {
//     theme: "light" | "dark";
//     toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// interface ThemeProviderProps {
//     children: ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//     const [theme, setTheme] = useState<"light" | "dark">("light");

//     const toggleTheme = () => {
//         setTheme((prev) => (prev === "light" ? "dark" : "light"));
//         // localStorage.setItem("theme", theme === "light" ? "dark" : "light");
//     };

//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             <div className={theme === "dark" ? "dark" : ""}>
//                 <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
//                     {children}
//                 </div>
//             </div>
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("useTheme must be used within a ThemeProvider");
//     }
//     return context;
// };

// components/ThemeProvider.tsx
"use client";

import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";

type ThemeContextType = {
    theme: "light" | "dark";
    toggleTheme: () => void;
    isLoaded: boolean; // To prevent hydration mismatch
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize theme from localStorage on mount
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
            if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
                setTheme(savedTheme);
            } else {
                // Check system preference
                const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                setTheme(systemTheme);
                localStorage.setItem("theme", systemTheme);
            }
        } catch (error) {
            console.warn("Could not access localStorage:", error);
            // Fallback to system preference
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            setTheme(systemTheme);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "light" ? "dark" : "light";
            try {
                localStorage.setItem("theme", newTheme);
            } catch (error) {
                console.warn("Could not save theme to localStorage:", error);
            }
            return newTheme;
        });
    };

    // Prevent hydration mismatch by not rendering until loaded
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-white text-gray-900">
                {children}
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoaded }}>
            <div className={theme === "dark" ? "dark" : ""}>
                <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
                    {children}
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};