"use client";
import { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full fixed top-0 left-0 z-50 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-all duration-300 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo / Brand */}
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">E</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ExpenseFlow
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 text-sm font-normal ml-2">Pro</span>
                    </h1>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8 text-gray-700 dark:text-gray-200 font-medium">
                        {["Dashboard", "Analytics", "Reports", "Settings"].map((item, index) => (
                            <li
                                key={index}
                                className="relative cursor-pointer group"
                            >
                                <span className="transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 py-2">
                                    {item}
                                </span>
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                            </li>
                        ))}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-3 ml-6">
                        <button className="px-6 py-2.5 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:shadow-md">
                            Sign In
                        </button>
                        <button className="relative px-6 py-2.5 font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25">
                            <span className="relative z-10">Sign Up</span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-3xl text-gray-700 dark:text-gray-200 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <IoClose className="transform rotate-0 transition-transform duration-300 hover:rotate-90" />
                    ) : (
                        <CiMenuFries className="transition-transform duration-300 hover:rotate-12" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-6 py-6 space-y-6">
                    {/* Mobile Menu Items */}
                    <ul className="space-y-4">
                        {["Dashboard", "Analytics", "Reports", "Settings"].map((item, index) => (
                            <li
                                key={index}
                                className="relative cursor-pointer group"
                            >
                                <span className="block py-2 text-gray-700 dark:text-gray-200 font-medium transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-2">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Auth Buttons */}
                    <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button className="w-full px-6 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                            Sign In
                        </button>
                        <button className="relative w-full px-6 py-3 font-medium text-white rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25">
                            <span className="relative z-10">Sign Up</span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 hover:opacity-100 blur-sm transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

