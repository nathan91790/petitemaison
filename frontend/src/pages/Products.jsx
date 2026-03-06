import { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/products")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erreur lors du chargement");
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>Tous les produits</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                marginTop: "30px"
            }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            background: "#2a2a2a",
                            padding: "15px",
                            borderRadius: "8px"
                        }}
                    >
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>{product.price} €</strong></p>
                        <p>Stock : {product.stock}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;