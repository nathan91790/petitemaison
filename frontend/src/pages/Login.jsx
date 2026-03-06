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
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur de connexion");
            }

            //on enregistre l'utilisateur + token
            login({ email }, data.token);

            navigate("/");

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <button type="submit" style={{ padding: "8px 16px" }}>
                    Se connecter
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default Login;