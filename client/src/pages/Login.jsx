// Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      console.log("Login success:", res.data);
      localStorage.setItem("token", res.data.token);

    //   window.location.href = "/dashboard";
       navigate("/dashboard");

    } catch(err) {
    //   alert("Login failed");
        toast.error(err.response?.data?.message || "Login failed");
    }
  };


  // Google OAuth Success Handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {

      const res = await axios.post(
        "http://localhost:5000/auth/google",
        {
          credential: credentialResponse.credential,
        }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
    }
  };

  // const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       const res = await axios.post(
  //         "http://localhost:5000/auth/google",
  //         {
  //           access_token: tokenResponse.access_token,
  //         }
  //       );

  //       localStorage.setItem("token", res.data.token);

  //       navigate("/dashboard");

  //     } catch (err) {
  //       console.log(err);
  //       // alert("Google login failed");
  //       toast.error("Google login failed ❌");
  //     }
  //   },
  // });


  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-[#191919] text-white">
      <form
        onSubmit={handleLogin}
        className="
            p-8 rounded-xl shadow-lg w-78 
            flex flex-col gap-4
          bg-[#222] border border-white/10
            hover:border-primary
            hover:bg-primary/10
            transition-all duration-300
            text-white font-medium
            group"
      >
        <h2 className="text-xl font-semibold text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-[#111] border border-gray-600"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-[#111] border border-gray-600"
          onChange={(e) => setPassword(e.target.value)}
        /> */}

        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="p-2 rounded bg-[#111] border border-gray-600 w-full"
                onChange={(e) => setPassword(e.target.value)}
            />

            <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? "🙈" : "👁️"}
            </span>
        </div>

        <button className="bg-primary py-2 rounded hover:opacity-80">
          Login
        </button>
      </form>

      {/* Google Login Button */}
        <div
         className="w-78 overflow-hidden rounded-xl border border-white/10 hover:border-[#00ADB5] transition-all duration-300">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Google Login Failed")}
            theme="outline"
            shape="rectangular"
            size="large"
            text="continue_with"
            width="312"
          />
        </div>

        {/* <button
          type="button"
          onClick={() => login()}
          className="
            flex items-center justify-center gap-3
            w-78 py-3 rounded-xl
            bg-white/5 border border-white/10
            hover:border-primary
            hover:bg-primary/10
            transition-all duration-300
            text-white font-medium
            group
          "
        >
          <FcGoogle className="text-2xl group-hover:scale-110 transition" />

          <span>
            Sign in with Google
          </span>
        </button> */}

    </div>
  );
}