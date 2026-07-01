import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navigation from "./components/Navbar";
import Services from "./pages/Services";
import WeddingDetails from "./pages/WeddingDetails";
import RequestQuote from "./pages/RequestQoute";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import ManageRequests from "./admin/ManageRequests";
import MyRequests from "./pages/MyRequests";
import ManageVenue from "./admin/ManageVenue";
import ManageDecoration from "./admin/ManageDecoration";
import ManageCatering from "./admin/ManageCatering";
import ManageMenu from "./admin/ManageMenu";
import AdminContact from "./admin/AdminContact";

// 🔐 helper (clean + reusable)
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("userInfo"));
  } catch (err) {
    return null;
  }
};

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <BrowserRouter>

      {user?.role !== "admin" && <Navigation />}

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route
          path="/"
          element={<Login onLogin={setUser} />}
        />
        <Route path="/register" element={<Register />} />

        {/* ================= PROTECTED USER ROUTES ================= */}
        <Route path="/home" element={<Home />} />

        <Route
          path="/about"
          element={user ? <About /> : <Navigate to="/" replace />}
        />

        <Route
          path="/gallery"
          element={user ? <Gallery /> : <Navigate to="/" replace />}
        />

        <Route
          path="/contact"
          element={user ? <Contact /> : <Navigate to="/" replace />}
        />

        <Route
          path="/services"
          element={user ? <Services /> : <Navigate to="/" replace />}
        />

        <Route
          path="/services/wedding"
          element={user ? <WeddingDetails /> : <Navigate to="/" replace />}
        />

        <Route
          path="/request-quote"
          element={user ? <RequestQuote /> : <Navigate to="/" replace />}
        />

        <Route
          path="/my-requests"
          element={user ? <MyRequests /> : <Navigate to="/" replace />}
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            user?.role === "admin"
              ? <AdminLayout />
              : <Navigate to="/home" replace />
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="requests" element={<ManageRequests />} />
          <Route path="venues" element={<ManageVenue />} />
          <Route path="decorations" element={<ManageDecoration />} />
          <Route path="catering" element={<ManageCatering />} />
          <Route path="/admin/catering/:id/menu" element={<ManageMenu />} />
          <Route path="/admin/contacts" element={<AdminContact />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;