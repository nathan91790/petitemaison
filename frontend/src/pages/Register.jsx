import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Register() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setMessage("");

        try {

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'inscription");
            }

            setMessage("Inscription réussie !");
            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {

            setError("Erreur de connexion au serveur");

        }

    };

    return (

        <div className="container flex justify-center">

            <div className="product-card w-full max-w-md">

                <h1 className="text-3xl font-bold text-center title-glow mb-6">
                    Inscription
                </h1>

                <form onSubmit={handleSubmit} className="form">

                    <div>
                        <label className="text-sm text-gray-400">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-400">
                            Mot de passe
                        </label>

                        <input
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
                        S'inscrire
                    </button>

                </form>

                {message && (
                    <p className="success text-center">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="text-red-400 text-center mt-3">
                        {error}
                    </p>
                )}

            </div>

        </div>

    );

}

export default Register;