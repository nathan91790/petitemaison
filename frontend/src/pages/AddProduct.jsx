import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();

    const [preview, setPreview] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: ""
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

    const onDrop = async (acceptedFiles) => {

        const file = acceptedFiles[0];

        setPreview(URL.createObjectURL(file));

        const formDataUpload = new FormData();
        formDataUpload.append("image", file);

        const res = await axios.post("/api/upload", formDataUpload);

        setFormData({
            ...formData,
            imageUrl: res.data.imageUrl
        });

    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [] }
    });

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
                stock: "",
                imageUrl: ""
            });

            setPreview("");

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
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Prix (€)"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />

                    {/* Drag & Drop */}

                    <div
                        {...getRootProps()}
                        className="border-2 border-dashed border-purple-500 p-8 rounded-lg text-center cursor-pointer hover:bg-purple-900/20 transition"
                    >
                        <input {...getInputProps()} />
                        <p className="text-gray-400">
                            Glissez une image ici ou cliquez
                        </p>
                    </div>

                    {preview && (
                        <img
                            src={preview}
                            alt="preview"
                            className="mt-4 rounded-lg"
                        />
                    )}

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