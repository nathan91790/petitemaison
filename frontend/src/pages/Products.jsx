import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.get("/api/products")
            .then(res => setProducts(res.data));

    }, []);

    return (

        <div className="container">

            <h1 className="text-4xl font-bold text-center title-glow mb-16">
                Nos produits
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="product-card"
                    >

                        <h2 className="text-xl font-bold mb-3">
                            {product.name}
                        </h2>

                        <p className="text-gray-400 mb-4">
                            {product.description}
                        </p>

                        <div className="flex justify-between items-center">

                            <p className="text-purple-400 font-bold text-lg">
                                {product.price} €
                            </p>

                            <span className="text-sm text-gray-500">
                                Stock : {product.stock}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Products;