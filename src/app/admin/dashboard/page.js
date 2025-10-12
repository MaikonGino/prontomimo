"use client";

import {useSession, signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export default function DashboardPage() {
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(() => {
        // Proteção: se o usuário não estiver logado, redireciona para a página de login.
        if (status === 'unauthenticated') {
            router.replace('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <p style={{textAlign: 'center', padding: '50px'}}>Carregando...</p>;
    }

    if (status === 'authenticated') {
        return (
            <div style={{maxWidth: '800px', margin: '50px auto', padding: '20px'}}>
                <h1 style={{color: 'var(--azul-profundo)'}}>Bem-vindo ao Dashboard, {session.user.name}!</h1>
                <p style={{marginTop: '20px'}}>Esta é a sua área de administração. Em breve, você poderá gerenciar
                    produtos, visualizar métricas de vendas e muito mais.</p>
                <button onClick={() => signOut({callbackUrl: '/'})} style={{
                    marginTop: '30px',
                    padding: '10px 20px',
                    border: 'none',
                    backgroundColor: 'var(--vermelho-alerta)',
                    color: 'var(--branco)',
                    cursor: 'pointer'
                }}>
                    Sair
                </button>
            </div>
        );
    }

    return null;
}