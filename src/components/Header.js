"use client";

import {useCart} from "@/context/CartContext";
import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/navigation'; // 1. Importa o hook de navegação
import './Header.css';

export default function Header() {
    const {openCart, cartItems} = useCart();
    const router = useRouter(); // 2. Inicializa o hook
    const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);

    // 3. A função agora usa o router para navegar para a página de login
    const handleUserClick = () => {
        router.push('/login');
    };

    return (
        <header className="header-container">
            <div className="header">
                <Link href="/" className="logo-container">
                    <Image src="/logo-pronto-mimo.jpg" alt="Símbolo da Pronto Mimo" width={50} height={50} priority
                           style={{objectFit: 'contain'}}/>
                    <span className="logo-text">Pronto Mimo</span>
                </Link>
                <div className="header-actions">
                    <button onClick={handleUserClick} className="action-button"
                            aria-label="Acessar área de administração">
                        <Image src="/1000514721.png" alt="Ícone de usuário para acesso do administrador" width={40}
                               height={40} style={{borderRadius: '50%', backgroundColor: '#C9DFF2'}}/>
                    </button>
                    <button onClick={openCart} className="action-button" aria-label="Abrir carrinho de compras">
                        <svg style={{width: 32, height: 32, color: 'var(--grafite)'}} xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
                        </svg>
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </button>
                </div>
            </div>
        </header>
    );
}