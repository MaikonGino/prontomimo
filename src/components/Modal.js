"use client";

import {useCart} from "@/context/CartContext";

const overlayStyles = (isOpen) => ({
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', display: isOpen ? 'flex' : 'none',
    alignItems: 'center', justifyContent: 'center', zIndex: 2000,
    opacity: isOpen ? 1 : 0, transition: 'opacity 0.3s ease-in-out',
});
const modalStyles = {
    backgroundColor: 'var(--branco-gelo)', padding: '30px', borderRadius: '10px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.2)', width: '90%', maxWidth: '500px',
    textAlign: 'center', transform: 'scale(0.95)', transition: 'transform 0.3s ease-in-out',
};
const messageStyles = {fontSize: '1.1rem', color: 'var(--grafite)', marginBottom: '30px', lineHeight: 1.6};
const closeButtonBaseStyles = {
    border: 'none', borderRadius: '5px', padding: '12px 30px',
    fontFamily: 'var(--font-poppins)', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem',
    transition: 'opacity 0.2s'
};

export default function Modal() {
    const {isModalOpen, closeModal, modalContent} = useCart();

    const titleStyles = {
        fontFamily: 'var(--font-poppins)', fontWeight: '700',
        fontSize: '1.8rem', marginBottom: '15px',
        // Muda a cor do título com base no tipo de modal
        color: modalContent.type === 'error' ? 'var(--vermelho-alerta)' : 'var(--azul-noturno)',
    };

    const closeButtonStyles = {
        ...closeButtonBaseStyles,
        // Muda a cor do botão com base no tipo
        backgroundColor: modalContent.type === 'error' ? 'var(--vermelho-alerta)' : 'var(--verde-salvia)',
        color: 'var(--branco-gelo)',
    };

    return (
        <div style={overlayStyles(isModalOpen)} onClick={closeModal}>
            <div
                style={{...modalStyles, transform: isModalOpen ? 'scale(1)' : 'scale(0.95)'}}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={titleStyles}>{modalContent.title}</h2>
                <p style={messageStyles}>{modalContent.message}</p>
                <button
                    style={closeButtonStyles}
                    onClick={closeModal}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 0.9}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 1}
                >
                    Entendi
                </button>
            </div>
        </div>
    );
}