import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock: replace with real auth state later
  const isAuthenticated = false;
  const user = null;

  return (
    <header className="sticky top-0 z-50 w-full bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg shadow-black/30 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight group-hover:text-orange-400 transition-colors duration-200">
              Shop<span className="text-orange-400">IT</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <Search />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">

            {/* Cart */}
            <Link
              to="/cart"
              id="cart"
              className="relative text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span
                id="cart_count"
                className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
              >
                0
              </span>
            </Link>

            {/* User Dropdown or Login Button */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  id="dropDownMenuButton"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 transition-all duration-200 cursor-pointer"
                >
                  <img
                    src={user?.avatar?.url || "/images/default_avatar.jpg"}
                    alt="User Avatar"
                    className="w-7 h-7 rounded-full object-cover border border-white/30"
                  />
                  <span className="text-sm font-medium hidden md:block">
                    {user?.name || "User"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-gray-800 border border-white/10 shadow-xl shadow-black/40 overflow-hidden z-50">
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-orange-500/20 transition-colors duration-150"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                        </svg>
                        Dashboard
                      </Link>
                    )}
                    <Link
                      to="/me/orders"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-orange-500/20 transition-colors duration-150"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </Link>
                    <Link
                      to="/me/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-orange-500/20 transition-colors duration-150"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <div className="border-t border-white/10 my-1"></div>
                    <Link
                      to="/logout"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-150"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                id="login_btn"
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-orange-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <Search />
        </div>
      </nav>
    </header>
  );
};

export default Header;
