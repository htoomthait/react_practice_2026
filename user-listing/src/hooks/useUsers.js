import { useState, useEffect } from 'react';
import api from '../api/config';



// const API_URL = 'https://jsonplaceholder.typicode.com/users';
const API_BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || 'http://localhost:5400';
const API_URL = `${API_BASE_URL}/users`;

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Fetch users from the API 
    const fetchUsers = async () => {
        
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/users');
            setUsers(response.data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // create new user
    const addUser = async (user) => {
        setLoading(true);
        try {
            const response = await api.post(API_URL, user);
            if (!response.status === 201) {
                throw new Error('Failed to create user');
            }
            // const newUser = await response.json();
            // console.log('New user created:', newUser.data);
            // setUsers((prevUsers) => [...prevUsers, newUser.data]);

            fetchUsers(); // Refresh the user list after adding a new user
        } catch (err) {
            setError(err.message);
        }finally {
            setLoading(false);
        }



        

    }

    // Update User

    const updateUser = async (id, updateduser) => {
        try {
            setError(null);
            setLoading(true);

            

            const response =  await api.put(`${API_URL}/${id}`, updateduser);
            

            if(!response.status === 200){
                throw new Error("Fail to update user");
            }

            const data = await response.data.data;

            // setUsers((prevUsers) =>
            //     prevUsers.map((user) =>
            //         user.id === id ? { ...user, ...data } : user
            //     )
            // );

            fetchUsers(); // Refresh the user list after updating a user


        } catch (err) {
            setError(err.message);
        }finally {
            setLoading(false);
        }
    }


    // Delete User
    const deleteUser = async (id) => {
        try{
            setError(null);
            setLoading(true);

            const response = await api.delete(`${API_URL}/${id}`);

            if(!response.status === 200){
                throw new Error("Fail to delete user");
            }

            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));


        }catch(err){
            setError(err.message);
        }finally {
            setLoading(false);
        }

    }

    useEffect(() => {
            fetchUsers();
        }, []);

    return { 
        users, 
        loading, 
        error, 
        fetchUsers, 
        addUser, 
        deleteUser,
        updateUser 
    };

}