// Dashboard.jsx

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { FaBars, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import HeroTab from "../components/dashboard/HeroTab";
import AboutTab from "../components/dashboard/AboutTab";
import MinorProjectsTab from "../components/dashboard/MinorProjectsTab";
import ProjectsTab from "../components/dashboard/ProjectsTab";
import ContactTab from "../components/dashboard/ContactTab";
import SocialsTab from "../components/dashboard/SocialsTab";
import AnalyticsTab from "../components/dashboard/AnalyticsTab";

export default function Dashboard() {

  const navigate = useNavigate();

//   const [projects, setProjects] = useState([]);
//   const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState("contact");
//   const [minorProjects, setMinorProjects] = useState([]);

  const [contacts, setContacts] = useState([]);
//   const [selectedMessage, setSelectedMessage] = useState(null);

//   const [editingMinorId, setEditingMinorId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [showMinorModal, setShowMinorModal] = useState(false);
//   const [showMajorModal, setShowMajorModal] = useState(false);

//   const [minorForm, setMinorForm] = useState({
//       title: "",
//       description: "",
//       image_url: "",
//       live_url: "",
//   });


//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     tech_stack: "",
//     github_url: "",
//     live_url: "",
//     image_url: "",
//   });

   
  const token = localStorage.getItem("token");


  // 🔹 Fetch practice projects 
//   const fetchMinorProjects = async () => {
//     try {
//         const res = await axios.get("http://localhost:5000/minor-projects");
//         setMinorProjects(res.data);
//     } catch (err) {
//         console.log(err);
//     }
//    };

  // 🔹 Fetch projects 
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/projects");
//       setProjects(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//    useEffect(() => {
//         // fetchAbout();
//         fetchMinorProjects();
//         fetchProjects();
//     }, []);



//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         if (editingId) {
    //         // UPDATE
    //         await axios.put(
    //             `http://localhost:5000/projects/${editingId}`,
    //             {
    //             ...form,
    //             tech_stack: form.tech_stack.split(","),
    //             },
    //             {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             }
    //         );
    //         } else {
    //         // ADD
    //         await axios.post(
    //             "http://localhost:5000/projects",
    //             {
    //             ...form,
    //             tech_stack: form.tech_stack.split(","),
    //             },
    //             {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             }
    //         );
    //         }

    //         fetchProjects();
    //         setEditingId(null);
    //         setForm({
    //             title: "",
    //             description: "",
    //             tech_stack: "",
    //             github_url: "",
    //             live_url: "",
    //             image_url: "",
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         alert(`Failed, please try again`);
    //     }
    // };


//     const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/projects/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       fetchProjects();
//     } catch (err) {
//       console.log(err);
//     }
//   };



//   const handleMinorChange = (e) => {
//     setMinorForm({
//         ...minorForm,
//         [e.target.name]: e.target.value
//     });
//   };

//   const handleMinorSubmit = async (e) => {
//     e.preventDefault();

//     try {
//         if (editingMinorId) {

//         await axios.put(
//             `http://localhost:5000/minor-projects/${editingMinorId}`,
//             minorForm,
//             {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//             }
//         );

//         } else {

//         await axios.post(
//             "http://localhost:5000/minor-projects",
//             minorForm,
//             {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//             }
//         );
//         }

//         fetchMinorProjects();

//         setMinorForm({
//             title: "",
//             description: "",
//             image_url: "",
//             live_url: "",
//         });

//         setEditingMinorId(null);

//     } catch (err) {
//         console.log(err);
//     }
//   };


//   const deleteMinorProject = async (id) => {
//     try {
//         await axios.delete(
//         `http://localhost:5000/minor-projects/${id}`,
//         {
//             headers: {
//             Authorization: `Bearer ${token}`
//             }
//         }
//         );

//         fetchMinorProjects();

//     } catch (err) {
//         console.log(err);
//     }
//   };

    const fetchContacts = async () => {
        try {

        const res = await axios.get(
            // "http://localhost:5000/dashboard/contacts",
            `${import.meta.env.VITE_API_URL}/dashboard/contacts`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        setContacts(res.data);

        } catch (err) {
        console.log(err);
        }
    };

//   Load contacts on contact tab
    useEffect(() => {
        // fetchAbout();
        // fetchMinorProjects();
        // fetchProjects();
        fetchContacts();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const unreadCount = contacts.filter((c) => !c.is_read).length;

    
    return (
    <div className="h-screen overflow-hidden min-h-screen bg-[#191919] text-white p-6 flex relative flex-col md:flex-row">

        {/* MOBILE MENU BUTTON */}
        <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary p-3 rounded-lg"
        onClick={() => setSidebarOpen(true)}
        >
            <FaBars />
        </button>

        {/* OVERLAY */}
        {sidebarOpen && (
        <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
        />
        )}

         {/* SIDEBAR */}
        <aside
            className={`
                fixed lg:static top-0 left-0
                w-65 h-screen bg-black/40 backdrop-blur-xl
                border-r border-white/10 z-50
                transform transition-transform duration-300 flex flex-col
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}
        >
        
         {/* CLOSE BUTTON MOBILE */}
        <div className="lg:hidden flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
            <FaTimes size={22} />
            </button>
        </div>

        <div className="p-6 flex flex-col h-full">
            {/* <h1 className="text-2xl font-bold mb-10">
            Admin Panel
            </h1> */}

            <div className="flex flex-col gap-3">
                <button
                    // onClick={() => setActiveTab("contact")}
                    onClick={() => {
                        setActiveTab("analytics")
                        setSidebarOpen(false);
                    }}
                    className={`relative text-left px-4 py-3 rounded-lg transition ${
                        activeTab === "analytics"
                        ? "text-white"
                        // : "hover:bg-white/10"
                        : "text-white"
                    }`}
                    >
                    <h1 className="text-2xl font-bold">
                        Admin Panel
                    </h1>
                </button>

                <button
                    onClick={() => {
                    setActiveTab("hero");
                    setSidebarOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "hero"
                        ? "bg-primary text-white"
                        : "hover:bg-white/10"
                    }`}
                >
                    Intro
                </button>

                <button
                    onClick={() => {
                    setActiveTab("about");
                    setSidebarOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "about"
                        ? "bg-primary text-white"
                        : "hover:bg-white/10"
                    }`}
                >
                    About
                </button>

                <button
                    onClick={() => {
                    setActiveTab("minor-projects");
                    setSidebarOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "minor-projects"
                        ? "bg-primary text-white"
                        : "hover:bg-white/10"
                    }`}
                >
                Practice Projects
                </button>

                <button
                    onClick={() => {
                    setActiveTab("projects");
                    setSidebarOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-lg transition ${
                    activeTab === "projects"
                        ? "bg-primary text-white"
                        : "hover:bg-white/10"
                    }`}
                >
                    Major Projects
                </button>

                <button
                    // onClick={() => setActiveTab("contact")}
                    onClick={() => {
                        setActiveTab("contact");
                        setSidebarOpen(false);
                    }}
                    className={`relative text-left px-4 py-3 rounded-lg transition ${
                        activeTab === "contact"
                        ? "bg-primary text-white"
                        : "hover:bg-white/10"
                    }`}
                    >
                    Contacts

                    {unreadCount > 0 && (
                        <span className="absolute right-4 top-3 bg-red-500 text-xs px-2 py-1 rounded-full">
                        {unreadCount}
                        </span>
                    )}
                </button>


                <button
                    // onClick={() => setActiveTab("contact")}
                    onClick={() => {
                        setActiveTab("socials")
                        setSidebarOpen(false);
                    }}
                    className={`relative text-left px-4 py-3 rounded-lg transition ${
                        activeTab === "socials"
                        ? "bg-primary text-white"
                        : "hover:bg-white/10"
                    }`}
                    >
                    Social Icons
                </button>
            </div>

            {/* LOGOUT BUTTON */}
            <button
                onClick={handleLogout}
                className=" mt-auto flex items-center mb-6 justify-center gap-2 w-full bg-red-500/20 hover:bg-red-500 transition text-red-300 hover:text-white py-3 rounded-xl border border-red-500/20"
            >
                <FiLogOut />
                Logout
            </button>

        </div>
        </aside>

        
        {/* SIDEBAR */}
        {/* <div className="w-full md:w-72 bg-[#111] p-5 flex md:flex-col gap-4 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>
            <button className="hover:text-[#00ADB5]" onClick={() => setActiveTab("about")}>About</button>
            <button className="hover:text-[#00ADB5]" onClick={() => setActiveTab("minor-projects")}>Practice Projects</button>
            <button className="hover:text-[#00ADB5]" onClick={() => setActiveTab("projects")}>Projects</button>
            <button className="hover:text-[#00ADB5]" onClick={() => setActiveTab("contact")}>Contact</button>
        </div> */}


        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto overflow-hidden mt-8 lg:mt-0">

            {/* {activeTab === "hero" && <div>Hero section coming soon</div>} */}
            {/* {activeTab === "about" && <div>About section coming soon</div>} */}
            {/* {activeTab === "minor-projects" && <div>Practice Projects section coming soon</div>} */}
            {/* {activeTab === "projects" && <div>Projects section coming soon</div>} */}
            {/* {activeTab === "contact" && <div>Contact section coming soon</div>} */}

            {activeTab === "hero" && <HeroTab />}

            {activeTab === "about" && <AboutTab />}

            {activeTab === "minor-projects" && <MinorProjectsTab />}

            {activeTab === "projects" && <ProjectsTab />}

            {activeTab === "contact" && 
                <ContactTab 
                    contacts={contacts}
                    setContacts={setContacts}
                    fetchContacts={fetchContacts}
                />
            }

            {activeTab === "socials" && <SocialsTab />}

            {activeTab === "analytics" && <AnalyticsTab />}
    
        </div>

    </div>
    );
}
