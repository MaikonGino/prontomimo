"use client";

import {useCart} from "@/context/CartContext";

const overlayStyles = (isOpen) => ({
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999,
    opacity: isOpen ? 1 : 0, transition: 'opacity 0.4s ease-in-out',
    pointerEvents: isOpen ? 'auto' : 'none', // Permite cliques apenas quando visível
});
const sidebarStyles = (isOpen) => ({
    position: 'fixed',
    top: 0,
    right: isOpen ? '0' : '-100%',
    width: '100%',
    maxWidth: '400px',
    height: '100vh',
    backgroundColor: '#fff',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
    transition: 'right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column'
});
const headerStyles = {
    padding: '20px',
    borderBottom: '1px solid var(--nevoa)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};
const titleStyles = {
    fontFamily: 'var(--font-poppins)',
    fontWeight: '700',
    color: 'var(--azul-noturno)',
    fontSize: '1.5rem'
};
const closeButtonStyles = {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: 'var(--grafite)',
    lineHeight: 1
};
const itemListStyles = {flexGrow: 1, padding: '20px', overflowY: 'auto'};
const itemStyles = {display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid var(--nevoa)'};
const imagePlaceholderStyles = {
    width: '80px',
    height: '80px',
    backgroundColor: 'var(--nevoa)',
    borderRadius: '8px',
    flexShrink: 0
};
const itemDetailsStyles = {flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'};
const itemNameStyles = {fontWeight: '500', color: 'var(--grafite)'};
const itemControlsStyles = {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px'};
const quantityControlStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    border: '1px solid var(--nevoa)',
    borderRadius: '50px',
    padding: '4px 8px'
};
const quantityButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    color: 'var(--grafite)'
};
const removeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    color: 'var(--cinza-niquel)',
    transition: 'color 0.2s'
};
const footerStyles = {
    padding: '20px',
    borderTop: '1px solid var(--nevoa)',
    backgroundColor: '#fff',
    boxShadow: '0 -4px 10px rgba(0,0,0,0.05)'
};
const subtotalStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: 'var(--grafite)'
};
const checkoutButtonStyles = {
    backgroundColor: 'var(--verde-salvia)',
    color: 'var(--branco-gelo)',
    border: 'none',
    borderRadius: '5px',
    padding: '15px',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.2s'
};

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

    return (
        <>
            <div style={overlayStyles(isCartOpen)} onClick={closeCart}/>
            <aside style={sidebarStyles(isCartOpen)}>
                <header style={headerStyles}>
                    <h2 style={titleStyles}>Meu Carrinho</h2>
                    <button onClick={closeCart} style={closeButtonStyles}>&times;</button>
                </header>
                <div style={itemListStyles}>
                    {cartItems.length === 0 ? (<p>Seu carrinho está vazio.</p>) : (
                        <ul style={{listStyle: 'none'}}>
                            {cartItems.map((item) => (
                                <li key={item._id} style={itemStyles}>
                                    <div style={imagePlaceholderStyles}/>
                                    <div style={itemDetailsStyles}>
                                        <span style={itemNameStyles}>{item.name}</span>
                                        <div style={itemControlsStyles}>
                                            <div style={quantityControlStyles}>
                                                <button onClick={() => decreaseQuantity(item._id)}
                                                        style={quantityButtonStyles}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                                         style={{width: 16, height: 16}}>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M5 12h14"/>
                                                    </svg>
                                                </button>
                                                <span style={{
                                                    minWidth: '20px',
                                                    textAlign: 'center',
                                                    fontWeight: '500'
                                                }}>{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item._id)}
                                                        style={quantityButtonStyles}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                                                         style={{width: 16, height: 16}}>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M12 4.5v15m7.5-7.5h-15"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <span style={{
                                                fontWeight: '700',
                                                fontSize: '1.1rem'
                                            }}>R$ {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} style={removeButtonStyles}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--vermelho-alerta)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--cinza-niquel)'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" style={{width: 22, height: 22}}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 0 0-2.09 2.134v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <footer style={footerStyles}>
                        <div style={subtotalStyles}>
                            <span>Subtotal</span>
                            <span>R$ {subtotal.toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} style={checkoutButtonStyles}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--azul-noturno)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--verde-salvia)'}>Finalizar
                            Compra
                        </button>
                    </footer>
                )}
            </aside>
        </>
    );
}