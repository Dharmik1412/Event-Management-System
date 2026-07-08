import { useEffect, useState } from "react";
import axios from "axios";

const emptyVenue = {
    name: "",
    city: "",
    cover: "",
    price: "",
    decorLevel: "basic",

    subCards: [
        {
            name: "",
            image: "",
        },
    ],
};

const ManageVenue = () => {
    const [venues, setVenues] = useState([]);
    const [form, setForm] = useState(emptyVenue);
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem("token");

    const fetchVenues = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/venues`);
            setVenues(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchVenues();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubCardChange = (index, field, value) => {
        const updated = [...form.subCards];

        updated[index][field] = value;

        setForm({
            ...form,
            subCards: updated,
        });
    };

    const addSubCard = () => {
        setForm({
            ...form,
            subCards: [
                ...form.subCards,
                {
                    name: "",
                    image: "",
                },
            ],
        });
    };

    const removeSubCard = (index) => {
        const updated = form.subCards.filter((_, i) => i !== index);

        setForm({
            ...form,
            subCards: updated.length
                ? updated
                : [{ name: "", image: "" }],
        });
    };

    const handleSubmit = async () => {
        try {
            if (
                !form.name ||
                !form.city ||
                !form.cover ||
                !form.price
            ) {
                return alert("Please fill all fields.");
            }

            if (editingId) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/venues/${editingId}`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert("Venue Updated");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/venues`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert("Venue Added");
            }

            setForm(emptyVenue);
            setEditingId(null);
            fetchVenues();

        } catch (err) {
            console.log(err);
        }
    };

    const editVenue = (venue) => {
        setEditingId(venue._id);

        setForm({
            name: venue.name,
            city: venue.city,
            cover: venue.cover,
            price: venue.price,
            decorLevel: venue.decorLevel,
            subCards:
                venue.subCards?.length > 0
                    ? venue.subCards
                    : [
                        {
                            name: "",
                            image: "",
                        },
                    ],
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const deleteVenue = async (id) => {
        if (!window.confirm("Delete this venue?")) return;

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/venues/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchVenues();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="space-y-8">

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-6 text-white">
                    {editingId ? "Edit Venue" : "Add New Venue"}
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                    <input
                        name="name"
                        placeholder="Venue Name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-slate-800 rounded-lg p-3"
                    />

                    <input
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        className="bg-slate-800 rounded-lg p-3"
                    />

                    <input
                        name="cover"
                        placeholder="Cover Image URL"
                        value={form.cover}
                        onChange={handleChange}
                        className="bg-slate-800 rounded-lg p-3 md:col-span-2"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="bg-slate-800 rounded-lg p-3"
                    />

                    <select
                        name="decorLevel"
                        value={form.decorLevel}
                        onChange={handleChange}
                        className="bg-slate-800 rounded-lg p-3"
                    >
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                    </select>

                </div>

                <div className="md:col-span-2 mt-6">

                    <div className="flex justify-between items-center mb-4">

                        <h3 className="text-lg font-semibold text-white">
                            Venue Gallery
                        </h3>

                        <button
                            type="button"
                            onClick={addSubCard}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                        >
                            + Add Image
                        </button>

                    </div>

                    <div className="space-y-4">

                        {form.subCards.map((card, index) => (

                            <div
                                key={index}
                                className="border border-slate-700 rounded-lg p-4"
                            >

                                <div className="grid md:grid-cols-2 gap-4">

                                    <input
                                        placeholder="Area Name"
                                        value={card.name}
                                        onChange={(e) =>
                                            handleSubCardChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="bg-slate-800 rounded-lg p-3"
                                    />

                                    <input
                                        placeholder="Image URL"
                                        value={card.image}
                                        onChange={(e) =>
                                            handleSubCardChange(
                                                index,
                                                "image",
                                                e.target.value
                                            )
                                        }
                                        className="bg-slate-800 rounded-lg p-3"
                                    />

                                </div>

                                {card.image && (

                                    <img
                                        src={card.image}
                                        alt=""
                                        className="mt-4 h-36 w-full object-cover rounded-lg"
                                    />

                                )}

                                <button
                                    type="button"
                                    onClick={() => removeSubCard(index)}
                                    className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                                >
                                    Remove
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
                >
                    {editingId ? "Update Venue" : "Add Venue"}
                </button>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {venues.map((venue) => (

                    <div
                        key={venue._id}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                    >

                        <img
                            src={venue.cover}
                            alt={venue.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-5">

                            <h3 className="text-xl font-bold text-white">
                                {venue.name}
                            </h3>

                            <p className="text-slate-400">
                                {venue.city}
                            </p>

                            <p className="mt-2 text-purple-400 font-semibold">
                                ₹{venue.price.toLocaleString()}
                            </p>

                            <span className="inline-block mt-2 bg-purple-600 px-3 py-1 rounded-full text-sm">
                                {venue.decorLevel}
                            </span>

                            <div className="flex gap-3 mt-5">

                                <button
                                    onClick={() => editVenue(venue)}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteVenue(venue._id)}
                                    className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ManageVenue;