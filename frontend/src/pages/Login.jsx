import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!email || !password) {
      return "Please fill all fields";
    }

    if (!email.includes("@")) {
      return "Enter a valid email";
    }

    if (password.length < 4) {
      return "Password too short";
    }

    return null;
  };

  const handleLogin = async () => {
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      if (!data?.token || !data?.user) {
        setError("Invalid server response");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      if (onLogin) onLogin(data.user);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-purple-950 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-2xl grid md:grid-cols-2">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-purple-700 to-purple-900 p-10">
          <h1 className="text-5xl font-extrabold text-white">
            HARMONI
          </h1>

          <p className="mt-4 text-purple-100">
            Smart Event Management System
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-6 sm:p-8 lg:p-10">

          <h2 className="text-2xl font-bold text-white">
            Sign In
          </h2>

          <p className="text-slate-400 mt-2 mb-6">
            Access your account
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 p-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* REGISTER */}
          <div className="mt-6 text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-400"
            >
              Create Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;