"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";

interface AppBarProps {
  variant?: string;
}

export const Bar: React.FC<AppBarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const user = useAuthStore((state) => state.user);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDrawerToggle = (): void => {
    setMobileOpen((prevState) => !prevState);
  };

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Hubs", href: "/hubs" },
    { name: "Map", href: "/map" },
    { name: "My donations", href: "/donations" },
    { name: "UGs Marketplace", href: "/marketplace" },
  ];

  // To avoid hydration mismatch
  if (!isMounted) {
    return <div className="w-full flex justify-center my-6 h-16" />;
  }

  return (
    <>
      {/* Main Navigation Bar */}
      <div className="w-full flex justify-center mt-6 mb-6 px-4">
        <nav className="w-full max-w-7xl bg-[#140230] border border-[#a973d5] rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NextLink href="/" className="flex items-center">
              <Image src="/img/logo.png" alt="Logo" width={100} height={100} />
            </NextLink>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NextLink
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href ? "text-[#A56FFF]" : "text-white"
                  }`}
                >
                  {item.name}
                </NextLink>
              ))}
            </div>

            {/* Right Side - Explore Map Button & User */}
            <div className="flex items-center space-x-4">
              {/* Explore Map Button */}
              <NextLink
                href="/explore-map"
                className="hidden md:inline-flex items-center px-6 py-2 bg-[#802BF0] text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
              >
                Explore Map
              </NextLink>

              {/* User Account / Login */}
              {user ? (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              ) : (
                <NextLink
                  href="/login"
                  className="flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-full hover:bg-purple-700 transition-colors duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </NextLink>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={handleDrawerToggle}
                className="lg:hidden p-2 text-white hover:text-yellow-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleDrawerToggle}
          />

          {/* Mobile Menu */}
          <div className="absolute top-0 right-0 w-72 h-full bg-gradient-to-b from-indigo-900 to-purple-900 shadow-xl">
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-yellow-400 font-semibold text-lg">
                  Menu
                </span>
                <button
                  onClick={handleDrawerToggle}
                  className="p-2 text-white hover:text-yellow-300"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-4">
                {navItems.map((item) => (
                  <NextLink
                    key={item.name}
                    href={item.href}
                    onClick={handleDrawerToggle}
                    className={`block py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-purple-700 text-yellow-400"
                        : "text-white hover:bg-purple-800"
                    }`}
                  >
                    {item.name}
                  </NextLink>
                ))}

                {/* Mobile Explore Map Button */}
                <NextLink
                  href="/explore-map"
                  onClick={handleDrawerToggle}
                  className="block py-3 px-4 mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg text-center"
                >
                  Explore Map
                </NextLink>

                {/* Mobile Auth Section */}
                {!user && (
                  <div className="pt-6 border-t border-purple-700">
                    <NextLink
                      href="/login"
                      onClick={handleDrawerToggle}
                      className="block py-3 px-4 bg-purple-600 text-white text-sm font-medium rounded-lg text-center"
                    >
                      Login
                    </NextLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bar;
