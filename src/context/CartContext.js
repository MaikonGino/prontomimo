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
    const [modalContent, setModalContent] = useState({title: '', message: '', type: 'info'});

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const openModal = (title, message, type = 'info') => {
        setModalContent({title, message, type});
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

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
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === productId);
            if (existingItem.quantity === 1) {
                return prevItems.filter(item => item._id !== productId);
            }
            return prevItems.map(item =>
                item._id === productId ? {...item, quantity: item.quantity - 1} : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems, addToCart, isCartOpen, openCart, closeCart, subtotal,
        increaseQuantity, decreaseQuantity, removeFromCart,
        isModalOpen, modalContent, openModal, closeModal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}