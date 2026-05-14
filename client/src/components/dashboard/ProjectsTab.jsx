import { useEffect, useState } from "react";
import axios from "axios";
// import api from "../utils/apiToken";
// const res = await api.get("/projects");

function ProjectsTab() {
    const [projects, setProjects] = useState([]);
    const [showMajorModal, setShowMajorModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        description: "",
        tech_stack: "",
        github_url: "",
        live_url: "",
        image_url: "",
    });

    const token = localStorage.getItem("token");

    // 🔹 Fetch projects 
    const fetchProjects = async () => {
        try {
        const res = await axios.get("http://localhost:5000/projects");
        setProjects(res.data);
        } catch (err) {
        console.log(err);
        }
    };

   useEffect(() => {
        fetchProjects();
    }, []);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
            // UPDATE
            await axios.put(
                `http://localhost:5000/projects/${editingId}`,
                {
                ...form,
                tech_stack: form.tech_stack.split(","),
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            } else {
            // ADD
            await axios.post(
                "http://localhost:5000/projects",
                {
                ...form,
                tech_stack: form.tech_stack.split(","),
                },
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            }

            fetchProjects();
            setShowMajorModal(false);
            setEditingId(null);

            setForm({
                title: "",
                description: "",
                tech_stack: "",
                github_url: "",
                live_url: "",
                image_url: "",
            });
        } catch (err) {
            console.log(err);
            alert(`Failed, please try again`);
        }
    };

    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:5000/projects/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        fetchProjects();
        } catch (err) {
        console.log(err);
        }
  };


    return ( 
         <>
                {/* your current project UI */}
                    <h1 className="text-3xl mb-6 font-semibold">Projects</h1>

                    <button
                        onClick={() => {
                            setShowMajorModal(true);

                            setEditingId(null);

                            setForm({
                                title: "",
                                description: "",
                                tech_stack: "",
                                github_url: "",
                                live_url: "",
                                image_url: "",
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


                    {/* ADD PROJECT */}
                    {showMajorModal && (
                    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" >

                        <div className="bg-[#222] w-full max-w-2xl rounded-2xl p-6 relative">
                            {/* CLOSE */}
                            <button onClick={() => setShowMajorModal(false)} className="absolute top-4 right-4 text-2xl">
                                ✕
                            </button>

                            <h2 className="text-2xl mb-5">
                                {editingId ? "Edit Project" : "Add Project"}
                            </h2>

                            <form
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                    setShowMajorModal(false);
                                }}
                                className="bg-[#222] p-4 rounded-xl flex flex-col gap-3 mb-8"
                            >
                                <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="p-2 bg-[#111] rounded" />
                                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="p-2 bg-[#111] rounded" />
                                <input name="tech_stack" placeholder="Tech (comma separated)" value={form.tech_stack} onChange={handleChange} className="p-2 bg-[#111] rounded" />
                                <input name="github_url" placeholder="GitHub URL" value={form.github_url} onChange={handleChange} className="p-2 bg-[#111] rounded" />
                                <input name="live_url" placeholder="Live URL" value={form.live_url} onChange={handleChange} className="p-2 bg-[#111] rounded" />
                                <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} className="p-2 bg-[#111] rounded" />

                                <button className="bg-[#00ADB5] py-2 rounded">
                                    {editingId ? "Update" : "Add"}
                                </button>
                            </form>

                         </div>
                    </div>
                    )}



                    {/* PROJECT LIST */}
                    <div className="grid gap-4">
                        {projects.map((p) => (
                        <div key={p.id} className="bg-[#222] p-4 rounded-xl">
                            <h2 className="text-lg font-semibold">{p.title}</h2>
                            <p className="text-sm text-gray-300">{p.description}</p>

                            <div className="flex gap-2 mt-2 flex-wrap">
                            {p.tech_stack?.map((tech, i) => (
                                <span key={i} className="text-xs bg-[#333] px-2 py-1 rounded">
                                {tech}
                                </span>
                            ))}
                            </div>

                            <div className="flex gap-4 mt-3">
                            <a href={p.github_url} target="_blank" rel="noreferrer">GitHub</a>
                            <a href={p.live_url} target="_blank" rel="noreferrer">Live</a>
                            </div>


                            <button
                                onClick={() => {
                                    setEditingId(p.id);
                                    setShowMajorModal(true);
                                    
                                    setForm({
                                        title: p.title,
                                        description: p.description,
                                        tech_stack: p.tech_stack.join(","),
                                        github_url: p.github_url,
                                        live_url: p.live_url,
                                        image_url: p.image_url,
                                    });
                                }}
                                className="bg-yellow-500 px-3 py-1 rounded mr-4"
                                >
                                Edit
                            </button>

                            <button
                            onClick={() => handleDelete(p.id)}
                            className="mt-3 bg-red-500 px-3 py-1 rounded"
                            >
                            Delete
                            </button>
                        </div>
                        ))}
                    </div>

                </>
    );
}

export default ProjectsTab;