import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageCatering = () => {
  const [catering, setCatering] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    city: "",
    cover: "",
    pricePerPlate: "",
  });

  const fetchCatering = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/catering`
      );

      setCatering(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCatering();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this catering package?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/catering/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCatering();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/catering/${editingId}`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/catering`,
          form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchCatering();

      setShowForm(false);

      setEditingId(null);

      setForm({
        name: "",
        city: "",
        cover: "",
        pricePerPlate: "",
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Manage Catering
          </h1>

          <p className="text-slate-400">
            Add and manage catering packages
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);

            setForm({
              name: "",
              city: "",
              cover: "",
              pricePerPlate: "",
            });

            setShowForm(true);
          }}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-lg"
        >
          + Add Catering
        </button>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {catering.map((item) => (

          <div
            key={item._id}
            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
          >

            <img
              src={item.cover}
              alt={item.name}
              className="h-48 sm:h-52 w-full object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {item.name}
              </h2>

              <p className="text-slate-400 mt-1">
                {item.city}
              </p>

              <p className="text-green-400 font-bold text-lg mt-3">
                ₹{item.pricePerPlate} / Plate
              </p>

              <div className="mt-4 text-sm text-slate-300 space-y-1">

                <p>
                  Starters :
                  {" "}
                  {item.menu?.starters?.length || 0}
                </p>

                <p>
                  Main Course :
                  {" "}
                  {item.menu?.mains?.length || 0}
                </p>

                <p>
                  Desserts :
                  {" "}
                  {item.menu?.desserts?.length || 0}
                </p>

                <p>
                  Beverages :
                  {" "}
                  {item.menu?.beverages?.length || 0}
                </p>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">

                <button
                  onClick={() => {
                    setEditingId(item._id);

                    setForm({
                      name: item.name,
                      city: item.city,
                      cover: item.cover,
                      pricePerPlate: item.pricePerPlate,
                    });

                    setShowForm(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 hover:bg-red-700 py-2 rounded-lg"
                >
                  Delete
                </button>

                <Link
                  to={`/admin/catering/${item._id}/menu`}
                  className="bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-center"
                >
                  Menu
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <form
            onSubmit={handleSubmit}
            className="bg-slate-900 w-full max-w-lg mx-4 rounded-xl p-6 border border-slate-700"
          >

            <h2 className="text-2xl font-bold">
              {editingId ? "Edit Catering" : "Add Catering"}
            </h2>

            <input
              type="text"
              placeholder="Package Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              required
            />

            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              required
            />

            <input
              type="number"
              placeholder="Price Per Plate"
              value={form.pricePerPlate}
              onChange={(e) =>
                setForm({
                  ...form,
                  pricePerPlate: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              required
            />

            <input
              type="text"
              placeholder="Cover Image URL"
              value={form.cover}
              onChange={(e) =>
                setForm({ ...form, cover: e.target.value })
              }
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              required
            />

            <div className="flex gap-3 pt-2">

              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition"
              >
                {editingId
                  ? "Update Catering"
                  : "Save Catering"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);

                  setEditingId(null);

                  setForm({
                    name: "",
                    city: "",
                    cover: "",
                    pricePerPlate: "",
                  });
                }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 py-3 rounded-lg font-medium transition"
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

export default ManageCatering;