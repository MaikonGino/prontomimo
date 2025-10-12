"use client";

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useCart} from '@/context/CartContext'; // 1. Importa o contexto para usar o modal
import './DashboardPage.css';

const LoadingSpinner = () => <div style={{textAlign: 'center', padding: '50px'}}>Carregando...</div>;

export default function DashboardPage() {
    const {status} = useSession();
    const router = useRouter();
    const {openModal} = useCart(); // 2. Pega a função de abrir o modal
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar os produtos mais recentes
    const fetchProducts = () => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/login');
        }
        if (status === 'authenticated') {
            fetchProducts();
        }
    }, [status, router]);

    const handleDelete = (productId, productName) => {
        // 3. Substitui o 'confirm()' pelo nosso modal profissional
        openModal(
            'Confirmar Exclusão',
            `Tem certeza que deseja deletar permanentemente o produto "${productName}"?`,
            'error', // Ativa o tema de alerta
            async () => { // Ação a ser executada ao confirmar
                await fetch(`/api/products/${productId}`, {method: 'DELETE'});
                // Atualiza a lista de produtos na tela após a exclusão
                setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
            }
        );
    };

    if (status === 'loading' || loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard de Produtos</h1>
                <Link href="/admin/products/new" className="new-product-button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                         stroke="currentColor" style={{width: 20, height: 20}}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    Novo Produto
                </Link>
            </div>
            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                    <tr>
                        <th style={{width: '80px'}}>Imagem</th>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th style={{textAlign: 'center'}}>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                                {product.mainImage ? (
                                    <Image src={product.mainImage} alt={product.name} width={60} height={60}
                                           className="product-preview-image"/>
                                ) : (
                                    <div style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: 'var(--cinza-claro)',
                                        borderRadius: '8px'
                                    }}/>
                                )}
                            </td>
                            <td className="product-name">{product.name}</td>
                            <td>R$ {product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <div className="action-links">
                                    <Link href={`/admin/products/edit/${product._id}`}
                                          className="edit-link">Editar</Link>
                                    <button onClick={() => handleDelete(product._id, product.name)}
                                            className="delete-button">Deletar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}