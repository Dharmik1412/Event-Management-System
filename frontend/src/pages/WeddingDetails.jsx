import React from "react";
import { Link } from "react-router-dom";

const ServiceDetails = () => {
  const services = [
    {
      title: "Venue Assistance",
      desc: "Guidance in selecting suitable venues according to your guest count, budget and location.",
    },
    {
      title: "Decoration",
      desc: "Elegant themes, floral arrangements and customized stage setups.",
    },
    {
      title: "Catering",
      desc: "Multi-cuisine catering options tailored to your event size and preferences.",
    },
  ];

  const steps = [
    "Submit Request",
    "Receive Estimate",
    "Get Final Quote",
    "Celebrate Event",
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">

      {/* HERO */}
      <section className="relative h-105 md:h-130">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1400"
          alt="Wedding"
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Wedding Planning
          </h1>

          <p className="text-gray-300 max-w-2xl text-sm md:text-base">
            We create unforgettable wedding experiences with personalized planning,
            elegant decoration, premium catering, and complete event coordination.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-10">
          What We Offer
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-purple-500 transition"
            >
              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-950 border border-gray-800 rounded-xl p-6 text-center hover:border-purple-500 transition"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>

                <h3 className="font-semibold text-sm md:text-base">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Plan Your Wedding?
        </h2>

        <p className="text-gray-400 mb-8">
          Get a personalized quotation based on your requirements in minutes.
        </p>

        <Link
          to="/request-quote"
          className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold transition"
        >
          Request Quote
        </Link>
      </section>
    </div>
  );
};

export default ServiceDetails;