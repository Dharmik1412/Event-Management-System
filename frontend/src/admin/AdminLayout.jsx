import React, { useState } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

const menuItems = [
  {
    path: "/admin",
    label: "Dashboard",
    icon: "📊",
  },
  {
    path: "/admin/requests",
    label: "Manage Requests",
    icon: "📋",
  },
  {
    path: "/admin/venues",
    label: "Manage Venues",
    icon: "🏛️",
  },
  {
    path: "/admin/decorations",
    label: "Manage Decorations",
    icon: "🎨",
  },
  {
    path: "/admin/catering",
    label: "Manage Catering",
    icon: "🍽️",
  },
    {
    path: "/admin/contacts",
    label: "Contact Messages",
    icon: "📩",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between bg-slate-900 border-b border-slate-800 px-5 py-4">

        <h1 className="text-xl font-bold text-purple-500">
          HARMONI Admin
        </h1>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl"
        >
          ☰
        </button>

      </header>

      {/* Sidebar */}
      <aside
        className={`bg-slate-900 border-r border-slate-800
        md:w-72 md:min-h-screen
        ${
          open
            ? "block"
            : "hidden"
        } md:block`}
      >

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-3xl font-bold text-purple-500">
            HARMONI
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Admin Panel
          </p>

        </div>

        <nav className="p-4 space-y-2">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  location.pathname === item.path
                    ? "bg-purple-600 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
            >
              <span className="text-xl">{item.icon}</span>

              {item.label}
            </Link>

          ))}

        </nav>

        <div className="p-4 border-t border-slate-800 mt-auto">

          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700"
          >
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;