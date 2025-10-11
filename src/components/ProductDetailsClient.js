"use client";

import React from 'react';
import Link from 'next/link';
import {useCart} from '@/context/CartContext';

// --- ESTILOS DO COMPONENTE ---
const mainStyles = {maxWidth: '1000px', margin: '40px auto', padding: '20px', animation: 'fadeIn 0.5s ease-in-out'};
const backLinkStyles = {
    marginBottom: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--grafite)',
    fontWeight: '500'
};
const containerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
    alignItems: 'center'
};
const imagePlaceholderStyles = {
    width: '100%',
    height: '450px',
    backgroundColor: 'var(--nevoa)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--cinza-niquel)'
};
const infoStyles = {display: 'flex', flexDirection: 'column'};
const titleStyles = {
    fontFamily: 'var(--font-poppins)',
    fontWeight: '800',
    color: 'var(--azul-noturno)',
    fontSize: '3rem',
    lineHeight: 1.2,
    marginBottom: '10px'
};
const priceStyles = {fontWeight: '700', fontSize: '2.5rem', color: 'var(--verde-salvia)', margin: '10px 0'};
const descriptionStyles = {marginBottom: '30px', lineHeight: 1.7, color: 'var(--grafite)'};
const buttonStyles = {
    backgroundColor: 'var(--verde-salvia)', color: 'var(--branco-gelo)', border: 'none', borderRadius: '8px',
    padding: '15px 30px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem',
    transition: 'all 0.3s ease', textTransform: 'uppercase'
};

export default function ProductDetailsClient({product}) {
    const {addToCart} = useCart();

    return (
        <main style={mainStyles}>
            <Link href="/" style={backLinkStyles}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                     stroke="currentColor" style={{width: 20, height: 20}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                </svg>
                Voltar para todos os produtos
            </Link>
            <div style={containerStyles}>
                <div style={imagePlaceholderStyles}>
                    <span>Imagem do Produto</span>
                </div>
                <div style={infoStyles}>
                    <h1 style={titleStyles}>{product.name}</h1>
                    <p style={priceStyles}>R$ {product.price.toFixed(2)}</p>
                    <p style={descriptionStyles}>{product.description}</p>
                    <button
                        style={buttonStyles}
                        onClick={() => addToCart(product)}
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
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </main>
    );
}