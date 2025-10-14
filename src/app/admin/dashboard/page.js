"use client";

import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useCart} from '@/context/CartContext';
import './DashboardPage.css';

const LoadingSpinner = () => <div style={{textAlign: 'center', padding: '50px', fontSize: '1.2rem'}}>Carregando
    Dashboard...</div>;

export default function DashboardPage() {
    const {data: session, status} = useSession({
        // A CORREÇÃO DO "CARREGANDO INFINITO" ESTÁ AQUI:
        // Exigimos que o hook de sessão verifique o login no servidor.
        // Isso impede que ele fique preso no estado 'loading' no cliente.
        required: true,
        onUnauthenticated() {
            // Se a verificação falhar, redireciona para o login.
            router.replace('/login');
        },
    });
    const router = useRouter();
    const {openModal} = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // O useEffect agora só busca os produtos, pois a proteção de rota é feita pelo useSession.
    useEffect(() => {
        setLoading(true);
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data);
                }
                setLoading(false);
            });
    }, []); // Roda apenas uma vez quando o componente monta

    const handleDelete = (productId, productName) => {
        openModal(
            'Confirmar Exclusão',
            `Tem certeza que deseja deletar permanentemente o produto "${productName}"?`,
            'error',
            async () => {
                await fetch(`/api/products/${productId}`, {method: 'DELETE'});
                setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
            }
        );
    };

    // Se a sessão ainda estiver carregando, mostramos o spinner.
    if (status === 'loading' || loading) {
        return <LoadingSpinner/>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                {/* GRUPO DE BOTÕES DE AÇÃO */}
                <div style={{display: 'flex', gap: '15px'}}>
                    <Link href="/admin/hero" className="new-product-button"
                          style={{backgroundColor: 'var(--azul-profundo)'}}>
                        Gerenciar Carrossel
                    </Link>
                    <Link href="/admin/products/new" className="new-product-button">
                        + Novo Produto
                    </Link>
                </div>
            </div>

            {/* Layout de Tabela para Desktop */}
            <div className="products-table-wrapper">
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
                                {product.mainImage &&
                                    <Image src={product.mainImage} alt={product.name} width={60} height={60}
                                           className="product-preview-image"/>}
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

            {/* Novo Layout de Cards para Mobile */}
            <div className="mobile-card-list">
                {products.map(product => (
                    <div key={product._id} className="product-card-mobile">
                        {product.mainImage && <Image src={product.mainImage} alt={product.name} width={80} height={80}
                                                     className="card-mobile-image"/>}
                        <div className="card-mobile-info">
                            <h3 className="card-mobile-name">{product.name}</h3>
                            <p className="card-mobile-details">Preço: R$ {product.price.toFixed(2)} |
                                Estoque: {product.stock}</p>
                            <div className="card-mobile-actions">
                                <Link href={`/admin/products/edit/${product._id}`} className="edit-link">Editar</Link>
                                <button onClick={() => handleDelete(product._id, product.name)}
                                        className="delete-button">Deletar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}