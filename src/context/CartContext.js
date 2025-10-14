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

    // --- LÓGICA DE CONTROLE DE ESTOQUE IMPLEMENTADA AQUI ---
    const addToCart = (product) => {
        // Procura se o item já existe no carrinho
        const existingItem = cartItems.find(item => item._id === product._id);
        const currentQuantityInCart = existingItem ? existingItem.quantity : 0;

        // Verifica se adicionar mais um item excederá o estoque
        if (currentQuantityInCart >= product.stock) {
            openModal(
                'Limite de Estoque',
                `Você já atingiu a quantidade máxima em estoque para "${product.name}".`,
                'error'
            );
            return; // Interrompe a função
        }

        setCartItems(prevItems => {
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
        const itemToIncrease = cartItems.find(item => item._id === productId);

        // Verifica se o item existe e se a quantidade atual é menor que o estoque
        if (itemToIncrease && itemToIncrease.quantity < itemToIncrease.stock) {
            setCartItems(prevItems => prevItems.map(item =>
                item._id === productId ? {...item, quantity: item.quantity + 1} : item
            ));
        } else if (itemToIncrease) {
            // Se o limite foi atingido, informa o usuário
            openModal(
                'Limite de Estoque',
                `A quantidade máxima em estoque para "${itemToIncrease.name}" é ${itemToIncrease.stock}.`,
                'error'
            );
        }
    };

    // Funções 'removeFromCart' e 'decreaseQuantity' sem alterações de lógica
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

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems, addToCart, isCartOpen, openCart, closeCart, subtotal,
        increaseQuantity, decreaseQuantity, removeFromCart,
        isModalOpen, modalContent, openModal, closeModal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}