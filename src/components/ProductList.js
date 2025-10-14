"use client";

import ProductCard from './ProductCard';
import './ProductList.css'; // Importa o novo CSS

export default function ProductList({products}) {
    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    );
}