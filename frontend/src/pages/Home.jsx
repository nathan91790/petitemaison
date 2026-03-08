import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                {products.map(product => (

                    <div key={product.id} className="product-card">

                        {/* IMAGE */}
                        <div className="product-image">

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                            />

                        </div>

                        {/* CONTENU */}
                        <div className="product-content">

                            <h2>{product.name}</h2>

                            <p>
                                {product.description}
                            </p>

                            <div className="product-bottom">

                                <span className="price">
                                    {product.price} €
                                </span>

                                <span className="stock">
                                    Stock : {product.stock}
                                </span>

                            </div>

                        </div>

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