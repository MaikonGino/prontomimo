"use client";

import React, {useState} from 'react'; // Importamos o useState para o efeito de hover
import {useCart} from "@/context/CartContext";
import Link from 'next/link';
import Image from 'next/image';

// --- ESTILOS DO COMPONENTE ---

const headerContainerStyles = {
    padding: '0 20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderBottom: '1px solid var(--nevoa)',
};
const headerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};
// NOVO: Estilo para o container que agrupa a imagem e o texto do logo
const logoContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px', // Espaçamento entre a imagem e o texto
};
// NOVO: Estilo para o texto "Pronto Mimo"
const logoTextStyles = {
    fontFamily: 'var(--font-poppins)',
    fontWeight: '800',
    fontSize: '2rem',
    color: 'var(--azul-noturno)',
    transition: 'color 0.3s ease-in-out',
};
const cartButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'transform 0.2s ease-in-out'
};
const cartIconStyles = {
    width: '32px',
    height: '32px',
    color: 'var(--grafite)'
};
const cartCountStyles = {
    position: 'absolute',
    top: '-5px',
    right: '-10px',
    backgroundColor: 'var(--verde-salvia)',
    color: 'white',
    borderRadius: '50%',
    width: '22px',
    height: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    border: '2px solid #fff'
};

// --- COMPONENTE PRINCIPAL ---

export default function Header() {
    const {openCart, cartItems} = useCart();
    const [isLogoHovered, setIsLogoHovered] = useState(false);
    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <header style={headerContainerStyles}>
            <div style={headerStyles}>
                <Link
                    href="/"
                    style={{textDecoration: 'none'}}
                    onMouseEnter={() => setIsLogoHovered(true)}
                    onMouseLeave={() => setIsLogoHovered(false)}
                >
                    <div style={logoContainerStyles}>
                        <Image
                            src="/logo-pronto-mimo.png"
                            alt="Símbolo da loja Pronto Mimo" // O alt agora descreve o símbolo
                            width={50} // Ajustado para um formato mais de ícone
                            height={50}
                            priority
                            style={{objectFit: 'contain'}}
                        />
                        <span style={{
                            ...logoTextStyles,
                            color: isLogoHovered ? 'var(--verde-salvia)' : 'var(--azul-noturno)'
                        }}>
              Pronto Mimo
            </span>
                    </div>
                </Link>
                <button
                    onClick={openCart}
                    style={cartButtonStyles}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg style={cartIconStyles} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
                    </svg>
                    {totalItems > 0 && <span style={cartCountStyles}>{totalItems}</span>}
                </button>
            </div>
        </header>
    );
}