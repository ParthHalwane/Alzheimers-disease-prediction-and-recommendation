import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

function History() {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + `/api/data/history/${user?.uid || "guest"}`)
            .then((res) => setHistory(res.data))
            .catch(() => alert("Error fetching history"));
    }, []);

    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border p-2">Transaction ID</th>
                    <th className="border p-2">Date</th>
                </tr>
            </thead>
            <tbody>
                {history.map((item) => (
                    <tr key={item.transactionId} className="border">
                        <td className="p-2">{item.transactionId}</td>
                        <td className="p-2">{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default History;
