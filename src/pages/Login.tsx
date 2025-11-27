import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Login:", { email, password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 border rounded-lg shadow-sm flex flex-col gap-4"
            >
                <h2 className="text-2xl font-semibold text-center">Login</h2>

                <div className="flex flex-col gap-2">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

                <button className="w-full bg-blue-600 text-white p-2 rounded hover:opacity-90 transition">
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
