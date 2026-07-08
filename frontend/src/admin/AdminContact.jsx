import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContact = () => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState({});

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.get(
                 `${import.meta.env.VITE_API_URL}/api/contact`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages(res.data.data || []);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchMessages();
        } catch (err) {
            console.log(err);
        }
    };

    const sendReply = async (msg, method) => {
        const token = localStorage.getItem("token");

        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/contact/${msg._id}`,
            {
                replyMessage: reply[msg._id],
                replyMethod: method,
                status: "Replied",
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        alert(`Reply sent via ${method}`);
        fetchMessages();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">

            <h1 className="text-3xl font-bold mb-6">
                Contact Messages
            </h1>

            <div className="grid gap-4">

                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-5"
                    >

                        <div className="flex justify-between">
                            <h2 className="text-xl font-bold">
                                {msg.name}
                            </h2>

                            <span className="text-sm text-purple-400">
                                {msg.status}
                            </span>
                        </div>

                        <p className="text-slate-400">{msg.email}</p>
                        <p className="text-slate-400">{msg.phone}</p>

                        <p className="mt-3">
                            <b>Event:</b> {msg.eventType}
                        </p>

                        <p>
                            <b>Query:</b> {msg.queryType}
                        </p>

                        <p className="mt-2 text-slate-300">
                            {msg.message}
                        </p>

                        <textarea
                            placeholder="Write reply..."
                            value={reply[msg._id] || ""}
                            onChange={(e) =>
                                setReply({
                                    ...reply,
                                    [msg._id]: e.target.value,
                                })
                            }
                            className="w-full p-2 mt-3 rounded bg-slate-800"
                        />

                        <div className="flex gap-2 mt-3">

                            <button
                                onClick={() => sendReply(msg, "email")}
                                className="px-3 py-1 bg-purple-600 rounded"
                            >
                                Send Email Reply
                            </button>

                            <button
                                onClick={() => sendReply(msg, "phone")}
                                className="px-3 py-1 bg-blue-600 rounded"
                            >
                                Send Phone Reply
                            </button>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
};

export default AdminContact;