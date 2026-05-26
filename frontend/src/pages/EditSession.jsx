import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import toast from "react-hot-toast";

import API from "../api/axios";

const EditSession = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      price: "",
      duration: "",
      image: "",
    });

  useEffect(() => {

    fetchSession();

  }, []);

  const fetchSession = async () => {

    try {

      const res =
        await API.get(
          `/sessions/${id}/`
        );

      setFormData({

        title:
          res.data.title || "",

        description:
          res.data.description || "",

        category:
          res.data.category || "",

        price:
          res.data.price || "",

        duration:
          res.data.duration || "",

        image:
          res.data.image || "",
      });

    } catch (error) {

      toast.error(
        "Failed to load session"
      );

      navigate("/sessions");
    }

    setFetching(false);
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // VALIDATION

  const validateForm = () => {

    if (
      formData.title.trim().length < 3
    ) {

      toast.error(
        "Title must be at least 3 characters"
      );

      return false;
    }

    if (
      Number(formData.price) <= 0
    ) {

      toast.error(
        "Price must be greater than 0"
      );

      return false;
    }

    if (
      Number(formData.duration) <= 0
    ) {

      toast.error(
        "Duration must be greater than 0"
      );

      return false;
    }

    if (
      !formData.image.trim()
    ) {

      toast.error(
        "Image URL is required"
      );

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {

      return;
    }

    setLoading(true);

    try {

      await API.put(

        `/sessions/update/${id}/`,

        formData
      );

      toast.success(
        "Session updated successfully"
      );

      navigate(
        `/sessions/${id}`
      );

    } catch (error) {

      toast.error(
        "Update failed"
      );
    }

    setLoading(false);
  };

  if (fetching) {

    return (
      <div className="
        min-h-screen

        flex
        justify-center
        items-center

        bg-gray-100

        dark:bg-[#0b1120]

        text-black
        dark:text-white

        text-4xl
        md:text-5xl

        font-black
      ">
        Loading...
      </div>
    );
  }

  return (
    <div className="
      min-h-screen

      bg-gray-100

      dark:bg-[#0b1120]

      dark:bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),transparent_30%)]

      py-10

      px-4
      md:px-6

      transition
    ">

      <motion.div
        initial={{
          opacity: 0,
          y: 60,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          max-w-5xl
          mx-auto

          bg-white
          dark:bg-white/5

          border
          border-gray-300
          dark:border-white/10

          rounded-[30px]
          md:rounded-[40px]

          shadow-2xl

          overflow-hidden

          backdrop-blur-xl

          transition
        "
      >

        {/* IMAGE */}

        <div className="
          w-full

          h-[250px]
          md:h-[400px]

          overflow-hidden
        ">

          <img
            src={
              formData.image ||

              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            }

            alt="Preview"

            className="
              w-full
              h-full

              object-cover
            "
          />

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            p-5
            md:p-10
          "
        >

          <div className="
            flex
            justify-between
            items-center

            mb-8
          ">

            <h1 className="
              text-3xl
              md:text-5xl

              font-black

              text-black
              dark:text-white
            ">
              Edit Session
            </h1>

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/sessions/${id}`
                )
              }
              className="
                w-12
                h-12

                rounded-full

                bg-gray-200
                dark:bg-white/10

                text-xl

                hover:scale-110

                transition
              "
            >
              ✕
            </button>

          </div>

          {/* TITLE */}

          <div className="
            mb-6
          ">

            <label className="
              block

              mb-2

              font-bold

              text-black
              dark:text-white
            ">
              Session Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="
                w-full

                bg-gray-100
                dark:bg-white/5

                border
                border-gray-300
                dark:border-white/10

                text-black
                dark:text-white

                p-4

                rounded-2xl

                outline-none

                focus:border-purple-500

                transition
              "
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="
            mb-6
          ">

            <label className="
              block

              mb-2

              font-bold

              text-black
              dark:text-white
            ">
              Description
            </label>

            <textarea
              name="description"
              value={
                formData.description
              }
              onChange={handleChange}
              placeholder="Enter description"
              className="
                w-full

                h-40

                bg-gray-100
                dark:bg-white/5

                border
                border-gray-300
                dark:border-white/10

                text-black
                dark:text-white

                p-4

                rounded-2xl

                outline-none

                focus:border-purple-500

                transition
              "
              required
            />

          </div>

          {/* CATEGORY */}

          <div className="
            mb-6
          ">

            <label className="
              block

              mb-2

              font-bold

              text-black
              dark:text-white
            ">
              Category
            </label>

            <select
              name="category"
              value={
                formData.category
              }
              onChange={handleChange}
              className="
                w-full

                bg-gray-100
                dark:bg-white/5

                border
                border-gray-300
                dark:border-white/10

                text-black
                dark:text-white

                p-4

                rounded-2xl

                outline-none

                focus:border-purple-500

                transition
              "
            >

              <option value="">
                Select Category
              </option>

              <option value="Programming">
                Programming
              </option>

              <option value="AI">
                AI
              </option>

              <option value="Design">
                Design
              </option>

              <option value="Business">
                Business
              </option>

              <option value="DSA">
                DSA
              </option>

            </select>

          </div>

          {/* PRICE + DURATION */}

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2

            gap-6

            mb-6
          ">

            <div>

              <label className="
                block

                mb-2

                font-bold
              ">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="
                  w-full

                  bg-gray-100
                  dark:bg-white/5

                  border
                  border-gray-300
                  dark:border-white/10

                  p-4

                  rounded-2xl

                  outline-none

                  focus:border-purple-500
                "
                required
              />

            </div>

            <div>

              <label className="
                block

                mb-2

                font-bold
              ">
                Duration (mins)
              </label>

              <input
                type="number"
                name="duration"
                value={
                  formData.duration
                }
                onChange={handleChange}
                className="
                  w-full

                  bg-gray-100
                  dark:bg-white/5

                  border
                  border-gray-300
                  dark:border-white/10

                  p-4

                  rounded-2xl

                  outline-none

                  focus:border-purple-500
                "
                required
              />

            </div>

          </div>

          {/* IMAGE */}

          <div className="
            mb-10
          ">

            <label className="
              block

              mb-2

              font-bold
            ">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
              className="
                w-full

                bg-gray-100
                dark:bg-white/5

                border
                border-gray-300
                dark:border-white/10

                p-4

                rounded-2xl

                outline-none

                focus:border-purple-500
              "
              required
            />

          </div>

          {/* BUTTONS */}

          <div className="
            flex
            flex-col
            sm:flex-row

            gap-4
          ">

            <button
              type="submit"
              disabled={loading}
              className="
                flex-1

                bg-gradient-to-r
                from-purple-500
                to-blue-500

                text-white

                py-4

                rounded-2xl

                text-lg

                font-black

                hover:scale-[1.02]

                transition

                disabled:opacity-50
              "
            >

              {loading

                ? "Updating..."

                : "Update Session"}

            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/sessions/${id}`
                )
              }
              className="
                flex-1

                bg-gray-300
                dark:bg-white/10

                text-black
                dark:text-white

                py-4

                rounded-2xl

                text-lg

                font-black

                hover:opacity-80

                transition
              "
            >
              Cancel
            </button>

          </div>

        </form>

      </motion.div>

    </div>
  );
};

export default EditSession;