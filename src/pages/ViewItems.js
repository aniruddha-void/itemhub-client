import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewItems() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get("https://itemhub-server-2.onrender.com/api/items")
      .then(res => setItems(res.data))
      .catch(err => console.error("Error fetching items:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">🛍️ View Items</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map(item => (
          <div
            key={item._id}
            onClick={() => setSelected(item)}
            className="bg-white shadow-lg p-4 rounded-lg cursor-pointer hover:scale-105 transition-transform w-64"
          >
            <img
              src={`https://itemhub-server-2.onrender.com/${item.coverImage}`}
              alt="cover"
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 font-semibold text-center">{item.name}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <p className="text-gray-600 mb-2">{selected.type}</p>
            <p className="mb-4">{selected.description}</p>
            <div className="flex overflow-x-auto space-x-2 mb-4">
              {selected.images.map((img, i) => (
                <img
                  key={i}
                  src={`https://itemhub-server-2.onrender.com/${img}`}
                  alt={`extra-${i}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={() => alert('Email sent (simulated)')}
              >
                Enquire
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewItems;
