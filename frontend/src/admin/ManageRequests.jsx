import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [finalAmount, setFinalAmount] = useState({});
  const [quotationAmount, setQuotationAmount] = useState({});
  const [notes, setNotes] = useState({});


  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  const calculateQuotation = (req) => {
    const venue = req.eventDetails?.venue?.price || 0;

    const decoration =
      req.eventDetails?.decoration?.price || 0;

    const catering =
      (req.eventDetails?.catering?.pricePerPlate || 0) *
      req.guests;

    return venue + decoration + catering;
  };

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";

      case "Quoted":
        return "bg-blue-500/20 text-blue-400";

      case "Approved":
        return "bg-green-500/20 text-green-400";

      case "Rejected":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Manage Event Requests
        </h1>

        <p className="text-slate-400 mt-2">
          Review customer requests and send quotations.
        </p>

      </div>

      {requests.length === 0 ? (

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-10 text-center">

          <h2 className="text-2xl font-semibold">
            No Requests Found
          </h2>

          <p className="text-slate-400 mt-2">
            Customer requests will appear here.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {requests.map((req) => (

            <div
              key={req._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 transition duration-300"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {req.eventType}
                  </h2>

                  <p className="text-slate-400 mt-1">
                    {req.city}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                    req.status
                  )}`}
                >
                  {req.status}
                </span>

              </div>

              <div className="mt-6 space-y-2 text-slate-300">

                <p>
                  👤 <strong>{req.customerId?.name}</strong>
                </p>

                <p>
                  📧 {req.customerId?.email}
                </p>

                <p>
                  📅{" "}
                  {new Date(
                    req.eventDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  👥 {req.guests} Guests
                </p>

                <p>
                  🏛️ Venue :
                  {" "}
                  {req.eventDetails?.venue?.option?.name ||
                    "Not Selected"}
                </p>

              </div>

              <div className="mt-6 bg-slate-800 rounded-xl p-4">

                <p className="text-slate-400 text-sm">
                  Estimated Quotation
                </p>

                <h3 className="text-3xl font-bold text-green-400 mt-1">
                  ₹{calculateQuotation(req).toLocaleString()}
                </h3>

              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={() =>
                    setSelectedRequest(req)
                  }
                  className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-medium transition"
                >
                  View Details
                </button>

                <select
                  value={req.status}
                  onChange={(e) =>
                    updateStatus(
                      req._id,
                      e.target.value
                    )
                  }
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4"
                >
                  <option>Pending</option>
                  <option>Quoted</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Modal will be added in Part 2 */}

      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">

            {/* Header */}

            <div className="flex justify-between items-center p-6 border-b border-slate-700">

              <div>
                <h2 className="text-2xl font-bold">
                  {selectedRequest.eventType}
                </h2>

                <p className="text-slate-400">
                  Request Details
                </p>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="text-3xl hover:text-red-400"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-8">

              {/* Customer */}

              <div>

                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Customer Information
                </h3>

                <div className="grid md:grid-cols-2 gap-3">

                  <p><strong>Name:</strong> {selectedRequest.customerId?.name}</p>

                  <p><strong>Email:</strong> {selectedRequest.customerId?.email}</p>

                  <p><strong>City:</strong> {selectedRequest.city}</p>

                  <p><strong>Guests:</strong> {selectedRequest.guests}</p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(selectedRequest.eventDate).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Status:</strong> {selectedRequest.status}
                  </p>

                </div>

              </div>

              {/* Venue */}

              <div>

                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Venue
                </h3>

                <p>
                  <strong>Category:</strong>{" "}
                  {selectedRequest.eventDetails?.venue?.category || "N/A"}
                </p>

                <p>
                  <strong>Venue:</strong>{" "}
                  {selectedRequest.eventDetails?.venue?.option?.name || "N/A"}
                </p>

              </div>

              {/* Decoration */}

              <div>

                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Decoration
                </h3>

                <p>
                  <strong>Category:</strong>{" "}
                  {selectedRequest.eventDetails?.decoration?.category || "N/A"}
                </p>

                <p>
                  <strong>Theme:</strong>{" "}
                  {selectedRequest.eventDetails?.decoration?.theme?.name || "N/A"}
                </p>

                <p>
                  <strong>Price:</strong> ₹
                  {selectedRequest.eventDetails?.decoration?.price || 0}
                </p>

              </div>

              {/* Catering */}

              <div>

                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Catering
                </h3>

                <p>
                  <strong>Price Per Plate:</strong> ₹
                  {selectedRequest.eventDetails?.catering?.pricePerPlate || 0}
                </p>

                <p>
                  <strong>Starters:</strong>{" "}
                  {selectedRequest.eventDetails?.catering?.selectedItems?.starters?.join(", ") || "None"}
                </p>

                <p>
                  <strong>Main Course:</strong>{" "}
                  {selectedRequest.eventDetails?.catering?.selectedItems?.mains?.join(", ") || "None"}
                </p>

                <p>
                  <strong>Desserts:</strong>{" "}
                  {selectedRequest.eventDetails?.catering?.selectedItems?.desserts?.join(", ") || "None"}
                </p>

                <p>
                  <strong>Beverages:</strong>{" "}
                  {selectedRequest.eventDetails?.catering?.selectedItems?.beverages?.join(", ") || "None"}
                </p>

              </div>

              {/* Requirements */}

              <div>

                <h3 className="text-xl font-semibold text-purple-400 mb-3">
                  Requirements
                </h3>

                <p className="text-slate-300">
                  {selectedRequest.requirements || "No extra requirements."}
                </p>

              </div>

              {/* Estimated Quotation (EDITABLE + SUBMIT) */}

              <div className="bg-slate-800 rounded-xl p-5 space-y-4">

                <h3 className="text-xl font-semibold mb-2">
                  Quotation (Editable by Admin)
                </h3>

                {/* Editable Amount */}
                <input
                  type="number"
                  value={
                    finalAmount[selectedRequest._id] ??
                    calculateQuotation(selectedRequest)
                  }
                  onChange={(e) =>
                    setFinalAmount({
                      ...finalAmount,
                      [selectedRequest._id]: Number(e.target.value),
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-green-400 text-xl font-bold"
                />

                {/* Notes */}
                <textarea
                  placeholder="Add notes (optional)"
                  value={notes[selectedRequest._id] || ""}
                  onChange={(e) =>
                    setNotes({
                      ...notes,
                      [selectedRequest._id]: e.target.value,
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"
                  rows="3"
                />

                {/* Submit Button */}
                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");

                      await axios.put(
                        `${import.meta.env.VITE_API_URL}/api/${selectedRequest._id}/quotation`,
                        {
                          quotationAmount:
                            finalAmount[selectedRequest._id] ??
                            calculateQuotation(selectedRequest),
                          quotationNotes: notes[selectedRequest._id] || "",
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      alert("Quotation Sent Successfully");
                      setSelectedRequest(null);
                      fetchRequests();

                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-semibold"
                >
                  Send Quotation
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManageRequests;