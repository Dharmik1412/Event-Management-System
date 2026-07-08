import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ManageMenu = () => {
    const { id } = useParams();

    const [catering, setCatering] = useState(null);

    const [limits, setLimits] = useState({
        starters: 2,
        mains: 3,
        desserts: 2,
        beverages: 2,
    });

    const [showModal, setShowModal] = useState(false);

    const [category, setCategory] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);

    const [itemName, setItemName] = useState("");

    const fetchCatering = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/catering/${id}`
            );

            setCatering(res.data.data);

            setLimits(
                res.data.data.limits || {
                    starters: 2,
                    mains: 3,
                    desserts: 2,
                    beverages: 2,
                }
            );

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCatering();
    }, []);

    if (!catering) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const openAdd = (type) => {
        setCategory(type);
        setEditingIndex(null);
        setItemName("");
        setShowModal(true);
    };

    const openEdit = (type, index) => {
        setCategory(type);
        setEditingIndex(index);
        setItemName(catering.menu[type][index]);
        setShowModal(true);
    };

    const removeItem = (type, index) => {
        const updated = {
            ...catering,
        };

        updated.menu[type].splice(index, 1);

        setCatering(updated);
    };

    const saveMenu = async () => {
        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/catering/${id}/menu`,
                {
                    menu: catering.menu,
                    limits,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Menu Updated Successfully");

            fetchCatering();

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <div className="max-w-6xl mx-auto">

                <h1 className="text-3xl font-bold">
                    {catering.name}
                </h1>

                <p className="text-slate-400 mt-1">
                    {catering.city}
                </p>

                <p className="text-green-400 font-bold text-xl mt-2">
                    ₹{catering.pricePerPlate} / Plate
                </p>

                <div className="bg-slate-900 rounded-xl p-6 mt-8">

                    <h2 className="text-xl font-bold mb-5">
                        Selection Limits
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4">

                        <input
                            type="number"
                            value={limits.starters}
                            onChange={(e) =>
                                setLimits({
                                    ...limits,
                                    starters: Number(e.target.value),
                                })
                            }
                            className="bg-slate-800 rounded-lg p-3"
                            placeholder="Starter Limit"
                        />

                        <input
                            type="number"
                            value={limits.mains}
                            onChange={(e) =>
                                setLimits({
                                    ...limits,
                                    mains: Number(e.target.value),
                                })
                            }
                            className="bg-slate-800 rounded-lg p-3"
                            placeholder="Main Limit"
                        />

                        <input
                            type="number"
                            value={limits.desserts}
                            onChange={(e) =>
                                setLimits({
                                    ...limits,
                                    desserts: Number(e.target.value),
                                })
                            }
                            className="bg-slate-800 rounded-lg p-3"
                            placeholder="Dessert Limit"
                        />

                        <input
                            type="number"
                            value={limits.beverages}
                            onChange={(e) =>
                                setLimits({
                                    ...limits,
                                    beverages: Number(e.target.value),
                                })
                            }
                            className="bg-slate-800 rounded-lg p-3"
                            placeholder="Beverage Limit"
                        />

                    </div>

                </div>

                {[
                    { key: "starters", title: "Starters" },
                    { key: "mains", title: "Main Course" },
                    { key: "desserts", title: "Desserts" },
                    { key: "beverages", title: "Beverages" },
                ].map((section) => (
                    <div
                        key={section.key}
                        className="bg-slate-900 rounded-xl p-6 mt-8"
                    >
                        <div className="flex justify-between items-center mb-5">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    {section.title}
                                </h2>

                                <p className="text-slate-400 text-sm">
                                    Total Items :{" "}
                                    {catering.menu?.[section.key]?.length || 0}
                                </p>
                            </div>

                            <button
                                onClick={() => openAdd(section.key)}
                                className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
                            >
                                + Add Item
                            </button>

                        </div>

                        {(catering.menu?.[section.key] || []).length === 0 ? (
                            <div className="text-slate-500 text-center py-8">
                                No items added yet.
                            </div>
                        ) : (
                            <div className="space-y-3">

                                {catering.menu[section.key].map((item, index) => (

                                    <div
                                        key={index}
                                        className="bg-slate-800 rounded-lg px-5 py-4 flex justify-between items-center"
                                    >

                                        <h3 className="font-medium">
                                            {item}
                                        </h3>

                                        <div className="flex gap-2">

                                            <button
                                                onClick={() =>
                                                    openEdit(section.key, index)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    removeItem(section.key, index)
                                                }
                                                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>
                        )}

                    </div>
                ))}

                {/* SAVE BUTTON */}
                <div className="mt-10 flex justify-center">
                    <button
                        onClick={saveMenu}
                        className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold"
                    >
                        Save Menu
                    </button>
                </div>

                {/* ADD / EDIT MODAL */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

                        <div className="bg-slate-900 w-full max-w-md rounded-xl p-6">

                            <h2 className="text-2xl font-bold mb-5">
                                {editingIndex === null ? "Add Item" : "Edit Item"}
                            </h2>

                            <input
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                placeholder="Enter Item Name"
                                className="w-full bg-slate-800 rounded-lg p-3 mb-6"
                            />

                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setItemName("");
                                    }}
                                    className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {

                                        if (!itemName.trim()) return;

                                        const updated = {
                                            ...catering,
                                            menu: {
                                                ...catering.menu,
                                                [category]: [...catering.menu[category]],
                                            },
                                        };

                                        if (editingIndex === null) {
                                            updated.menu[category].push(itemName);
                                        } else {
                                            updated.menu[category][editingIndex] = itemName;
                                        }

                                        setCatering(updated);

                                        setShowModal(false);
                                        setItemName("");
                                        setEditingIndex(null);

                                    }}
                                    className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg"
                                >
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageMenu;