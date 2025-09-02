// import React from 'react'
// import { UserButton } from '@clerk/nextjs'
// const Navebar = () => {
//     return (
//         <div><UserButton></UserButton></div>
//     )
// }

// export default Navebar

"use client";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo / Mobile Title */}
                <h1 className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                        AI
                    </span>{" "}
                    <span className="text-gray-800 dark:text-gray-200">Expense Tracker</span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-10 text-gray-700 dark:text-gray-200 font-medium">
                    {["Home", "About", "Contact"].map((item, index) => (
                        <li
                            key={index}
                            className="relative cursor-pointer group"
                        >
                            <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {item}
                            </span>
                            {/* Underline effect */}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.7)]"></span>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-3xl text-gray-700 dark:text-gray-200 transition-transform"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <IoClose className="animate-spin" /> : <CiMenuFries />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-all duration-500 overflow-hidden ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="flex flex-col space-y-6 py-6 px-6 text-gray-700 dark:text-gray-200 font-medium">
                    {["Home", "About", "Contact"].map((item, index) => (
                        <li
                            key={index}
                            className="relative cursor-pointer group"
                        >
                            <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {item}
                            </span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_2px_rgba(59,130,246,0.7)]"></span>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}


