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
import { CiMenuFries } from "react-icons/ci"
import { IoClose } from "react-icons/io5"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 shadow-md bg-white dark:bg-gray-900 transition-colors">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo / Mobile Title */}
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    <span className="md:hidden">Expense Tracker</span>
                    <span className="hidden md:inline">AI Expense Tracker</span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        Home
                    </li>
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        About
                    </li>
                    <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                        Contact
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <IoClose /> : <CiMenuFries />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-col space-y-4 py-6 px-6 text-gray-700 dark:text-gray-200 font-medium">
                        <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                            Home
                        </li>
                        <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                            About
                        </li>
                        <li className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                            Contact
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
