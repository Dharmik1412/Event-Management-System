import React from "react";
import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      title: "Easy Event Planning",
      description: "Plan and organize events efficiently with a simple workflow.",
    },
    {
      title: "Online Registration",
      description: "Allow participants to register and manage their bookings online.",
    },
    {
      title: "Venue Management",
      description: "Manage venues and event locations with ease.",
    },
    {
      title: "Real-Time Updates",
      description: "Keep attendees informed with the latest event information.",
    },
  ];

  const stats = [
    { number: "4", title: "Planning Steps" },
    { number: "3", title: "Venue Options" },
    { number: "3", title: "Decoration Themes" },
    { number: "3", title: "Catering Packages" },
  ];

  return (
    <div className="bg-slate-900 text-white">

      {/* HERO SECTION */}
      <section className="relative h-105 md:h-125">

        <img
          src="https://images.unsplash.com/photo-1575406965388-5350dc952c3c?q=80&w=1177&auto=format&fit=crop"
          alt="Harmoni event management team celebration"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center">

          <h3 className="text-purple-400 font-medium tracking-wider">
            ALL YOU NEED TO KNOW
          </h3>

          <h1 className="text-5xl font-bold mt-3">
            ABOUT <span className="text-purple-500">HARMONI</span>
          </h1>

          <div className="flex gap-3 mt-5 text-slate-300">

            <Link to="/home" className="hover:text-purple-400">
              Home
            </Link>

            <span>/</span>

            <span className="text-purple-400">About</span>

          </div>

        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div>
            <p className="text-purple-400 font-medium mb-3">
              Who We Are
            </p>

            <h2 className="text-4xl font-bold mb-6">
              Creating Memorable Events With Simplicity
            </h2>
          </div>

          <div>
            <p className="text-slate-400 leading-8">
              HARMONI is an event management platform designed to simplify
              planning, organizing and managing events. Whether it is a wedding,
              corporate conference, concert or private celebration, our goal is
              to help users create successful and memorable experiences.
            </p>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-800 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">
              Our Mission
            </h3>
            <p className="text-slate-400">
              To simplify event planning through technology and provide seamless experiences.
            </p>
          </div>

          <div className="bg-slate-800 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">
              Our Vision
            </h3>
            <p className="text-slate-400">
              To become a trusted global platform for event management.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold">Why Choose Us</h2>

          <p className="text-slate-400 mt-3">
            Everything you need to manage events successfully.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-slate-800 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* ACHIEVEMENTS */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-slate-800 p-6 rounded-xl text-center"
            >
              <h3 className="text-3xl font-bold text-purple-500">
                {item.number}
              </h3>
              <p className="text-slate-400 mt-2">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-purple-600 rounded-2xl p-10 text-center">

          <h2 className="text-3xl font-bold">
            Ready To Plan Your Next Event?
          </h2>

          <p className="mt-3">
            Join HARMONI and turn your ideas into unforgettable experiences.
          </p>

          <Link
            to="/register"
            className="inline-block mt-6 bg-white text-purple-700 px-6 py-3 rounded-lg font-medium"
          >
            Get Started
          </Link>

        </div>

      </section>

    </div>
  );
}

export default About;