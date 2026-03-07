import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const response = await axios.post("/api/auth/login", {
                email,
                password
            });

            const data = response.data;

            login(
                { email: data.user.email, role: data.user.role },
                data.token
            );

            navigate("/");

        } catch (err) {

            setError(err.response?.data?.message || "Erreur de connexion");

        }

    };

    return (

        <div className="container flex justify-center">

            <div className="product-card w-full max-w-md">

                <h1 className="text-3xl font-bold text-center title-glow mb-6">
                    Connexion
                </h1>

                <form onSubmit={handleSubmit} className="form">

                    <div>

                        <label htmlFor="email" className="text-sm text-gray-400">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                    </div>

                    <div>

                        <label htmlFor="password" className="text-sm text-gray-400">
                            Mot de passe
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        Se connecter
                    </button>

                </form>

                {error && (
                    <p className="text-red-400 mt-4 text-center">
                        {error}
                    </p>
                )}

            </div>

        </div>

    );

}

export default Login;