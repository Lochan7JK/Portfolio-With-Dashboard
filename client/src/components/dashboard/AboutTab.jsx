import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import api from "../utils/apiToken";
// const res = await api.get("/about");

function AboutTab() {

    const [loading, setLoading] = useState(true);

    const [about, setAbout] = useState({
        intro: "",
        description: "",
        resume_url: ""
    });
    
    const token = localStorage.getItem("token");

    // 🔹 Fetch about
    const fetchAbout = async () => {
        try {
            // const res = await axios.get("http://localhost:5000/about");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/about`);
            setAbout(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAbout();
    }, []);


    const handleAboutUpdate = async () => {
        try {
            // await axios.put("http://localhost:5000/about", about, {
            await axios.put(`${import.meta.env.VITE_API_URL}/about`, about, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

            // alert("Updated!");
            toast.success("About section updated");
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) {
    return (
        <div className="text-white">
        Loading...
        </div>
    );
    }

    return (
            <div className="space-y-6">

                <h1 className="text-3xl mb-6 font-semibold">About</h1>

                <div className="bg-[#222] p-4 rounded-xl flex flex-col gap-3">
                    
                    <input
                    value={about.intro}
                    onChange={(e) => setAbout({...about, intro: e.target.value})}
                    placeholder="Intro"
                    className="p-2 bg-[#111]"
                    />

                    <textarea
                    value={about.description}
                    onChange={(e) => setAbout({...about, description: e.target.value})}
                    placeholder="Description"
                    className="p-2 bg-[#111] overflow-y-auto min-h-45"
                    style={{ /* Hide scrollbar for WebKit-based browsers and still moving scrollbar*/
                        scrollbarWidth: 'none',       /* Firefox */
                        msOverflowStyle: 'none',      /* IE/Edge */
                    }}
                    />

                    <input
                    value={about.resume_url}
                    onChange={(e) => setAbout({...about, resume_url: e.target.value})}
                    placeholder="Resume URL"
                    className="p-2 bg-[#111]"
                    />

                    <button
                    onClick={handleAboutUpdate}
                    className="bg-[#00ADB5] py-2 rounded"
                    >
                    Update About
                    </button>

                </div>

            </div>
    )

}

export default AboutTab;

