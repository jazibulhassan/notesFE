import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // redirect if not logged in
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 gap-6">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard!</h1>
            <p>You are successfully logged in.</p>
            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Logout
            </button>
        </div>
    );
}
