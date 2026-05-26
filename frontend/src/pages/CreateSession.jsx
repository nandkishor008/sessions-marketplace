import {
  useState,
} from "react";

import {
  createSession,
} from "../api/sessionApi";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

const CreateSession = () => {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      title: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      image: "",
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // VALIDATION

  const validateForm = () => {

    // TITLE

    if (
      formData.title
        .trim()
        .length < 5
    ) {

      toast.error(
        "Title must be at least 5 characters"
      );

      return false;
    }

    // DESCRIPTION

    if (
      formData.description
        .trim()
        .length < 20
    ) {

      toast.error(
        "Description too short"
      );

      return false;
    }

    // PRICE

    if (
      Number(formData.price) <= 0
    ) {

      toast.error(
        "Price must be greater than 0"
      );

      return false;
    }

    // DURATION

    if (
      Number(formData.duration) <= 0
    ) {

      toast.error(
        "Duration must be greater than 0"
      );

      return false;
    }

    // IMAGE

    if (
      !formData.image.startsWith(
        "http"
      )
    ) {

      toast.error(
        "Enter valid image URL"
      );

      return false;
    }

    return true;
  };

  // SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {

      return;
    }

    try {

      await createSession(
        formData
      );

      toast.success(
        "🎉 Session created successfully"
      );

      navigate("/my-sessions");

    } catch (error) {

      toast.error(
        "Error creating session"
      );
    }
  };

  return (
    <div className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-gray-100
      dark:bg-black
      px-4
      py-10
      transition
    ">

      <form
        onSubmit={handleSubmit}
        className="
          relative
          bg-white
          dark:bg-white/10
          backdrop-blur-2xl
          border
          border-gray-300
          dark:border-white/20
          p-10
          rounded-3xl
          shadow-2xl
          w-full
          max-w-2xl
          transition
        "
      >

        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={() =>
            navigate(-1)
          }
          className="
            absolute
            top-5
            right-5
            w-12
            h-12
            rounded-full
            bg-gray-200
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            text-2xl
            font-bold
            hover:bg-red-500
            hover:text-white
            transition
          "
        >
          ×
        </button>

        {/* TITLE */}

        <h1 className="
          text-5xl
          font-black
          text-black
          dark:text-white
          mb-8
          transition
        ">
          Create Session
        </h1>

        {/* TITLE INPUT */}

        <input
          type="text"
          name="title"
          placeholder="Session Title"
          value={formData.title}
          className="
            w-full
            bg-gray-100
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-300
            p-4
            mb-4
            rounded-2xl
            outline-none
            transition
          "
          onChange={handleChange}
        />

        {/* DESCRIPTION */}

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={formData.description}
          className="
            w-full
            bg-gray-100
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-300
            p-4
            mb-4
            rounded-2xl
            outline-none
            transition
          "
          onChange={handleChange}
        />

        {/* PRICE */}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          className="
            w-full
            bg-gray-100
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-300
            p-4
            mb-4
            rounded-2xl
            outline-none
            transition
          "
          onChange={handleChange}
        />

        {/* DURATION */}

        <input
          type="number"
          name="duration"
          placeholder="Duration in Minutes"
          value={formData.duration}
          className="
            w-full
            bg-gray-100
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-300
            p-4
            mb-4
            rounded-2xl
            outline-none
            transition
          "
          onChange={handleChange}
        />

        {/* CATEGORY */}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          className="
            w-full
            bg-gray-100
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-300
            p-4
            mb-4
            rounded-2xl
            outline-none
            transition
          "
          onChange={handleChange}
        />

        {/* IMAGE */}

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          className="
            w-full
            bg-gray-100
            dark:bg-white/10
            border
            border-gray-300
            dark:border-white/20
            text-black
            dark:text-white
            placeholder-gray-500
            dark:placeholder-gray-300
            p-4
            mb-6
            rounded-2xl
            outline-none
            transition
          "
          onChange={handleChange}
        />

        {/* SUBMIT */}

        <button
          className="
            w-full
            bg-black
            dark:bg-white
            text-white
            dark:text-black
            py-4
            rounded-2xl
            text-lg
            font-black
            hover:scale-105
            transition
          "
        >
          Create Session
        </button>

      </form>

    </div>
  );
};

export default CreateSession;