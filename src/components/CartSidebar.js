"use client";

import {useCart} from "@/context/CartContext";
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import './CartSidebar.css';

// --- VARIANTES DE ANIMAÇÃO PARA OS ITENS (sem alterações) ---
const listVariants = {hidden: {opacity: 0}, visible: {opacity: 1, transition: {staggerChildren: 0.1}}};
const itemVariants = {
    hidden: {opacity: 0, x: 50},
    visible: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -50, transition: {duration: 0.3}}
};

// --- COMPONENTE PRINCIPAL ---
export default function CartSidebar() {
    const {
        isCartOpen,
        closeCart,
        cartItems,
        subtotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        openModal
    } = useCart();
    const handleCheckout = () => {
        openModal('Em Desenvolvimento', 'A funcionalidade de checkout e integração com o Mercado Pago será o próximo passo!', 'info');
    };
    const handleRemove = (item) => {
        openModal('Remover Item', `Tem certeza que deseja remover "${item.name}" do seu carrinho?`, 'error', () => removeFromCart(item._id));
    };

    return (
        <>
            <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={closeCart}/>
            <aside className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <header className="cart-header">
                    <div className="cart-title-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
                        </svg>
                        <h2 className="cart-title">Meu Carrinho</h2>
                    </div>
                    <button onClick={closeCart} className="close-button" aria-label="Fechar carrinho">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </header>
                <div className="item-list">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1}
                                 stroke="currentColor" style={{width: 80, height: 80, marginBottom: '20px'}}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"/>
                            </svg>
                            <h3 style={{fontWeight: '500', color: 'var(--grafite)', fontSize: '1.2rem'}}>Seu carrinho
                                está vazio</h3>
                            <p style={{marginTop: '5px'}}>Adicione mimos para começar.</p>
                        </div>
                    ) : (
                        <motion.ul style={{listStyle: 'none'}} variants={listVariants} initial="hidden"
                                   animate="visible">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    // A CORREÇÃO ESTÁ AQUI: O CONTEÚDO DO 'li' FOI RESTAURADO
                                    <motion.li key={item._id} className="cart-item" variants={itemVariants} exit="exit">
                                        <div className="item-image">
                                            {item.mainImage &&
                                                <Image src={item.mainImage} alt={item.name} width={90} height={90}
                                                       style={{objectFit: 'cover'}}/>}
                                        </div>
                                        <div className="item-details">
                                            <span className="item-name">{item.name}</span>
                                            <div className="item-controls">
                                                <div className="quantity-control">
                                                    <button onClick={() => decreaseQuantity(item._id)}
                                                            className="quantity-button decrease-button"
                                                            aria-label="Diminuir quantidade">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                                             style={{width: 16, height: 16}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M5 12h14"/>
                                                        </svg>
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => increaseQuantity(item._id)}
                                                            className="quantity-button increase-button"
                                                            aria-label="Aumentar quantidade">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                                             style={{width: 16, height: 16}}>
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M12 4.5v15m7.5-7.5h-15"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <span
                                                    className="item-price">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <button onClick={() => handleRemove(item)} className="remove-button"
                                                aria-label="Remover item do carrinho">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor"
                                                 style={{width: 22, height: 22}}>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 0 0-2.09 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                            </svg>
                                        </button>
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </motion.ul>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <footer className="cart-footer">
                        <div className="subtotal">
                            <span>Subtotal</span>
                            {/* A correção de robustez que causou o problema, agora no lugar certo */}
                            <span>R$ {(subtotal || 0).toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} className="checkout-button">Finalizar Compra</button>
                    </footer>
                )}
            </aside>
        </>
    );
}