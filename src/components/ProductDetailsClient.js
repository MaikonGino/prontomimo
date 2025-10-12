"use client";

import React from 'react';
import Link from 'next/link';
import {useCart} from '@/context/CartContext';
import './ProductDetails.css';

export default function ProductDetailsClient({product}) {
    const {addToCart} = useCart();

    return (
        <div className="details-main">
            <Link href="/" className="back-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                     stroke="currentColor" style={{width: 20, height: 20}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                </svg>
                Voltar para todos os produtos
            </Link>
            <div className="details-container">
                <div className="image-placeholder">
                    <span>Imagem do Produto</span>
                </div>
                <div className="info">
                    <h1 className="title">{product.name}</h1>
                    <p className="price">R$ {product.price.toFixed(2)}</p>
                    <p className="description">{product.description}</p>
                    <button
                        className="add-to-cart-button"
                        onClick={() => addToCart(product)}
                    >
                        {/* A CORREÇÃO SOLICITADA ESTÁ AQUI: Ícone SVG adicionado */}
                        <svg style={{width: 22, height: 22}} xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
                        </svg>
                        <span>Adicionar ao Carrinho</span>
                    </button>
                </div>
            </div>
        </div>
    );
}