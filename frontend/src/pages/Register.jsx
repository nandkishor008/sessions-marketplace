import { useState, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import { AuthContext } from "../context/AuthContext";

const Register = () => {

  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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

    // USERNAME VALIDATION

    if (
      formData.username.trim().length < 3
    ) {

      toast.error(
        "Username must be at least 3 characters"
      );

      return;
    }

    // EMAIL VALIDATION

    if (
      !formData.email.includes("@")
    ) {

      toast.error(
        "Enter valid email"
      );

      return;
    }

    // PASSWORD VALIDATION

    if (
      formData.password.length < 6
    ) {

      toast.error(
        "Password must be at least 6 characters"
      );

      return;
    }

    setLoading(true);

    const result = await register(formData);

    setLoading(false);

    if (result.success) {

      toast.success(
        "🎉 Registration successful"
      );

      navigate("/login");

    } else {

      toast.error(
        "Registration failed"
      );
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
https://images.unsplash.com/photo-1498050108023-c5249f4df085
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
          Create Account
        </h1>

        <p
          className="
          text-gray-300
          text-center
          mb-8
        "
        >
          Start your mentorship journey
        </p>

        {/* USERNAME */}

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

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        {/* PASSWORD */}

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
            mb-4
            rounded-2xl
            outline-none
          "
          onChange={handleChange}
        />

        {/* ROLE */}

        <select
          name="role"
          className="
            w-full
            bg-white/10
            border
            border-white/20
            text-white
            p-4
            mb-6
            rounded-2xl
            outline-none
          "
          onChange={handleChange}
        >

          <option
            value="user"
            className="text-black"
          >
            User
          </option>

          <option
            value="creator"
            className="text-black"
          >
            Creator
          </option>

        </select>

        {/* BUTTON */}

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
          {loading ? "Loading..." : "Register"}
        </button>

        {/* LOGIN */}

        <p
          className="
          text-center
          mt-6
          text-gray-300
        "
        >
          Already have an account?

          <Link
            to="/login"
            className="
              text-white
              font-bold
              ml-2
            "
          >
            Login
          </Link>

        </p>

      </motion.form>

    </div>
  );
};

export default Register;