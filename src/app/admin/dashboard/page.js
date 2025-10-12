"use client";

import {useSession, signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Proteção: se o usuário não estiver logado, redireciona para o login.
        if (status === 'unauthenticated') {
            router.push('/login');
        }
        if (status === 'authenticated') {
            // Busca os produtos da nossa API
            fetch('/api/products').then(res => res.json()).then(data => {
                setProducts(data.data);
            });
        }
    }, [status, router]);

    if (status === 'loading') {
        return <p>Carregando...</p>;
    }

    // ... (Aqui vai o JSX que mostra a lista de produtos com botões de Editar/Deletar)
    return (
        <div>
            <h1>Dashboard de Produtos</h1>
            {/* ... Lista de produtos ... */}
        </div>
    );
}