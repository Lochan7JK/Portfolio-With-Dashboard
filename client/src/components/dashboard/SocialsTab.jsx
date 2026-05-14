import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SocialsTab() {
    const [socials, setSocials] = useState([]);

    const token = localStorage.getItem("token");

//🔹 Fetch social icons 
    useEffect(() => {
        const fetchSocials = async () => {
            try {
            const res = await axios.get(
                "http://localhost:5000/social-links"
            );

            setSocials(res.data);

            } catch (err) {
            console.log(err);
            }
        };

        fetchSocials();

    }, []);


    return (
        <div className="flex flex-col gap-4">

            {socials.map((s) => (

            <div
                key={s.id}
                className="bg-[#222] p-4 rounded-xl flex flex-col gap-3"
            >

                <h2 className="capitalize text-lg">
                {s.platform}
                </h2>

                <input
                value={s.url}
                onChange={(e) => {
                    const updated = socials.map((item) =>
                    item.id === s.id
                        ? { ...item, url: e.target.value }
                        : item
                    );

                    setSocials(updated);
                }}
                className="p-2 bg-[#111] rounded"
                />

                <label className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    checked={s.enabled}
                    onChange={(e) => {
                    const updated = socials.map((item) =>
                        item.id === s.id
                        ? {
                            ...item,
                            enabled: e.target.checked,
                            }
                        : item
                    );

                    setSocials(updated);
                    }}
                />

                Enabled
                </label>

                <button
                onClick={async () => {

                    await axios.put(
                    `http://localhost:5000/social-links/${s.id}`,
                    s,
                    {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                    }
                    );

                    // alert("Updated");
                    toast.success("Social icons updated");
                }}
                className="bg-[#00ADB5] py-2 rounded"
                >
                Save
                </button>

            </div>
            ))}
        </div>
    );
}

export default SocialsTab;