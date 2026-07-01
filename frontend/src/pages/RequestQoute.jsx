import React, { useState } from "react";
import WeddingForm from "../components/forms/WeddingForm";

const RequestQuote = () => {
  const [eventType, setEventType] = useState("");

  const events = [
    { id: "wedding", label: "Wedding Planning" },
    { id: "birthday", label: "Birthday Celebration" },
    { id: "corporate", label: "Corporate Event" },
    { id: "engagement", label: "Engagement Ceremony" },
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen py-16 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Request a Quote
          </h1>

          <p className="text-gray-400">
            Select event type and fill details to get instant estimation
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-900 border border-gray-800 px-6 py-2 rounded-full text-sm text-gray-300">
            Step 1 → Select Event Type
          </div>
        </div>

        {/* EVENT CARDS (IMPROVED UI) */}
        <div className="grid md:grid-cols-4 gap-4 mb-10">

          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => setEventType(event.id)}
              className={`cursor-pointer p-5 rounded-xl border transition text-center
                ${
                  eventType === event.id
                    ? "bg-purple-600 border-purple-400"
                    : "bg-gray-900 border-gray-800 hover:border-purple-500"
                }
              `}
            >
              <h3 className="font-semibold">{event.label}</h3>
            </div>
          ))}

        </div>

        {/* FORM AREA */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

          {!eventType && (
            <p className="text-gray-400 text-center">
              Please select an event type to continue
            </p>
          )}

          {eventType === "wedding" && <WeddingForm />}

          {eventType === "birthday" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Birthday Details</h2>
              <p className="text-gray-400">Birthday form will appear soon.</p>
            </div>
          )}

          {eventType === "corporate" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Corporate Details</h2>
              <p className="text-gray-400">Corporate form will appear soon.</p>
            </div>
          )}

          {eventType === "engagement" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Engagement Details</h2>
              <p className="text-gray-400">Engagement form will appear soon.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default RequestQuote;