import {useState, type FormEvent, type ChangeEvent} from "react";
import {Link} from "react-router-dom";

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

export default function Register() {
    const [form, setForm] = useState<RegisterForm>({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault();
        console.log("Register:", form);

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Registration failed");
                setLoading(false);
                return;
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            alert("Registered successfully! You can now login.");
            setLoading(false);

            // Optional: reset form
            setForm({username: "", email: "", password: ""});
        } catch (err) {
            console.error("Registration error:", err);
            setError("Something went wrong. Try again.");
            setLoading(false);
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 border rounded-lg shadow-sm flex flex-col gap-4"
            >
                <h2 className="text-xl mb-3 text-center">Register</h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div className="flex flex-col gap-2">
                    <input
                        name="username"
                        placeholder="Username"
                        className="w-full p-2 mb-2 border rounded"
                        value={form.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 mb-2 border rounded"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-2 mb-3 border rounded"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <p></p>

                <button className="w-full bg-green-600 text-white p-2 rounded"
                        type="submit"
                        disabled={loading}>
                    Register
                </button>

                <p className="text-center mt-2 text-sm">
                    Already have an account? <Link to="/login" className="text-green-600">Login</Link>
                </p>
            </form>
        </div>
    );
}
