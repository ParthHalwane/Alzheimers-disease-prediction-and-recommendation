import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
    const tabs = ["home", "history", "tips", "exercise", "about"];

    return (
        <div className="bg-gray-800 text-white w-64 p-4 space-y-4">
            <h2 className="text-xl font-bold mb-4">Navigation</h2>
            <nav className="space-y-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`w-full text-left px-4 py-2 rounded hover:bg-gray-700 ${activeTab === tab ? "bg-gray-700" : ""
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
