import React, { useState } from "react";
import axios from "axios";

function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: null,
    images: [],
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "coverImage") {
      setFormData({ ...formData, coverImage: files[0] });
    } else if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("type", formData.type);
    payload.append("description", formData.description);
    payload.append("coverImage", formData.coverImage);
    formData.images.forEach((img) => payload.append("images", img));

    try {
      await axios.post(
        "https://itemhub-server-2.onrender.com/api/items",
        payload
      );
      setSuccess(true);
      setFormData({
        name: "",
        type: "",
        description: "",
        coverImage: null,
        images: [],
      });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">➕ Add New Item</h2>

        {success && (
          <div className="mb-4 text-green-700 bg-green-100 px-4 py-2 rounded">
            ✅ Item successfully added!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="type"
            placeholder="Item Type (e.g. Shirt, Shoes)"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <div>
            <label className="block font-semibold mb-1">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white file:rounded hover:file:bg-blue-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Additional Images</label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gray-400 file:text-white file:rounded hover:file:bg-gray-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            ➕ Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
