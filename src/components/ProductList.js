"use client";

import ProductCard from './ProductCard';

export default function ProductList({products}) {
    // This component receives the list of products that was fetched on the server.
    // Its only job is to render them.
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '40px'
        }}>
            {products.map((product) => (
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    );
}