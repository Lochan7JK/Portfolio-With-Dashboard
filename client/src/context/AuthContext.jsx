// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//    const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true);

//     const fetchUser = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         setLoading(false);
//         return;
//     }

//     try {
//         const res = await axios.get("http://localhost:5000/auth/me", {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         });

//         setUser(res.data);
//     } catch {
//         localStorage.removeItem("token");
//         setUser(null);
//     } finally {
//         setLoading(false);
//     }
//     };

//     useEffect(() => {
//         fetchUser();
//     }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 important

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // const res = await axios.get("http://localhost:5000/auth/me", {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (err) {
        console.log("Auth error:", err);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false); // 🔥 critical
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
