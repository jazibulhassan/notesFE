import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    userId: string;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchNotes = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch("http://localhost:8080/note/all", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    setError("Failed to fetch notes");
                    setLoading(false);
                    return;
                }

                const data: Note[] = await response.json();
                setNotes(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching notes:", err);
                setError("Something went wrong");
                setLoading(false);
            }
        };

        fetchNotes();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>

            </div>

            {loading && <p>Loading notes...</p>}
            {error && <p className="text-red-600">{error}</p>}


            {!loading && notes.length > 0 && (
                <div className="overflow-x-auto bg-red-50 min-h-screen p-6">
                    <table className="min-w-full bg-red-100 border border-red-400 rounded-lg text-red-900">
                        <thead>
                        <tr className="bg-red-300 text-left">
                            <th className="p-3 border border-red-400">Title</th>
                            <th className="p-3 border border-red-400">Content</th>
                            <th className="p-3 border border-red-400">Created At</th>
                        </tr>
                        </thead>
                        <tbody>
                        {notes.map((note, index) => (
                            <tr
                                key={note.id}
                                className={`hover:bg-red-200 ${
                                    index % 2 === 0 ? "bg-red-100" : "bg-red-50"
                                }`}
                            >
                                <td className="p-3 border border-red-400">{note.title}</td>
                                <td className="p-3 border border-red-400">{note.content}</td>
                                <td className="p-3 border border-red-400">
                                    {new Date(note.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            )}

            {!loading && notes.length === 0 && <p>No notes found.</p>}

            <button
                onClick={() => navigate("/create-note")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90"
            >
                New Note
            </button>


            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-90 transition"
            >
                Logout
            </button>
        </div>
    );
}
