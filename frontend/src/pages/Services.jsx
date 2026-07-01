import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      id: "wedding",
      title: "Wedding Management",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
      description:
        "Complete wedding planning with venue selection, decoration, catering, automatic quotation generation, and customer approval workflow.",
      features: [
        "Venue Selection",
        "Decoration Planning",
        "Catering Packages",
        "Best Quotation",
        "Customer Approval System",
      ],
      available: true,
    },
    {
      title: "Birthday Celebration",
      image:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800",
      description:
        "Birthday event management module will be available in future updates.",
      available: false,
    },
    {
      title: "Corporate Events",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      description:
        "Professional corporate event management will be added in future versions.",
      available: false,
    },
    {
      title: "Engagement Ceremony",
      image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800",
      description:
        "Engagement planning module will be introduced in upcoming releases.",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* HERO */}
      <section className="py-20 text-center px-6">
        <h1 className="text-5xl font-bold">
          Event <span className="text-purple-500">Services</span>
        </h1>

        <p className="mt-5 text-gray-400 max-w-3xl mx-auto">
          Select the event you want to organize. Currently, Wedding Management
          is fully implemented with an end-to-end booking and quotation system.
        </p>
      </section>

      {/* SERVICES */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

          {services.map((service, index) => (
            <div
              key={service.id || index}
              className={`rounded-2xl overflow-hidden border transition duration-300 ${
                service.available
                  ? "border-purple-500 bg-gray-900"
                  : "border-gray-800 bg-gray-900 opacity-80"
              }`}
            >

              {/* IMAGE */}
              <img
                src={service.image || ""}
                alt={service.title || "service"}
                className="h-72 w-full object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/800x500?text=No+Image")
                }
              />

              <div className="p-6">

                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {service.title || "Untitled Service"}
                  </h2>

                  {service.available ? (
                    <span className="bg-green-600 text-sm px-3 py-1 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="bg-gray-700 text-sm px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>

                <p className="text-gray-400 mt-4">
                  {service.description || "No description available"}
                </p>

                {service.available && (
                  <>
                    <div className="mt-6">
                      <h3 className="text-purple-400 font-semibold mb-3">
                        Included Features
                      </h3>

                      <ul className="space-y-2">
                        {(service.features || []).map((feature, i) => (
                          <li key={i}>✓ {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 flex gap-4">

                      <Link
                        to="/services/wedding"
                        className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
                      >
                        View Details
                      </Link>

                      <Link
                        to="/request-quote"
                        className="border border-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg transition"
                      >
                        Request Quote
                      </Link>

                    </div>
                  </>
                )}

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-purple-900 to-purple-700 text-center px-6">

        <h2 className="text-4xl font-bold">
          Start Planning Your Wedding Today
        </h2>

        <p className="mt-4 text-gray-200">
          Submit your requirements, receive a personalized quotation, and manage
          the complete booking process online.
        </p>

        <Link
          to="/request-quote"
          className="inline-block mt-8 bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Request a Quote
        </Link>

      </section>

    </div>
  );
};

export default Services;