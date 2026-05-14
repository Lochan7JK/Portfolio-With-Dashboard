// src/App.jsx

import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "@fontsource/poppins";
import "@fontsource/inter";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>


      <ToastContainer 
          position="top-right"
          autoClose={3000}
          theme="dark"

          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
        />

      </>
  );
}

export default App;