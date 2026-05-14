import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }


// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <p className="text-white">Loading...</p>;
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }


export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
