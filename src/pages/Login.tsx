import {useState, FormEvent} from "react";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || "Login failed");
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log("Login successful:", data);

            // Save token (if your API returns one)
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            setLoading(false);

            // Redirect to a protected page (dashboard)
            navigate("/dashboard");

        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Try again.");
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 border rounded-lg shadow-sm flex flex-col gap-4"
            >
                <h2 className="text-2xl font-semibold text-center">Login</h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <p></p>
                <button className="w-full bg-blue-600 text-white p-2 rounded hover:opacity-90 transition"
                        disabled={loading}
                        type="submit"
                >
                    Login
                </button>

                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
