import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    totalRequests: 0,
    pending: 0,
    quoted: 0,
    revenue: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/admin/stats", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("STATS:", data);
        setStats(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-400">
          Manage events, quotations and bookings
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">Total Requests</p>
          <h2 className="text-3xl font-bold text-purple-400">
            {stats?.totalRequests ?? 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">Pending</p>
          <h2 className="text-3xl font-bold text-purple-400">
            {stats?.totalRequests ?? 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">Quoted</p>
          <h2 className="text-3xl font-bold text-purple-400">
            {stats?.totalRequests ?? 0}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">Revenue</p>
          <h2 className="text-3xl font-bold text-green-400">
            ₹{stats.revenue}
          </h2>
        </div>

      </div>

      {/* TABLE AREA */}
      <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-4">
          Recent Requests
        </h2>

        {requests.length === 0 ? (
          <div className="text-slate-400">
            No requests found
          </div>
        ) : (
          <div className="space-y-3">

            {requests.slice(0, 5).map((req) => (
              <div
                key={req._id}
                className="flex justify-between items-center bg-slate-800 p-3 rounded-lg"
              >

                <div>
                  <p className="font-semibold">
                    {req.eventType}
                  </p>

                  <p className="text-sm text-slate-400">
                    {req.city} • {req.guests} Guests
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-300">
                    {req.status}
                  </p>

                  <p className="text-xs text-slate-500">
                    {req.eventDate
                      ? new Date(req.eventDate).toLocaleDateString()
                      : ""}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;