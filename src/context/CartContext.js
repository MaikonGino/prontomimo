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

    const decreaseQuantity = (productId) => {
        const itemToDecrease = cartItems.find(item => item._id === productId);
        if (!itemToDecrease) return;
        if (itemToDecrease.quantity > 1) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item._id === productId ? {...item, quantity: item.quantity - 1} : {...item}
                )
            );
        } else {
            openModal(
                'Remover Item',
                `Tem certeza que deseja remover "${itemToDecrease.name}" do seu carrinho?`,
                'error',
                () => removeFromCart(productId)
            );
        }
    };

    // 1. Calcula o subtotal a partir dos itens do carrinho.
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems, addToCart, isCartOpen, openCart, closeCart,
        increaseQuantity, decreaseQuantity, removeFromCart,
        isModalOpen, modalContent, openModal, closeModal,
        subtotal, // 2. Garante que o subtotal está sendo compartilhado com o resto da aplicação.
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}