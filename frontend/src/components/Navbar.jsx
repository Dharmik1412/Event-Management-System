import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Always read latest user from localStorage
  const user = JSON.parse(localStorage.getItem("userInfo") || "null");

  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");

  if (hideNavbar) return null;

  const closeAllMenus = () => {
    setShowMobileMenu(false);
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    closeAllMenus();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">

      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/home"
          onClick={closeAllMenus}
          className="text-2xl font-bold text-purple-600"
        >
          HARMONI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/home" className="hover:text-purple-400 transition">
            Home
          </Link>

          <Link to="/about" className="hover:text-purple-400 transition">
            About
          </Link>

          <Link to="/services" className="hover:text-purple-400 transition">
            Services
          </Link>

          <Link to="/gallery" className="hover:text-purple-400 transition">
            Gallery
          </Link>

          <Link to="/contact" className="hover:text-purple-400 transition">
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {user ? (
            <div className="relative hidden md:block">

              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 rounded-xl px-3 py-2 transition"
              >
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-lg">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold">
                    {user?.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    Customer
                  </p>
                </div>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">

                  <Link
                    to="/my-requests"
                    onClick={closeAllMenus}
                    className="block px-5 py-3 hover:bg-slate-800 transition"
                  >
                    📋 My Requests
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-red-600 transition"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <Link
              to="/"
              className="hidden md:block bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">

          <nav className="flex flex-col">

            <Link
              to="/home"
              onClick={closeAllMenus}
              className="px-6 py-4 hover:bg-slate-800"
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={closeAllMenus}
              className="px-6 py-4 hover:bg-slate-800"
            >
              About
            </Link>

            <Link
              to="/services"
              onClick={closeAllMenus}
              className="px-6 py-4 hover:bg-slate-800"
            >
              Services
            </Link>

            <Link
              to="/gallery"
              onClick={closeAllMenus}
              className="px-6 py-4 hover:bg-slate-800"
            >
              Gallery
            </Link>

            <Link
              to="/contact"
              onClick={closeAllMenus}
              className="px-6 py-4 hover:bg-slate-800"
            >
              Contact
            </Link>

            {user && (
              <>
                <div className="border-t border-slate-800 my-2"></div>

                <div className="px-6 py-3 font-semibold">
                  👤 {user.name}
                </div>

                <Link
                  to="/my-requests"
                  onClick={closeAllMenus}
                  className="px-6 py-4 hover:bg-slate-800"
                >
                  📋 My Requests
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-left px-6 py-4 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  🚪 Logout
                </button>
              </>
            )}

          </nav>

        </div>
      )}

    </header>
  );
}

export default Navigation;