import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function AddProduct() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: ""
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.role !== "ADMIN") {
            navigate("/");
        }

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.token;

        try {

            const response = await axios.post(
                "/api/products",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("Produit créé :", response.data);

            setFormData({
                name: "",
                description: "",
                price: "",
                stock: ""
            });

            setSuccess("Produit créé avec succès !");

        } catch (error) {

            console.error("Erreur :", error);

        }

    };

    return (

        <div className="container flex justify-center">

            <div className="product-card w-full max-w-md">

                <h1 className="text-3xl font-bold mb-6 text-center title-glow">
                    Ajouter un produit
                </h1>

                <form onSubmit={handleSubmit} className="form">

                    <input
                        type="text"
                        name="name"
                        placeholder="Nom du produit"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Prix (€)"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    <button
                        className="btn-primary"
                        type="submit"
                    >
                        Créer le produit
                    </button>

                </form>

                {success && (
                    <p className="success text-center">
                        {success}
                    </p>
                )}

            </div>

        </div>

    );

}

export default AddProduct;