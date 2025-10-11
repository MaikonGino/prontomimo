"use client";

import {createContext, useContext, useState} from 'react';

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({children}) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({title: '', message: '', type: 'info', onConfirm: null});

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const openModal = (title, message, type = 'info', onConfirm = null) => {
        setModalContent({title, message, type, onConfirm});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setModalContent({title: '', message: '', type: 'info', onConfirm: null}), 300);
    };

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id ? {...item, quantity: item.quantity + 1} : item
                );
            }
            return [...prevItems, {...product, quantity: 1}];
        });
        openCart();
    };

    const increaseQuantity = (productId) => {
        setCartItems(prevItems => prevItems.map(item =>
            item._id === productId ? {...item, quantity: item.quantity + 1} : item
        ));
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    // --- A LÓGICA CORRIGIDA ESTÁ AQUI ---
    const decreaseQuantity = (productId) => {
        // Primeiro, encontramos o item no carrinho para checar sua quantidade atual
        const itemToDecrease = cartItems.find(item => item._id === productId);

        // Se o item não for encontrado por algum motivo, não fazemos nada.
        if (!itemToDecrease) return;

        // CASO 1: A quantidade é maior que 1.
        // A ação é segura, apenas diminuímos a quantidade.
        if (itemToDecrease.quantity > 1) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === productId
                        ? {...item, quantity: item.quantity - 1}
                        // Clonamos o item para garantir a re-renderização correta
                        : {...item}
                )
            );
        }
            // CASO 2: A quantidade é exatamente 1.
        // Esta é uma ação "destrutiva". Em vez de remover, abrimos o modal de confirmação.
        else {
            openModal(
                'Remover Item',
                `Tem certeza que deseja remover "${itemToDecrease.name}" do seu carrinho?`,
                'error', // Usa o tema de alerta (vermelho/laranja)
                () => removeFromCart(productId) // A ação a ser executada se o usuário confirmar
            );
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems, addToCart, isCartOpen, openCart, closeCart, subtotal,
        increaseQuantity, decreaseQuantity, removeFromCart,
        isModalOpen, modalContent, openModal, closeModal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}