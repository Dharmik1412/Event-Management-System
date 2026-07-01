import { useEffect, useState } from "react";
import axios from "axios";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateDecision = async (id, type) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/${id}/${type}`,
        {},
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

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          My Event Requests
        </h1>

        {requests.length === 0 && (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            No requests found.
          </div>
        )}

        <div className="space-y-6">

          {requests.map((req) => (

            <div
              key={req._id}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6"
            >

              <div className="flex justify-between items-center mb-5">

                <div>
                  <h2 className="text-2xl font-bold">
                    {req.eventType}
                  </h2>

                  <p className="text-gray-400">
                    {new Date(req.eventDate).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${
                    req.status === "Pending"
                      ? "bg-yellow-600"
                      : req.status === "Quoted"
                      ? "bg-blue-600"
                      : req.status === "Approved"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {req.status}
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <h3 className="text-purple-400 font-semibold mb-3">
                    Event Information
                  </h3>

                  <p><strong>City:</strong> {req.city}</p>
                  <p><strong>Guests:</strong> {req.guests}</p>
                  <p><strong>Venue Status:</strong> {req.venueStatus}</p>

                  <p className="mt-3">
                    <strong>Venue:</strong>{" "}
                    {req.eventDetails?.venueCategory}
                  </p>

                  <p>
                    <strong>Venue Option:</strong>{" "}
                    {req.eventDetails?.venueOption?.name}
                  </p>

                  <p className="mt-3">
                    <strong>Decoration:</strong>{" "}
                    {req.eventDetails?.decoration?.category}
                  </p>

                  <p>
                    <strong>Theme:</strong>{" "}
                    {req.eventDetails?.decoration?.theme?.name}
                  </p>

                </div>

                <div>

                  <h3 className="text-purple-400 font-semibold mb-3">
                    Catering
                  </h3>

                  <p>
                    <strong>Package:</strong>{" "}
                    {req.eventDetails?.catering?.package}
                  </p>

                  <p className="mt-2">
                    <strong>Starters:</strong>{" "}
                    {req.eventDetails?.catering?.selectedItems?.starters?.join(", ")}
                  </p>

                  <p>
                    <strong>Main Course:</strong>{" "}
                    {req.eventDetails?.catering?.selectedItems?.mains?.join(", ")}
                  </p>

                  <p>
                    <strong>Desserts:</strong>{" "}
                    {req.eventDetails?.catering?.selectedItems?.desserts?.join(", ")}
                  </p>

                  <p>
                    <strong>Beverages:</strong>{" "}
                    {req.eventDetails?.catering?.selectedItems?.beverages?.join(", ")}
                  </p>

                </div>

              </div>

              <hr className="my-6 border-gray-700" />

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <h3 className="text-purple-400 font-semibold mb-2">
                    Quotation
                  </h3>

                  <p className="text-3xl font-bold text-green-400">
                    ₹{req.quotationAmount.toLocaleString()}
                  </p>

                  <p className="mt-3 text-gray-300">
                    {req.quotationNotes || "No notes from admin."}
                  </p>

                </div>

                {req.status === "Quoted" && (

                  <div className="flex items-end gap-4">

                    <button
                      onClick={() =>
                        updateDecision(req._id, "approve")
                      }
                      className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateDecision(req._id, "reject")
                      }
                      className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default MyRequests;