import { useEffect, useState } from "react";
import axios from "axios";
// import api from "../utils/apiToken";
// const res = await api.get("/projects");

function MinorProjectsTab() {
    const [minorProjects, setMinorProjects] = useState([]);
    const [showMinorModal, setShowMinorModal] = useState(false);
    const [editingMinorId, setEditingMinorId] = useState(null);

    const [minorForm, setMinorForm] = useState({
        title: "",
        description: "",
        image_url: "",
        live_url: "",
    });

    const token = localStorage.getItem("token");


    // 🔹 Fetch practice projects 
    const fetchMinorProjects = async () => {
        try {
            // const res = await axios.get("http://localhost:5000/minor-projects");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/minor-projects`);
            setMinorProjects(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchMinorProjects();
    }, []);



    const handleMinorChange = (e) => {
        setMinorForm({
            ...minorForm,
            [e.target.name]: e.target.value
        });
    };

    const handleMinorSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingMinorId) {

            await axios.put(
                // `http://localhost:5000/minor-projects/${editingMinorId}`,
                `${import.meta.env.VITE_API_URL}/minor-projects/${editingMinorId}`,
                minorForm,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );

            } else {

            await axios.post(
                // "http://localhost:5000/minor-projects",
                `${import.meta.env.VITE_API_URL}/minor-projects`,
                minorForm,
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                }
            );
            }

            fetchMinorProjects();
            setShowMinorModal(false);
            setEditingMinorId(null);
            
            setMinorForm({
                title: "",
                description: "",
                image_url: "",
                live_url: "",
            });

        } catch (err) {
            console.log(err);
        }
    };

    const deleteMinorProject = async (id) => {
        try {
            await axios.delete(
            // `http://localhost:5000/minor-projects/${id}`,
            `${import.meta.env.VITE_API_URL}/minor-projects/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`
                }
            }
            );

            fetchMinorProjects();

        } catch (err) {
            console.log(err);
        }
    };

    return ( 
        <>
                <h1 className="text-3xl mb-6 font-semibold">Practice Projects</h1>

                <button
                    onClick={() => {
                        setShowMinorModal(true);

                        setEditingMinorId(null);

                        setMinorForm({
                            title: "",
                            description: "",
                            image_url: "",
                            live_url: "",
                        });
                    }}
                    className="
                        bg-[#00ADB5]
                        px-5
                        py-2
                        rounded-lg
                        mb-5
                    "
                    >
                    Add Project
                </button>



                {showMinorModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div  className="bg-[#222] w-full max-w-2xl rounded-2xl p-6 relative">

                    {/* CLOSE */}
                    <button onClick={() => setShowMinorModal(false)} className=" absolute top-4 right-4 text-2xl" >
                        ✕
                    </button>

                     <h2 className="text-2xl mb-5">
                        {editingMinorId ? "Edit Project" : "Add Project"}
                    </h2>


                    <form
                        onSubmit={(e) => {
                            handleMinorSubmit(e);
                            setShowMinorModal(false);
                        }}
                        className="bg-[#222] p-4 rounded-xl flex flex-col gap-3"
                    >

                    <input
                        name="title"
                        placeholder="Title"
                        value={minorForm.title}
                        onChange={handleMinorChange}
                        className="p-2 bg-[#111] rounded"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={minorForm.description}
                        onChange={handleMinorChange}
                        className="p-2 bg-[#111] rounded"
                    />
                        

                    <input
                        name="image_url"
                        placeholder="/images/project.png"
                        value={minorForm.image_url}
                        onChange={handleMinorChange}
                        className="p-2 bg-[#111] rounded"
                    />

                    <input
                        name="live_url"
                        placeholder="Live URL"
                        value={minorForm.live_url}
                        onChange={handleMinorChange}
                        className="p-2 bg-[#111] rounded"
                    />

                    <button className="bg-[#00ADB5] py-2 rounded">
                        {editingMinorId ? "Update" : "Add"}
                    </button>

                    </form>

                </div>
            </div>
        )}



                {/* PRACTICE PROJECT LIST */}
                <div className="grid gap-4 mt-5">
                {minorProjects.map((p) => (
                    
                    <div key={p.id} className="bg-[#222] p-4 rounded-xl flex flex-col md:flex-row gap-5 items-start">

                    <img
                        src={p.image_url}
                        className="w-full md:w-52 h-40 object-cover rounded-xl flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                        <h2>{p.title}</h2>
                        <p className="text-sm text-gray-300">{p.description}</p>

                        <div className="flex gap-3 mt-3">

                             <a href={p.live_url} target="_blank" rel="noopener noreferrer">
                                <button className="bg-primary px-3 py-1 rounded hover:bg-white/10">
                                    Visit
                                </button>
                            </a>

                            <button
                            onClick={() => {
                                setEditingMinorId(p.id);

                                setShowMinorModal(true);

                                setMinorForm({
                                    title: p.title,
                                    description: p.description,
                                    image_url: p.image_url,
                                    live_url: p.live_url,
                                });
                            }}
                            className="bg-yellow-500 px-3 py-1 rounded hover:bg-white/10"
                            >
                            Edit
                            </button>

                            <button
                            onClick={() => deleteMinorProject(p.id)}
                            className="bg-red-500 px-3 py-1 rounded"
                            >
                            Delete
                            </button>

                        </div>
                    </div>

                    </div>
                ))}
                </div>

                </>
    );
}

export default MinorProjectsTab;
