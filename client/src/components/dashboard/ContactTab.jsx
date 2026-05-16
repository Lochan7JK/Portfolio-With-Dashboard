import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import api from "../utils/apiToken";
// const res = await api.get("/contacts");

dayjs.extend(relativeTime);

export default function ContactTab({ contacts, setContacts, fetchContacts }) {

  const [selectedMessage, setSelectedMessage] = useState(null);

  const token = localStorage.getItem("token");
  // MARK READ
  const markAsRead = async (id) => {
    try {

      await axios.put(
        // `http://localhost:5000/dashboard/contacts/${id}/read`,
        `${import.meta.env.VITE_API_URL}/dashboard/contacts/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchContacts();

      setSelectedMessage({
        ...selectedMessage,
        is_read: true,
      });

    } catch (err) {
      console.log(err);
    }
  };



  // TOGGLE STAR
  const toggleStar = async (id) => {
    try {

      await axios.put(
        // `http://localhost:5000/dashboard/contacts/${id}/star`,
        `${import.meta.env.VITE_API_URL}/dashboard/contacts/${id}/star`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchContacts();

    } catch (err) {
      console.log(err);
    }
  };


  const unreadCount = contacts.filter(c => !c.is_read).length;

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-3xl mb-6 font-semibold">
          Inbox
        </h1>

        <div className="bg-[#00ADB5] text-white px-4 py-2 rounded-xl">
          🔔 {unreadCount} new messages
        </div>

      </div>



      {/* CONTACT LIST */}
      <div className="flex flex-col gap-4">

        {contacts.map((c) => (

          <div
            key={c.id}
            onClick={() => setSelectedMessage(c)}
            className={`rounded-2xl cursor-pointer p-5 border transition hover:scale-[1.01] ${
              !c.is_read
                ? "bg-[#00ADB5]/10 border-[#00ADB5]/40"
                : "bg-[#222] border-white/5"
            }`}
          >

            {/* TOP */}
            <div className="flex justify-between items-start gap-4">

              <div>
                <h2 className="text-lg font-semibold">
                  {c.name || "No Name Provided"}
                </h2>

                <p className="text-gray-400 text-sm">
                  {c.email || "No Email Provided"}
                </p>
                <p className="text-gray-400 text-sm">
                  {c.phone} 
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  {dayjs(c.created_at).fromNow()}
                </p>
              </div>


              <div className="flex justify-end items-center gap-4">
                {/* BADGE */}
                 {!c.is_read && (
                    <span onClick={(e) => e.stopPropagation()}
                    className="bg-[#00ADB5] text-xs px-3 py-1 rounded-full">
                        New
                    </span>
                 )}
              
                {/* STAR */}
                <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(c.id);
                    }}
                    className="text-2xl"
                >
                    {c.starred ? "⭐" : "☆"}
                </button>
              </div>

            </div>


            {/* SUBJECT */}
            <p className="text-gray-200 mt-4 whitespace-pre-wrap">
              <span className="text-gray-400 font-semibold">Subject:</span> {c.subject || "Not Provided"}
            </p>

            {/* MESSAGE */}
            <p className="text-gray-200 mt-4 whitespace-pre-wrap">
              <span className="text-gray-400 font-semibold">Message:</span> {c.message|| "Not Provided"}
            </p>

          </div>

        ))}

      </div>


      {/* MODAL */}
      {selectedMessage && (
            <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
                <div className="bg-[#1f1f1f] max-w-2xl w-full rounded-2xl p-6 relative border border-white/10">

                    {/* CLOSE */}
                    <button
                        onClick={() => setSelectedMessage(null)}
                        className="absolute top-4 right-4 text-xl"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl mb-2">
                        {selectedMessage.subject || "No Subject"}
                    </h2>

                    <div className="text-gray-400 mb-6">
                        <p>{selectedMessage.name || "No Name Provided"}</p>
                        <p>{selectedMessage.email || "No Email Provided"}</p>
                        <p>{selectedMessage.phone || "No Phone No. Provided"}</p>
                    </div>

                    <div className="bg-black/20 p-4 rounded-xl whitespace-pre-wrap">
                        {selectedMessage.message || "No Message Provided"}
                    </div>



                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-5 flex-wrap">

                    {/* MARK AS READ */}
                    <button
                        onClick={() => markAsRead(selectedMessage.id)}
                        className="bg-[#00ADB5] px-4 py-2 rounded-lg"
                    >
                        Mark Read
                    </button>


                    {/* REPLY */}
                    <a
                        href={`mailto:${selectedMessage.email}`}
                        target="_blank"
                        className="bg-[#333] px-4 py-2 rounded-lg"
                    >
                        Reply
                    </a>

                    {/* DELETE */}
                    <button
                        onClick={async () => {
                            try {

                            // await axios.delete(`http://localhost:5000/dashboard/contacts/${selectedMessage.id}`,
                            await axios.delete(`${import.meta.env.VITE_API_URL}/dashboard/contacts/${selectedMessage.id}`,
                                {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                        }
                            );

                            fetchContacts();

                            setSelectedMessage(null);

                            } catch (err) {
                            console.log(err);
                            }
                        }}
                        className="bg-red-500 px-4 py-2 rounded-lg"
                        >
                        Delete
                    </button>

                    </div>

                </div>
            </div>
        )}


    
    </div>
  );
}
