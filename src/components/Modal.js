"use client";

import {useCart} from "@/context/CartContext";
import './Modal.css';

export default function Modal() {
    const {isModalOpen, closeModal, modalContent} = useCart();

    const handleConfirm = () => {
        if (modalContent.onConfirm) {
            modalContent.onConfirm();
        }
        closeModal();
    };

    return (
        <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={closeModal}>
            <div className={`modal-content ${isModalOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h2 className={`modal-title ${modalContent.type}`}>{modalContent.title}</h2>
                <p className="modal-message">{modalContent.message}</p>
                <div className="button-container">
                    {modalContent.onConfirm && (
                        <button className="modal-button secondary-button" onClick={closeModal}>
                            Cancelar
                        </button>
                    )}
                    <button
                        className={`modal-button primary-button ${modalContent.type}`}
                        onClick={modalContent.onConfirm ? handleConfirm : closeModal}
                    >
                        {modalContent.onConfirm ? 'Sim, remover' : 'Entendi'}
                    </button>
                </div>
            </div>
        </div>
    );
}