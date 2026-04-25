import { useState, useEffect } from 'react';


// const API_URL = 'https://jsonplaceholder.typicode.com/users';
const API_URL = 'http://localhost:5400/users';

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
            setUsers(data.data);
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

            

            const response =  await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateduser)
            })

            if(!response.ok){
                throw new Error("Fail to update user");
            }

            const data = await response.json();

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, ...data.data } : user
                )
            );


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

            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if(!response.ok){
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