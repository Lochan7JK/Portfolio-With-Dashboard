// src/components/Contact.jsx

import { useState } from "react";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";


function Contact() {
  const fireConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
  });
};

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation functions
  const validate = () => {
    let newErrors = {};

    // Name
    if (!form.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z]*\s{1}[A-Za-z]*$/.test(form.name)) {
      newErrors.name = "Write your full name";
    }

    // Phone
    if (form.phone && !/^[0-9]{10}$/.test(form.phone)) {
        newErrors.phone = "Enter valid 10 digit number";
    }
    // if (!form.phone) {
    //   newErrors.phone = "Phone no. is required";
    // } else if (!/^[0-9]{10}$/.test(form.phone)) {
    //   newErrors.phone = "Enter valid 10 digit number";
    // }

    // Email
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Za-z._\-[0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/.test(form.email)
    ) {
      newErrors.email = "Invalid email";
    }

    // Message
    if (form.message.length < 30) {
      newErrors.message = `${30 - form.message.length} more characters required`;
    }

    return newErrors;
  };

  // Submit handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const validationErrors = validate();
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     alert("Form submitted successfully 🚀");
  //   }
  // };


  //Submit handler frontend integration with backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      toast.warn("Please fix the errors first ⚠️");
      return;
    }

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      try {
        // const response = await fetch("http://localhost:5000/api/contact", {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (data.success) {
          // alert("Message sent successfully 🚀");
          toast.success("Message sent successfully 🚀");
          fireConfetti(); // 🔥 BOOM

          // reset form
          setForm({
            name: "",
            phone: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          // alert("Something went wrong ❌");
          toast.error("Something went wrong ❌");
        }
      } catch (error) {
        console.error(error);
        // alert("Server error ❌");
        toast.error("Server error ❌");

      }

      setLoading(false);
    }
  };


  //// For Polished UI/UX after submitting form instead of alert - NOT DOING THIS THING
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setSuccess("");
  //   setServerError("");

  //   const validationErrors = validate();
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0) {
  //     setLoading(true);

  //     try {
  //       const response = await fetch("http://localhost:5000/api/contact", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(form),
  //       });

  //       const data = await response.json();

  //       if (data.success) {
  //         setSuccess("Message sent successfully 🚀");

  //         setForm({
  //           name: "",
  //           phone: "",
  //           email: "",
  //           message: "",
  //         });
  //       } else {
  //         setServerError("Something went wrong ❌");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setServerError("Server error ❌");
  //     }

  //     setLoading(false);
  //   }
  // };
////


  return (
    <div className="relative z-10 min-h-screen py-10 px-5" id="contact-section">
      {/* bg-[#222831] */}

      {/* Heading before: font-chakra*/}
      <div className="text-center mb-8 mt-10">
        {/* <h1 className="text-[#EEEEEE] text-3xl font-poppins">Get in Touch ✈️</h1> */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-inter text-white relative inline-block">
            Get in Touch

            {/* underline */}
            <span className="absolute left-4 top-6 w-full h-4 -z-5 bg-primary"></span>
            
          </h1>
        </div>

        <p className="text-light font-poppins -mt-4">
          Have any question? Want to work together? Drop me a query or Leave your message.
        </p>
      </div>

      {/* Form */}
      <div className="flex justify-center mt-15 mr-4 ml-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-8 rounded-md shadow-lg relative transition duration-300"
        >
          {/* Icon */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-md text-primary hover:text-primary/85 text-2xl">
          {/* text-[#009e7a] */}
             <i class="fas fa-paper-plane"></i>
             {/* ✈️ */}
          </div>

          {/* Name */}
          <div className="flex items-center mb-4 mt-10 relative">
            <label className="w-1/3">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-2/3 border-b outline-none p-2 placeholder:italic placeholder:text-gray-400 text-sm"
              value={form.name}
              onChange={handleChange}
            />
            <span className="absolute right-0 text-sm text-red-500">
              {errors.name}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center mb-4 relative">
            <label className="w-1/3">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="1234567890 (Optional)"
              className="w-2/3 border-b outline-none p-2 placeholder:italic placeholder:text-gray-400 text-sm"
              value={form.phone}
              onChange={handleChange}
            />
            <span className="absolute right-0 text-sm text-red-500">
              {errors.phone}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center mb-4 relative">
            <label className="w-1/3">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-2/3 border-b outline-none p-2 placeholder:italic placeholder:text-gray-400 text-sm"
              value={form.email}
              onChange={handleChange}
            />
            <span className="absolute right-0 text-sm text-red-500">
              {errors.email}
            </span>
          </div>

          {/* Subject */}
          <div className="flex items-center mb-4 relative">
            <label className="w-1/3">Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              className="w-2/3 border-b outline-none p-2 placeholder:italic placeholder:text-gray-400 text-sm"
              value={form.subject}
              onChange={handleChange}
            />
            <span className="absolute right-0 text-sm text-red-500">
              {errors.subject}
            </span>
          </div>

          {/* Message */}
          <div className="flex items-start mb-4 relative">
            <label className="w-1/3">Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Enter your message"
              className="w-2/3 border-b outline-none p-2 placeholder:italic placeholder:text-gray-400 text-sm"
              value={form.message}
              onChange={handleChange}
            />
            <span className="absolute right-0 bottom-2 text-sm text-red-500">
              {errors.message}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-md block mt-6 mx-auto flex items-center justify-center gap-2 hover:opacity-85 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            // hover:bg-[#019ca3], bg-[#009e7a]
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loading ? "Sending..." : "Submit"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Contact;
