"use client"; // Necessário para usar hooks como o useCart

import {useCart} from '@/context/CartContext';
import Link from 'next/link';
import {useEffect, useState} from 'react';

// Componente de carregamento para melhor UX
function LoadingSpinner() {
    return <div style={{textAlign: 'center', padding: '50px'}}>Carregando...</div>;
}

// Componente para a página de detalhes
export default function ProductDetailsPage({params}) {
    const {id} = params;
    const {addToCart} = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
            try {
                const res = await fetch(`${apiUrl}/api/products/${id}`);
                if (!res.ok) {
                    throw new Error('Produto não encontrado');
                }
                const {data} = await res.json();
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (!product) {
        return <div style={{textAlign: 'center', padding: '50px'}}>Produto não encontrado.</div>;
    }

    // --- ESTILOS DA PÁGINA ---
    const mainStyles = {maxWidth: '1000px', margin: '40px auto', padding: '20px'};
    const backLinkStyles = {marginBottom: '30px', display: 'inline-block', color: 'var(--grafite)'};
    const containerStyles = {display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center'};
    const imagePlaceholderStyles = {
        width: '100%',
        height: '400px',
        backgroundColor: 'var(--nevoa)',
        borderRadius: '10px'
    };
    const infoStyles = {display: 'flex', flexDirection: 'column'};
    const titleStyles = {
        fontFamily: 'var(--font-poppins)',
        fontWeight: '700',
        color: 'var(--azul-noturno)',
        fontSize: '2.5rem',
        lineHeight: 1.2,
        marginBottom: '10px'
    };
    const priceStyles = {fontWeight: 'bold', fontSize: '2rem', color: 'var(--grafite)', margin: '10px 0'};
    const descriptionStyles = {marginBottom: '30px', lineHeight: 1.6};
    const buttonStyles = {
        backgroundColor: 'var(--verde-salvia)',
        color: 'var(--branco-gelo)',
        border: 'none',
        borderRadius: '5px',
        padding: '15px 30px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem'
    };

    return (
        <main style={mainStyles}>
            <Link href="/" style={backLinkStyles}>&larr; Voltar para todos os produtos</Link>
            <div style={containerStyles}>
                <div style={imagePlaceholderStyles}>
                    {/* Futuramente, a imagem do produto virá aqui */}
                </div>
                <div style={infoStyles}>
                    <h1 style={titleStyles}>{product.name}</h1>
                    <p style={priceStyles}>R$ {product.price.toFixed(2)}</p>
                    <p style={descriptionStyles}>{product.description}</p>
                    <button style={buttonStyles} onClick={() => addToCart(product)}>
                        Adicionar ao Carrinho
                    </button>
                </div>
            </div>
        </main>
    );
}