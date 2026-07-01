import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      title: "Wedding Planning",
      description:
        "Luxury venues, premium decorations, catering and complete wedding management.",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200",
    },
    {
      title: "Birthday Celebration",
      description:
        "Creative birthday parties with customized themes and entertainment.",
      image:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200",
    },
    {
      title: "Corporate Events",
      description:
        "Professional seminars, conferences and corporate gatherings.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200",
    },
    {
      title: "Engagement Ceremony",
      description:
        "Elegant engagement celebrations designed exactly how you imagine.",
      image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200",
    },
  ];

  const stats = [
    {
      number: "4",
      title: "Planning Steps",
    },
    {
      number: "3",
      title: "Venue Options",
    },
    {
      number: "3",
      title: "Decoration Themes",
    },
    {
      number: "3",
      title: "Catering Packages",
    },
  ];

  return (
    <div className="bg-gray-950 text-white overflow-hidden">

      {/* ================= HERO ================= */}

      <section className="relative">

        <div className="absolute inset-0 bg-linear-to-r from-purple-900/30 via-transparent to-purple-800/20"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32 relative">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-300 border border-purple-700 text-sm mb-6">
                Professional Event Management Platform
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">

                Plan Your

                <span className="block text-purple-500">
                  Dream Event
                </span>

                With One Smart Platform

              </h1>

              <p className="mt-8 text-lg text-gray-400 leading-8">

                Book venues, choose decorations, customize catering,
                receive automated quotations and manage your complete
                event from one modern platform.

              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  to="/request-quote"
                  className="px-8 py-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition font-semibold shadow-lg shadow-purple-900/40"
                >
                  Book Your Event
                </Link>

                <Link
                  to="/services"
                  className="px-8 py-4 rounded-xl border border-purple-500 hover:bg-purple-600 transition"
                >
                  Explore Services
                </Link>

              </div>

            </div>

            {/* RIGHT */}

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400"
                className="rounded-2xl lg:rounded-3xl shadow-2xl"
                aalt="Event management banner"
              />

              <div className="absolute -left-6 top-8 bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-xl">

                <h3 className="text-3xl font-bold text-purple-500">
                  500+
                </h3>

                <p className="text-gray-400 text-sm">
                  Successful Events
                </p>

              </div>

              <div className="absolute -right-5 bottom-10 bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-xl">

                <h3 className="text-3xl font-bold text-purple-500">
                  ₹ Instant
                </h3>

                <p className="text-gray-400 text-sm">
                  Auto Quotation
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= STATS ================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-500 transition"
            >
              <h2 className="text-4xl font-black text-purple-500">
                {item.number}
              </h2>
              <p className="mt-3 text-gray-400">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="py-16 md:py-15 lg:py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold">
              Our Premium Services
            </h2>

            <p className="text-gray-400 mt-5 max-w-3xl mx-auto">

              We provide complete event planning solutions,
              from selecting venues to catering and final event execution.

            </p>

          </div>

          <div className="grid md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-8">

            {services.map((service) => (

              <div
                key={service.title}
                className="group rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 hover:-translate-y-2 transition-all duration-300"
              >

                <div className="overflow-hidden">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-64 w-full object-cover group-hover:scale-110 transition duration-500"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-7 mb-6">
                    {service.description}
                  </p>

                  <button className="text-purple-400 font-semibold hover:text-purple-300">
                    {service.title === "Wedding Planning" ? (
                      <Link
                        to="/services/wedding"
                        className="text-purple-400 font-semibold hover:text-purple-300"
                      >
                        Learn More →
                      </Link>
                    ) : (
                      <span className="text-gray-500 font-medium">
                        Coming Soon
                      </span>
                    )}
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-16 md:py-20 lg:py-24 bg-gray-900">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-5xl font-bold">
              Why Choose HARMONI??
            </h2>

            <p className="mt-5 text-gray-400 max-w-3xl mx-auto">

              We simplify event planning by combining venues,
              decorations, catering, quotation management and
              customer approvals into one platform.

            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                icon: "🏛️",
                title: "Premium Venues",
                desc: "Choose from Basic, Premium and Luxury venues available across Gujarat."
              },
              {
                icon: "🎨",
                title: "Beautiful Decorations",
                desc: "Select decoration themes that match your selected venue category."
              },
              {
                icon: "🍽️",
                title: "Custom Catering",
                desc: "Pick menu items while respecting package limits automatically."
              },
              {
                icon: "💰",
                title: "Best Quotation",
                desc: "Quotation is calculated less then other event service providers."
              }
            ].map((item, index) => (

              <div
                key={item.title}
                className="bg-gray-950 rounded-2xl border border-gray-800 hover:border-purple-600 p-8 transition duration-300 hover:-translate-y-2"
              >

                <div className="text-5xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 px-6">

        {/* Background Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-purple-900/40 via-gray-950 to-purple-900/40"></div>

        <div className="relative max-w-6xl mx-auto">

          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10 md:p-16 text-center">

            <span className="inline-block px-4 py-2 rounded-full bg-purple-600/20 text-purple-400 text-sm font-semibold mb-6">
              Start Planning Today
            </span>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Ready to Create Your
              <span className="text-purple-500"> Dream Event?</span>
            </h2>

            <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
              Tell us your requirements, choose your venue, decoration and
              catering package, and receive a professionally prepared quotation
              from our event management team.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                to="/request-quote"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-semibold transition duration-300 shadow-lg shadow-purple-600/20"
              >
                Request a Quotation
              </Link>

              <Link
                to="/services"
                className="border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition duration-300"
              >
                Explore Services
              </Link>

            </div>

          </div>

        </div>

      </section>
    </div>
  );
};

export default Home;