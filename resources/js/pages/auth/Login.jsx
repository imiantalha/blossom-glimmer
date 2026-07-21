import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const { login, loading } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        try {
            await login(form);

            navigate("/");
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
                return;
            }

            alert(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />

                {errors.email && (
                    <p>{errors.email[0]}</p>
                )}
            </div>

            <div>
                <label>Password</label>

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />

                {errors.password && (
                    <p>{errors.password[0]}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? "Signing in..." : "Login"}
            </button>
        </form>
    );
};

export default Login;