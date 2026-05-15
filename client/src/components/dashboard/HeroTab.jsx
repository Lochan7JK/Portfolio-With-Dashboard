import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import api from "../utils/apiToken";
// const res = await api.get("/projects");

function HeroTab() {   
    const [hero, setHero] = useState({
        name: "",
        tagline1: "",
        tagline2: "",
        roles: [],
        cta_text: "",
    });

    const token = localStorage.getItem("token");

    //🔹 Fetch hero 
    const fetchHero = async () => {
        try {

            const res = await axios.get(
            // "http://localhost:5000/hero"
            `${import.meta.env.VITE_API_URL}/hero`
            );

            setHero(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchHero();
    }, []);

    // Hero Update Function
    const updateHero = async () => {
        try {

            await axios.put(
            // "http://localhost:5000/hero",
            `${import.meta.env.VITE_API_URL}/hero`,
            hero,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            // alert("Hero Updated");
            toast.success("Hero section updated");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-[#222] p-5 rounded-xl flex flex-col gap-4">

            <input
            value={hero.name}
            onChange={(e) =>
                setHero({ ...hero, name: e.target.value })
            }
            placeholder="Name"
            className="p-3 bg-[#111] rounded"
            />

            <input
            value={hero.tagline1}
            onChange={(e) =>
                setHero({ ...hero, tagline1: e.target.value })
            }
            placeholder="Tagline 1"
            className="p-3 bg-[#111] rounded"
            />

            <input
            value={hero.tagline2}
            onChange={(e) =>
                setHero({ ...hero, tagline2: e.target.value })
            }
            placeholder="Tagline 2"
            className="p-3 bg-[#111] rounded"
            />

            <textarea
            value={hero.roles?.join(",")}
            onChange={(e) =>
                setHero({
                    ...hero,
                    roles: e.target.value.split(","),
                    // roles: e.target.value
                    // .split(",")
                    // .map((r) => r.trim())
                    // .filter(Boolean),
                })
            }
            placeholder="Roles comma separated"
            className="p-3 bg-[#111] rounded"
            />

            <input
            value={hero.cta_text}
            onChange={(e) =>
                setHero({ ...hero, cta_text: e.target.value })
            }
            placeholder="CTA Text"
            className="p-3 bg-[#111] rounded"
            />

            <button
            onClick={updateHero}
            className="bg-[#00ADB5] py-3 rounded"
            >
            Update Hero
            </button>

        </div>
    );
}

export default HeroTab;
