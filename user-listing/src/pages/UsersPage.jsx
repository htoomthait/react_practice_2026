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
    <div>
      <h1 className="text-2xl font-bold underline text-blue-600">User List</h1>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h2>Add New User</h2>
      <div > 
        <div >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
      </div>
      </div>
      

      <button onClick={handleAddUser}>Add User</button>
    </div>
  )
}

export default UsersPage