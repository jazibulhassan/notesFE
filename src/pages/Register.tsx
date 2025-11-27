import {useState, FormEvent, ChangeEvent} from "react";
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Register:", form);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-80 bg-white p-6 border rounded-lg shadow-sm flex flex-col gap-4"
            >
                <h2 className="text-xl mb-3 text-center">Register</h2>

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

                <button className="w-full bg-green-600 text-white p-2 rounded">
                    Register
                </button>

                <p className="text-center mt-2 text-sm">
                    Already have an account? <Link to="/login" className="text-green-600">Login</Link>
                </p>
            </form>
        </div>
    );
}
