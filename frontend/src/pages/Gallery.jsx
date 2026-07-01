import React, { useState } from "react";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("Wedding");
  const [selectedItem, setSelectedItem] = useState(null);
  const [comingSoon, setComingSoon] = useState(false);

  const categories = ["Wedding", "Corporate", "Birthday", "Engagement"];

  const galleryItems = [
    {
      title: "Royal Wedding Stage",
      category: "Wedding",
      desc: "Luxury floral stage setup with premium lighting design.",
      image:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900",
    },
    {
      title: "Elegant Mandap Design",
      category: "Wedding",
      desc: "Traditional mandap with modern decoration style.",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900",
    },
    {
      title: "Corporate Conference Setup",
      category: "Corporate",
      desc: "Professional business event arrangement with branding.",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900",
    },
    {
      title: "Birthday Party Theme Setup",
      category: "Birthday",
      desc: "Colorful balloon decoration with theme setup.",
      image:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900",
    },
    {
      title: "Engagement Party Theme Setup",
      category: "Engagement",
      desc: "Elegant engagement decoration setup.",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900",
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => item.category === activeTab
  );

  const handleClick = (item) => {
    if (!item) return;

    if (item.category === "Wedding") {
      setSelectedItem(item);
    } else {
      setComingSoon(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <div className="text-center py-14 border-b border-slate-800">
        <h1 className="text-4xl font-bold mb-3">Event Gallery</h1>
        <p className="text-slate-400">
          Explore event inspirations (Wedding is currently active)
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex justify-center gap-3 flex-wrap py-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full border text-sm transition ${
              activeTab === cat
                ? "bg-purple-600 border-purple-500"
                : "border-slate-700 text-slate-300 hover:border-purple-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filteredItems.map((item) => (
          <div
            key={`${item.title}-${item.category}`}
            onClick={() => handleClick(item)}
            className="relative cursor-pointer rounded-xl overflow-hidden border border-slate-800 hover:border-purple-500 transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-56 w-full object-cover hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WEDDING MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">

          <div className="bg-slate-900 max-w-3xl w-full rounded-xl overflow-hidden border border-slate-700">

            <img
              src={selectedItem.image}
              className="w-full h-80 object-cover"
              alt={selectedItem.title}
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">
                {selectedItem.title}
              </h2>

              <p className="text-slate-400 mb-4">
                {selectedItem.desc}
              </p>

              <button
                onClick={() => setSelectedItem(null)}
                className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* COMING SOON MODAL */}
      {comingSoon && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">

          <div className="bg-slate-900 max-w-md w-full rounded-xl p-6 text-center border border-slate-700">

            <h2 className="text-2xl font-bold mb-3">
              Coming Soon 🚀
            </h2>

            <p className="text-slate-400 mb-6">
              This event service will be available soon.
              Currently we are fully active for Wedding planning only.
            </p>

            <button
              onClick={() => setComingSoon(false)}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
            >
              Got it
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Gallery;