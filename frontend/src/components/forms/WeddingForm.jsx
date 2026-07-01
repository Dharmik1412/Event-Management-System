import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

/* ---------------- CARD ---------------- */
const Card = ({ item, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl overflow-hidden border transition hover:scale-[1.02] ${selected?.name === item.name
        ? "border-purple-500 shadow-lg"
        : "border-gray-700"
        }`}
    >
      <img src={item.cover || item.image} className="h-28 w-full object-cover" />
      <div className="p-2 bg-gray-800">
        <p className="text-white font-semibold">{item.name}</p>
      </div>
    </div>
  );
};

/* ---------------- MAIN ---------------- */
const WeddingForm = () => {
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    city: "",
    eventDate: "",
    guests: "",
    venueStatus: "",
    requirements: "",
  });

  const [venues, setVenues] = useState([]);
  const [venue, setVenue] = useState(null);
  const [activeVenue, setActiveVenue] = useState(null);
  const [selectedVenueOption, setSelectedVenueOption] = useState(null);

  const [decorations, setDecorations] = useState([]);
  const [decoration, setDecoration] = useState(null);
  const [activeDecoration, setActiveDecoration] = useState(null);
  const [selectedDecorationOption, setSelectedDecorationOption] = useState(null);

  const [catering, setCatering] = useState([]);
  const [cateringSel, setCateringSel] = useState(null);
  const [activeCatering, setActiveCatering] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState({
    starters: [],
    mains: [],
    desserts: [],
    beverages: [],
  });

  const handleFoodSelect = (category, item) => {

    if (!activeCatering) return;

    const limit =
      activeCatering.limits?.[category] || 0;

    const current =
      selectedMenu[category];

    const exists =
      current.includes(item);

    if (exists) {
      setSelectedMenu({
        ...selectedMenu,
        [category]:
          current.filter((i) => i !== item),
      });
      return;
    }

    if (current.length >= limit) {
      alert(
        `Only ${limit} ${category} allowed`
      );
      return;
    }

    setSelectedMenu({
      ...selectedMenu,
      [category]: [...current, item],
    });
  };

  const levelOrder = {
    basic: 1,
    premium: 2,
    luxury: 3,
  };

  const filteredDecorations = decorations.filter(
    (d) =>
      !venue ||
      levelOrder[d.level] <= levelOrder[venue.decorLevel]
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- FETCH ALL DATA ON CITY CHANGE ---------------- */
  useEffect(() => {
    const city = formData.city?.trim();

    if (!city) return;

    const fetchData = async () => {
      try {
        const [v, d, c] = await Promise.all([
          axios.get(`http://localhost:5000/api/venues?city=${city}`),
          axios.get(`http://localhost:5000/api/decorations?city=${city}`),
          axios.get(`http://localhost:5000/api/catering?city=${city}`),
        ]);

        console.log("VENUES:", v.data);
        console.log("DECOR:", d.data);
        console.log("CATERING:", c.data);

        setVenues(v.data.data || []);
        setDecorations(d.data.data || []);
        setCatering(c.data.data || []);
      } catch (err) {
        console.log("API ERROR:", err);
      }
    };

    fetchData();
  }, [formData.city]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    const payload = {
      customerId: decoded.id,
      eventType: "Wedding",
      city: formData.city,
      eventDate: formData.eventDate,
      guests: Number(formData.guests),
      venueStatus: formData.venueStatus,
      requirements: formData.requirements,

      eventDetails: {
        venue: {
          id: venue?._id,
          category: venue?.name,
          option: selectedVenueOption,
          price: venue?.price || 0,
        },

        decoration: {
          id: decoration?._id,
          category: decoration?.name,
          theme: selectedDecorationOption,
          price: decoration?.price || 0,
        },

        catering: {
          id: cateringSel?._id,
          package: cateringSel?.name,
          pricePerPlate: cateringSel?.pricePerPlate || 0,
          selectedItems: selectedMenu,
        },
      },


    };

    await axios.post("http://localhost:5000/api/", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Request submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Wedding Booking System
        </h1>

        {/* ---------------- FORM ---------------- */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-3 bg-gray-900 p-5 rounded-xl">
            <input name="brideName" placeholder="Bride Name"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange} />

            <input name="groomName" placeholder="Groom Name"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange} />

            <input name="city" placeholder="City (Ahmedabad, Surat...)"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange} />

            <input type="date" name="eventDate"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange} />

            <input name="guests" placeholder="Guests"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange} />

            <select name="venueStatus"
              className="p-3 bg-gray-800 rounded"
              onChange={handleChange}>
              <option value="">Select Venue Status</option>
              <option value="needVenue">Need Venue</option>
              <option value="haveVenue">Have Venue</option>
            </select>
          </div>

          {/* VENUES */}
          <div>
            <h2 className="text-purple-400 font-semibold mb-3">Venues</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {venues.map((v) => (
                <Card
                  key={v._id}
                  item={v}
                  selected={venue}
                  onClick={() => {
                    setVenue(v);
                    setActiveVenue(v);

                    // reset venue selection
                    setSelectedVenueOption(null);

                    // reset decoration selection
                    setDecoration(null);
                    setActiveDecoration(null);
                    setSelectedDecorationOption(null);
                  }}
                />
              ))}
            </div>
          </div>

          {activeVenue && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                {activeVenue.name} Gallery
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                {activeVenue?.subCards?.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => setSelectedVenueOption(sub)}
                    className={`cursor-pointer rounded-xl overflow-hidden border transition
      ${selectedVenueOption?._id === sub._id
                        ? "border-purple-500 shadow-lg"
                        : "border-gray-700"
                      }`}
                  >
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="h-40 w-full object-cover"
                    />

                    <div className="p-3 bg-gray-900">
                      <p className="font-semibold text-white">
                        {sub.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedVenueOption && (
            <div className="mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-500">
              Selected Venue: {selectedVenueOption.name}
            </div>
          )}

          {/* DECORATION */}
          {venue && (
            <div>
              <h2 className="text-purple-400 font-semibold mb-3">Decoration</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {filteredDecorations.map((d) => (
                  <Card
                    key={d._id}
                    item={d}
                    selected={decoration}
                    onClick={() => {
                      setDecoration(d);
                      setActiveDecoration(d);
                      setSelectedDecorationOption(null);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {activeDecoration && (
            <div className="mt-6">

              <h3 className="text-lg font-semibold text-purple-400 mb-3">
                {activeDecoration.name} Themes
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                {activeDecoration.subCards?.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => setSelectedDecorationOption(sub)}
                    className="cursor-pointer border border-gray-700 rounded-xl overflow-hidden"
                  >
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="h-40 w-full object-cover"
                    />

                    <div className="p-3 bg-gray-900">
                      {sub.name}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {selectedDecorationOption && (
            <div className="mt-4 p-3 rounded-lg bg-purple-900/20 border border-purple-500">
              Selected Decoration: {selectedDecorationOption.name}
            </div>
          )}

          {/* CATERING */}
          <div>
            <h2 className="text-purple-400 font-semibold mb-3">Catering</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {catering.map((c) => (
                <Card
                  key={c._id}
                  item={c}
                  selected={cateringSel}
                  onClick={() => {
                    setCateringSel(c);
                    setActiveCatering(c);

                    setSelectedMenu({
                      starters: [],
                      mains: [],
                      desserts: [],
                      beverages: [],
                    });
                  }}
                />
              ))}
            </div>
          </div>

          {activeCatering && (

            <div className="bg-gray-900 p-5 rounded-xl">

              <h2 className="text-xl font-semibold text-purple-400 mb-4">
                {activeCatering.name}
              </h2>

              {Object.entries(activeCatering.menu).map(
                ([category, items]) => (

                  <div key={category} className="mb-6">

                    <h3 className="font-semibold mb-2 capitalize">
                      {category}
                      {" "}
                      (
                      Max:
                      {" "}
                      {activeCatering.limits[category]}
                      )
                    </h3>

                    <div className="grid md:grid-cols-3 gap-3">

                      {items.map((item) => (

                        <div
                          key={item}
                          onClick={() =>
                            handleFoodSelect(category, item)
                          }
                          className={`p-3 rounded-lg cursor-pointer border ${selectedMenu[
                            category
                          ]?.includes(item)
                            ? "border-purple-500 bg-purple-500/20"
                            : "border-gray-700"
                            }`}
                        >
                          {item}
                        </div>

                      ))}

                    </div>

                  </div>

                )
              )}

            </div>

          )}
          {/* REQUIREMENTS */}
          <textarea
            name="requirements"
            placeholder="Special requirements..."
            className="w-full p-3 bg-gray-800 rounded"
            onChange={handleChange}
          />

          {/* SUBMIT */}
          <button className="w-full bg-purple-600 py-4 rounded-xl font-bold hover:bg-purple-700">
            Submit Request
          </button>

        </form>
      </div>
    </div>
  );
};

export default WeddingForm;