import React, { use } from 'react'
import useUsers from '../hooks/useUsers'
import { useState } from 'react'

const UsersPage = () => {

  // Get users and related functions from the custom hook
  const { users, loading, error, fetchUsers, addUser, deleteUser, updateUser } = useUsers();

  // New user state for the form
  const [newUser, setNewUser] = useState({ fullname: '', email: '' });

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editUser, setEditUser] = useState({
    fullname: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    newUser.phoneNumber = "123-456-7890"; // Add a default phone number
    newUser.address = "123 Main St, Anytown, USA"; // Add a default address
    newUser.dob = "1990-01-01"; // Add a default date of birth
    newUser.role = "USER"; // Add a default role
    newUser.password = "abcabc123"; // Add a default password

    addUser(newUser);
    setNewUser({ fullname: '', email: '' });
    setShowForm(false);
  };

  const handleEditButtonClick = (user) => {
    console.log('Editing user:', user);
    setEditingId(user.id);
    setNewUser({ fullname: user.fullname, email: user.email });
    setShowForm(true);
  }

  const handleUpdateUser = (id) => {
    newUser.phoneNumber = "123-456-7890"; // Add a default phone number
    newUser.address = "123 Main St, Anytown, USA"; // Add a default address
    newUser.dob = "1990-01-01"; // Add a default date of birth
    updateUser(id, newUser);
    setEditingId(null);
    setNewUser({ fullname: '', email: '' });
  }

  const handleShowForm = () => {
    setShowForm(!showForm);
    setEditingId(null);
    setNewUser({ fullname: '', email: '' });
  }




  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>

        <button
          onClick={handleShowForm}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "Hide Form" : "Show Form"}
        </button>
        {/* Form */}
        <div
          className={`mt-4 overflow-hidden transition-all duration-700 ease-in-out ${showForm
            ? "max-h-96 opacity-100 mb-6"
            : "max-h-0 opacity-0"
            }`}
        >
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border">
            <input
              type="text"
              name="fullname"
              placeholder="Enter Full Name"
              value={newUser.fullname}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={newUser.email}
              onChange={handleInputChange}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {editingId ? (
              <button
                onClick={() => handleUpdateUser(editingId)}
                className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
              >
                Update User
              </button>
            ) : (
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
              >
                Add User
              </button>
            )}
          </div>
        </div>

        {/* Status */}
        {loading && (
          <p className="text-blue-600 mb-4">Loading users...</p>
        )}
        {error && (
          <p className="text-red-600 mb-4">{error}</p>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                >
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3 font-medium">{user.fullname}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleEditButtonClick(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersPage