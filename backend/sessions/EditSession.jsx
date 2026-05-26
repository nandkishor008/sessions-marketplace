import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../api/axios";

import toast from "react-hot-toast";

const EditSession = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

      const res = await API.get(
        `/sessions/${id}/`
      );

      setFormData(res.data);

    } catch (error) {

      toast.error("Failed to load session");
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await API.put(
        `/sessions/update/${id}/`,
        formData
      );

      toast.success("Session updated");

      navigate(`/sessions/${id}`);

    } catch (error) {

      toast.error("Update failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-2xl w-[700px]"
      >

        <h1 className="text-4xl font-bold mb-8">
          Edit Session
        </h1>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4 h-32"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="number"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button
          className="
            bg-black
            text-white
            px-8
            py-4
            rounded-2xl
            w-full
            text-lg
          "
        >
          {loading ? "Updating..." : "Update Session"}
        </button>

      </form>

    </div>
  );
};

export default EditSession;