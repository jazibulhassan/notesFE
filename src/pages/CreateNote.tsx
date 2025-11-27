import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/note/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Failed to save note");
                setLoading(false);
                return;
            }

            alert("Note saved successfully!");
            setTitle("");
            setContent("");
            setLoading(false);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4">
            {/* Center wrapper */}
            <div className="flex flex-col flex-grow max-w-3xl mx-auto w-full">
                <h2 className="text-3xl font-bold text-center mb-4">Create Note</h2>

                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                {/* Form wrapper */}
                <div className="flex flex-col flex-grow bg-white p-4 rounded shadow gap-4 h-[70vh]">
                    <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
                        {/* Title */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border rounded"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-grow">
              <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full p-3 border rounded resize-none"
                  required
              />
                        </div>

                        {/* Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white p-3 rounded hover:opacity-90 transition"
                            >
                                {loading ? "Saving..." : "Save Note"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
