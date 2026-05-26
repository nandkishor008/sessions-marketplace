import { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await login(formData.username, formData.password);

    setLoading(false);

    if (result.success) {
      toast.success("Login successful");

      if (result.user.role === "creator") {
        navigate("/creator-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div
      className="
      min-h-screen
      relative
      overflow-hidden
      flex
      justify-center
      items-center
      bg-black
      px-4
    "
    >
      {/* BACKGROUND IMAGE */}

      <img
        src="
https://images.unsplash.com/photo-1516321318423-f06f85e504b3
        "
        alt="background"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* OVERLAY */}

      <div
        className="
        absolute
        inset-0
        bg-black/70
      "
      />

      {/* ANIMATED BLOBS */}

      <div
        className="
        absolute
        w-96
        h-96
        bg-purple-500/30
        rounded-full
        blur-3xl
        top-10
        left-10
        animate-pulse
      "
      />

      <div
        className="
        absolute
        w-96
        h-96
        bg-blue-500/30
        rounded-full
        blur-3xl
        bottom-10
        right-10
        animate-pulse
      "
      />

      {/* FORM */}

      <motion.form
        initial={{
          opacity: 0,
          scale: 0.8,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        onSubmit={handleSubmit}
        className="
          relative
          z-10
          backdrop-blur-2xl
          bg-white/10
          border
          border-white/20
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
        "
      >
        <h1
          className="
          text-5xl
          font-bold
          text-white
          mb-3
          text-center
        "
        >
          Welcome Back
        </h1>

        <p
          className="
          text-gray-300
          text-center
          mb-8
        "
        >
          Login to continue
        </p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="
            w-full
            bg-white/10
            border
            border-white/20
            text-white
            placeholder-gray-300
            p-4
            mb-4
            rounded-2xl
            outline-none
          "
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="
            w-full
            bg-white/10
            border
            border-white/20
            text-white
            placeholder-gray-300
            p-4
            mb-6
            rounded-2xl
            outline-none
          "
          onChange={handleChange}
        />

        <button
          className="
            w-full
            bg-white
            text-black
            py-4
            rounded-2xl
            text-lg
            font-bold
            hover:scale-105
            transition
          "
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p
          className="
          text-center
          mt-6
          text-gray-300
        "
        >
          Don't have an account?
          <Link
            to="/register"
            className="
              text-white
              font-bold
              ml-2
            "
          >
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
