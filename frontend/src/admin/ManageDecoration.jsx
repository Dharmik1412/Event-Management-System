import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageDecoration = () => {
    const [decorations, setDecorations] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        name: "",
        city: "",
        level: "basic",
        price: "",
        cover: "",
    });

    const fetchDecorations = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/decorations`
            );

            setDecorations(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDecorations();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            if (editingId) {
                await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/decorations/${editingId}`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/decorations`,
                    form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            fetchDecorations();

            setShowForm(false);

            setEditingId(null);

            setForm({
                name: "",
                city: "",
                level: "basic",
                price: "",
                cover: "",
            });

        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this decoration?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/decorations/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchDecorations();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">
                        Manage Decorations
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Total Decorations : {decorations.length}
                    </p>
                </div>

                <button
                    onClick={() => {
                        setEditingId(null);

                        setForm({
                            name: "",
                            city: "",
                            level: "basic",
                            price: "",
                            cover: "",
                        });

                        setShowForm(true);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg font-medium transition"
                >
                    + Add Decoration
                </button>
            </div>

            {/* Empty State */}
            {decorations.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        No Decorations Found
                    </h2>

                    <p className="text-slate-400">
                        Add your first decoration package.
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

                    {decorations.map((item) => (
                        <div
                            key={item._id}
                            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col transition duration-300 hover:border-purple-500 hover:-translate-y-1"
                        >
                            <img
                                src={item.cover}
                                alt={item.name}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5 flex flex-col flex-1">

                                <h2 className="text-xl font-bold">
                                    {item.name}
                                </h2>

                                <div className="mt-3 space-y-2 text-slate-300">

                                    <p>
                                        <strong>City:</strong> {item.city}
                                    </p>

                                    <p>
                                        <strong>Level:</strong>{" "}
                                        <span className="capitalize bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                                            {item.level}
                                        </span>
                                    </p>

                                    <p>
                                        <strong>Price:</strong> ₹{item.price}
                                    </p>

                                    <p>
                                        <strong>Themes:</strong>{" "}
                                        {item.subCards?.length || 0}
                                    </p>

                                </div>

                                <div className="flex gap-3 mt-auto pt-5">
                                    <button
                                        onClick={() => {
                                            setEditingId(item._id);

                                            setForm({
                                                name: item.name,
                                                city: item.city,
                                                level: item.level,
                                                price: item.price,
                                                cover: item.cover,
                                            });

                                            setShowForm(true);
                                        }}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

                    <form
                        onSubmit={handleSubmit}
                        className="bg-slate-900 w-full max-w-lg rounded-xl p-6 space-y-4"
                    >

                        <h2 className="text-2xl font-bold">
                            {editingId ? "Edit Decoration" : "Add Decoration"}
                        </h2>

                        <input
                            placeholder="Decoration Name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full p-3 rounded bg-slate-800"
                        />

                        <input
                            placeholder="City"
                            value={form.city}
                            onChange={(e) =>
                                setForm({ ...form, city: e.target.value })
                            }
                            className="w-full p-3 rounded bg-slate-800"
                        />

                        <input
                            type="number"
                            placeholder="Price"
                            value={form.price}
                            onChange={(e) =>
                                setForm({ ...form, price: e.target.value })
                            }
                            className="w-full p-3 rounded bg-slate-800"
                        />

                        <select
                            value={form.level}
                            onChange={(e) =>
                                setForm({ ...form, level: e.target.value })
                            }
                            className="w-full p-3 rounded bg-slate-800"
                        >
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="luxury">Luxury</option>
                        </select>

                        <input
                            placeholder="Cover Image URL"
                            value={form.cover}
                            onChange={(e) =>
                                setForm({ ...form, cover: e.target.value })
                            }
                            className="w-full p-3 rounded bg-slate-800"
                        />

                        <div className="flex gap-3">

                            <button
                                type="submit"
                                className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg"
                            >
                                {editingId ? "Update Decoration" : "Save Decoration"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);

                                    setEditingId(null);

                                    setForm({
                                        name: "",
                                        city: "",
                                        level: "basic",
                                        price: "",
                                        cover: "",
                                    });
                                }}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

        </div>
    );
};

export default ManageDecoration;