import React from 'react'
import useUsers from '../hooks/useUsers'
import { useState } from 'react'

const UsersPage = () => {
  const { users, loading, error, fetchUsers, addUser } = useUsers();
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = () => {
    addUser(newUser);
    setNewUser({ name: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          User Management
        </h1>

        {/* Form */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={newUser.name}
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

          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
          >
            Add User
          </button>
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
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-3">{user.id}</td>
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>

                  <td className="px-4 py-3 text-center">
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