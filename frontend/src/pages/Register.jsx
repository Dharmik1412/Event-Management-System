import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(data?.message || "Registration failed");
        return;
      }

      alert(data?.message || "Registration Successful");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-10">

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Join{" "}
            <span className="text-purple-400 font-semibold">
              HARMONI
            </span>{" "}
            Event Management
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500"
            required
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-purple-500"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 py-3 rounded-lg font-semibold text-white"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;