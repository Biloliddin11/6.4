import React, { useState } from "react";

const List = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    profession: "",
    gender: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      
      const updatedUsers = [...users];
      updatedUsers[editIndex] = formData;
      setUsers(updatedUsers);
      setIsEditing(false);
      setEditIndex(null);
    } else {

      setUsers((prev) => [...prev, formData]);
    }
    setFormData({
      firstName: "",
      lastName: "",
      age: "",
      profession: "",
      gender: "",
      bio: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Fixed Form Section */}
      <div className="fixed top-0 left-0 bg-white w-80 p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit User" : "Enter Your Details"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["firstName", "lastName", "age", "profession", "gender", "bio"].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field !== "bio" ? (
                <input
                  type={field === "age" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field}`}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder="Write a short bio..."
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600"
          >
            {isEditing ? "Save" : "Submit"}
          </button>
        </form>
      </div>

      {/* Cards Section */}
      <div className="ml-80 p-6 flex flex-wrap gap-4">
        {users.map((user, index) => (
          <div key={index} className="w-64 bg-blue-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-blue-600 mb-4">User Card</h3>
            <div className="space-y-2">
              {Object.entries(user).map(([key, value]) => (
                <p key={key} className="text-sm text-gray-600">
                  <span className="font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span>{" "}
                  {value}
                </p>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                type="button"
                onClick={() => handleEdit(index)}
                className="py-2 px-4 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
