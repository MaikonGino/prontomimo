"use client";

import React from 'react';
import Image from 'next/image'; // Importa o componente Image do Next.js
import {useCart} from '@/context/CartContext';
import './CartItem.css';

export default function CartItem({item}) {
    const {addToCart, removeFromCart, removeItemCompletely} = useCart();

    return (
        <div className="cart-item">
            {/* NOVO: Div para a imagem do produto */}
            <div className="cart-item-image-container">
                {item.mainImage ? (
                    // Usamos o componente Image do Next.js para otimização
                    <Image
                        src={item.mainImage}
                        alt={item.name}
                        width={70} // Largura da imagem no carrinho
                        height={70} // Altura da imagem no carrinho
                        objectFit="cover" // Garante que a imagem cubra a área sem distorcer
                        className="cart-item-image"
                    />
                ) : (
                    // Placeholder caso não haja imagem
                    <div className="cart-item-image-placeholder"></div>
                )}
            </div>

            <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-quantity-controls">
                    <button className="quantity-button" onClick={() => removeFromCart(item._id)}>-</button>
                    <span className="item-quantity">{item.quantity}</span>
                    <button className="quantity-button" onClick={() => addToCart(item)}>+</button>
                </div>
            </div>
            <div className="item-price-remove">
                <span className="item-price">R$ {(item.price * item.quantity).toFixed(2)}</span>
                <button className="remove-item-button" onClick={() => removeItemCompletely(item._id)}>
                    <svg style={{width: 20, height: 20}} xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.927a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.045-2.201a51.964 51.964 0 0 0-3.32 0c-1.135.06-2.045 1.02-2.045 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}