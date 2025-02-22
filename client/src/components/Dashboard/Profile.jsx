import React from "react";
import { useAuth } from "../../authContext"; // Ensure this path is correct
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/"); // Redirect to login page after logout
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center max-w-md mx-auto mt-10">
            {/* Left Section: User Info */}
            <div>
                <h2 className="text-xl font-semibold">{user?.displayName || "User"}</h2>
                <p className="text-gray-600">{user?.email}</p>
            </div>

            {/* Right Section: Logout Button */}
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default Profile;
