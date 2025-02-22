import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Both fields are required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email.");
            return;
        }

        setError("");
        onLogin();
        navigate("/dashboard");
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during sign-in:", error);
            setError("Failed to sign in with Google. Try again.");
        }
    };

    return (
        <div className="bg-white bg-opacity-80 rounded-lg shadow-xl p-8 max-w-md w-full mx-auto mt-24 backdrop-blur-md">
            <h2 className="text-4xl font-semibold mb-6 text-center text-gray-900">Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-medium mb-2">E-Mail</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {console.log(email)}
                <div className="mb-6">
                    <label className="block text-gray-700 text-lg font-medium mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Login
                </button>
            </form>

            <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
                onClick={handleGoogleSignIn}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            >
                Login with Google
            </button>

            <p className="text-center mt-6 text-gray-600">
                Do not have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline font-medium">
                    Register here
                </a>
            </p>
        </div>
    );
};

export default Login;
