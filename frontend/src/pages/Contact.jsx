import React, { useState } from "react";
import axios from "axios"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "Wedding",
    queryType: "Pricing Doubt",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        form
      );

      alert("Your message has been sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: "Wedding",
        queryType: "Pricing Doubt",
        message: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <div className="text-center py-14 border-b border-slate-800">
        <h1 className="text-4xl font-bold mb-3">
          Contact Support
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Have questions about your event? Ask us anything — we’ll help you plan better.
        </p>
      </div>

      {/* FORM */}
      <div className="max-w-3xl mx-auto px-6 py-12">

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 space-y-5"
        >

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 outline-none focus:border-purple-500"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 outline-none focus:border-purple-500"
            required
          />

          {/* PHONE */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 outline-none focus:border-purple-500"
          />

          {/* EVENT TYPE */}
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 outline-none focus:border-purple-500"
          >
            <option value="Wedding">Wedding</option>
            <option value="Corporate">Corporate</option>
            <option value="Birthday">Birthday</option>
            <option value="Engagement">Engagement</option>
          </select>

          {/* QUERY TYPE */}
          <select
            name="queryType"
            value={form.queryType}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 outline-none focus:border-purple-500"
          >
            <option value="Pricing Doubt">Pricing Doubt</option>
            <option value="Venue Suggestion">Venue Suggestion</option>
            <option value="Date Availability">Date Availability</option>
            <option value="Custom Requirement">Custom Requirement</option>
          </select>

          {/* MESSAGE */}
          <textarea
            name="message"
            placeholder="Describe your query..."
            value={form.message}
            onChange={handleChange}
            rows="5"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 outline-none focus:border-purple-500"
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold transition"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>
  );
};

export default Contact;