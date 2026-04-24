import { useState, useEffect } from 'react';


const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch users from the API 
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // create new user
    const addUser = async (user) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
            const newUser = await response.json();
            setUsers((prevUsers) => [...prevUsers, newUser]);
        } catch (err) {
            setError(err.message);
        }


        

    }


    // Delete User
    const deleteUser = async (id) => {
        try{
            setError(null);

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if(!response.ok){
                throw new Error("Fail to delete user");
            }

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));


        }catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
            fetchUsers();
        }, []);

    return { users, loading, error, fetchUsers, addUser, deleteUser };

}