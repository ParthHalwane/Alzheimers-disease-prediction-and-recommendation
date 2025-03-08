import React, { useState } from "react";
import Form from "./Form";
import Tips from "./Tips";
import Exercise from "./Exercise";
import About from "./About";
import Profile from "./Profile";
import Home from "./Home";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("home");

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="bg-gray-800 text-white w-64 p-4 space-y-4">
                <h2 className="text-xl font-bold mb-4">Alzheimer's Prediction</h2>
                <nav className="space-y-2">
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "home" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("home")}
                    >
                        Home
                    </button>
                    {/* <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "history" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("history")}
                    >
                        History
                    </button> */}
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "tips" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("test")}
                    >
                        Take a test
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "tips" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("tips")}
                    >
                        Tips
                    </button>
                    {/* <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "exercise" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("exercise")}
                    >
                        Exercise
                    </button>
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "about" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("about")}
                    >
                        About
                    </button> */}
                    <button
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === "profile" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8">
                {activeTab === "home" && (

                    <div>
                        <Home />
                        <div className="mt-4" />
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => setActiveTab("test")}
                        >
                            Take a test
                        </button>
                    </div>

                )}
                {activeTab === "history" && <h1 className="text-2xl font-bold">History</h1>}
                {activeTab === "form" && <Form />}
                {activeTab === "tips" && <Tips />}
                {activeTab === "exercise" && <Exercise />}
                {activeTab === "about" && <About />}
                {activeTab === "profile" && <Profile user={{ displayName: "John Doe", email: "johndoe@example.com" }} logout={() => alert("Logged out")} />}
                {activeTab === "test" && (
                    <div>
                        <h1 className="text-2xl font-bold">Test</h1>
                        <Form />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
