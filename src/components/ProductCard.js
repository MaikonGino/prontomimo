"use client";

import Link from 'next/link';
import {useCart} from '@/context/CartContext';
import './ProductCard.css';

export default function ProductCard({product}) {
    const {addToCart} = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link href={`/products/${product._id}`} style={{textDecoration: 'none', height: '100%'}}>
            <div className="product-card">
                <div className="image-placeholder">
                    <span>Imagem do Produto</span>
                </div>
                <div className="content">
                    <p className="brand">{product.brand}</p>
                    <h2 className="name">{product.name}</h2>
                    <p className="price">R$ {product.price.toFixed(2)}</p>
                    <button
                        className="buy-button"
                        onClick={handleAddToCart}
                    >
                        {/* A CORREÇÃO ESTÁ AQUI: Ícone SVG adicionado */}
                        <svg style={{width: 20, height: 20}} xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
                        </svg>
                        <span>Adicionar ao carrinho</span>
                    </button>
                </div>
            </div>
        </Link>
    );
}