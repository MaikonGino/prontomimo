"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import {useCart} from '@/context/CartContext';

const cardStyles = {
    backgroundColor: '#fff',
    border: '1px solid var(--nevoa)',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};
const cardHoverStyles = {
    transform: 'translateY(-8px)',
    boxShadow: '0 10px 25px rgba(45, 45, 45, 0.1)'
};
const imagePlaceholderStyles = {
    width: '100%',
    height: '250px',
    backgroundColor: 'var(--nevoa)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--cinza-niquel)'
};
const contentStyles = {padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'left'};
const brandStyles = {
    fontFamily: 'var(--font-poppins)',
    color: 'var(--cinza-niquel)',
    textTransform: 'uppercase',
    fontSize: '0.8rem',
    fontWeight: '500',
    marginBottom: '5px'
};
const nameStyles = {
    fontFamily: 'var(--font-poppins)',
    fontWeight: '700',
    color: 'var(--azul-noturno)',
    fontSize: '1.4rem',
    marginBottom: '10px',
    flexGrow: 1,
    lineHeight: 1.3
};
const priceStyles = {
    fontFamily: 'var(--font-poppins)',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: 'var(--grafite)',
    marginBottom: '20px'
};
const buttonStyles = {
    backgroundColor: 'var(--verde-salvia)', color: 'var(--branco-gelo)', border: 'none', borderRadius: '8px',
    padding: '14px 20px', fontFamily: 'var(--font-poppins)', fontWeight: '700', cursor: 'pointer', width: '100%',
    fontSize: '1rem', transition: 'all 0.3s ease', textTransform: 'uppercase'
};

export default function ProductCard({product}) {
    const {addToCart} = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link href={`/products/${product._id}`} style={{textDecoration: 'none', height: '100%'}}>
            <div
                style={{...cardStyles, ...(isHovered ? cardHoverStyles : {})}}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={imagePlaceholderStyles}><span>Imagem do Produto</span></div>
                <div style={contentStyles}>
                    <p style={brandStyles}>{product.brand}</p>
                    <h2 style={nameStyles}>{product.name}</h2>
                    <p style={priceStyles}>R$ {product.price.toFixed(2)}</p>
                    <button
                        style={buttonStyles}
                        onClick={handleAddToCart}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--azul-noturno)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--verde-salvia)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </Link>
    );
}