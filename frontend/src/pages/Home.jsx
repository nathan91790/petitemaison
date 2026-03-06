import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/api/products")
            .then(res => res.json())
            .then(data => setProducts(data.slice(0, 3))); // 3 premiers
    }, []);

    return (
        <div>
            <h1>👻 Petite Maison de l'Épouvante</h1>
            <p>Découvrez nos créatures les plus terrifiantes.</p>

            <h2 style={{ marginTop: "40px" }}>Produits populaires</h2>

            <div style={{
                display: "flex",
                gap: "20px",
                overflowX: "auto",
                marginTop: "20px"
            }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            minWidth: "250px",
                            background: "#2a2a2a",
                            padding: "15px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>{product.price} €</strong></p>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: "30px" }}>
                <Link to="/products">
                    <button style={{ padding: "10px 20px" }}>
                        Voir tous les produits
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;