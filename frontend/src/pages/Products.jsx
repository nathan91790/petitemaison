import axios from "axios";
import { useEffect, useState } from "react";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    }, []);

    return (

        <div className="container">

            <h1 className="text-4xl font-bold text-center title-glow mb-12">
                Nos produits
            </h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "30px"
            }}>

                {products.map(product => (

                    <div key={product.id} className="product-card">

                        <div className="product-image">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>

                        <div className="product-content">

                            <h2>{product.name}</h2>

                            <p>{product.description}</p>

                            <div className="product-bottom">

                                <span className="price">{product.price} €</span>

                                <span className="stock">Stock : {product.stock}</span>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Products;