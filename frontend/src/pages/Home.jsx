import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

function Home() {

    const [products, setProducts] = useState([]);
    const { user } = useAuth();

    useEffect(() => {

        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 3)));

    }, []);

    return (

        <div className="container">

            {/* HERO */}

            <div className="text-center mb-20">

                <h1 className="text-5xl font-bold title-glow mb-4">
                    👻 Petite Maison de l'Épouvante
                </h1>

                <p className="text-gray-400 max-w-xl mx-auto">
                    Découvrez nos créatures les plus terrifiantes,
                    figurines d’horreur et objets collectors.
                </p>

                {user?.role === "ADMIN" && (

                    <div className="mt-8">

                        <Link to="/add-product">

                            <button className="btn-primary">
                                Créer un produit
                            </button>

                        </Link>

                    </div>

                )}

            </div>

            {/* PRODUITS POPULAIRES */}

            <h2 className="text-3xl font-bold mb-10 text-center">
                Produits populaires
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="product-card"
                    >

                        <h3 className="text-xl font-bold mb-3">
                            {product.name}
                        </h3>

                        <p className="text-gray-400 mb-4">
                            {product.description}
                        </p>

                        <p className="text-purple-400 font-bold text-lg">
                            {product.price} €
                        </p>

                    </div>

                ))}

            </div>

            {/* BOUTON PRODUITS */}

            <div className="flex justify-center mt-14">

                <Link to="/products">

                    <button className="btn-primary">
                        Voir tous les produits
                    </button>

                </Link>

            </div>

        </div>

    );

}

export default Home;