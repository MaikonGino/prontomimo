"use client";

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useCart} from '@/context/CartContext'; // 1. Importa o contexto para usar o modal
import './HeroAdmin.css';

export default function HeroAdminPage() {
    const {openModal} = useCart(); // 2. Pega a função de abrir o modal
    const [slides, setSlides] = useState([]);
    const maxSlides = 10;

    const fetchSlides = () => {
        fetch('/api/hero').then(res => res.json()).then(data => {
            if (data.success) setSlides(data.data);
        });
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleDelete = (slideId, slideImageUrl) => {
        // 3. A CORREÇÃO ESTÁ AQUI: Substituímos o 'confirm()' pelo nosso modal
        openModal(
            'Confirmar Exclusão',
            `Tem certeza que deseja deletar permanentemente este slide?`,
            'error', // Ativa o tema de alerta (vermelho/laranja)
            async () => { // Ação a ser executada se o usuário confirmar
                await fetch(`/api/hero/${slideId}`, {method: 'DELETE'});
                fetchSlides(); // Atualiza a lista
            }
        );
    };

    return (
        <div className="hero-admin-container">
            <div className="hero-admin-header">
                <h1 className="hero-admin-title">Gerenciar Carrossel</h1>
                {slides.length < maxSlides && (
                    <Link href="/admin/hero/new" className="new-product-button">
                        + Novo Slide
                    </Link>
                )}
            </div>
            <div className="slide-list">
                {slides.map(slide => (
                    <div key={slide._id} className="slide-card">
                        <Image src={slide.imageUrl} alt="Preview do slide" width={150} height={75}
                               className="slide-preview"/>
                        <div className="slide-info">
                            <strong>Ordem de Exibição: {slide.order}</strong>
                            <p className="slide-url" title={slide.imageUrl}>URL: {slide.imageUrl}</p>
                        </div>
                        <div className="slide-actions">
                            <Link href={`/admin/hero/edit/${slide._id}`} className="edit-link">Editar</Link>
                            <button onClick={() => handleDelete(slide._id, slide.imageUrl)}
                                    className="delete-button">Deletar
                            </button>
                        </div>
                    </div>
                ))}
                {slides.length === 0 && <p>Nenhum slide cadastrado. Adicione um para começar!</p>}
            </div>
        </div>
    );
}