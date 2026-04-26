import React from 'react'
import { useState } from 'react'
import api from '../api/config';
import { useAuth } from '../context/AuthContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginPayload = {
            email,
            password
        };

        const response = await api.post('/auth/login', loginPayload);

        if (response.status === 200) {
            const { accessToken, refreshToken, userId } = response.data.data;
            login(accessToken, refreshToken, userId);


            setError('');

            // Redirect to users page or show success message
        } else {
            // Handle login error (e.g., show error message)
            setError('Invalid email or password');
        }



    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <form className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                        <p className="text-gray-500 mt-2">Login to your account</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="flex">
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                            Register
                        </span>
                    </p>
                </form>
            </div>

        </>
    )
}

export default LoginPage