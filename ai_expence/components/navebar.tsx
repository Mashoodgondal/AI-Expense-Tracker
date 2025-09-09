"use client"
import React, { useState } from 'react';
import { TbMenuDeep } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { UserButton, useUser } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Contacts', href: '/contacts' },
  { name: 'About', href: '/about' }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSignUp = () => {

    window.location.href = "/sign-up";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <span className="hidden sm:inline">AI Expense Tracker</span>
              <span className="sm:hidden">Expense Tracker</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {!isLoaded ? null : isSignedIn ? (
              <UserButton />
            ) : (
              <button
                onClick={handleSignUp}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isMobileMenuOpen ? <IoClose className="h-6 w-6" /> : <TbMenuDeep className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {/* Mobile User Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            {!isLoaded ? null : isSignedIn ? (
              <div className="flex items-center px-3 py-2">
                <UserButton />
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{user.firstName}</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleSignUp();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
