"use client";

import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            redirect: false, // Não redireciona automaticamente
            username,
            password,
        });

        if (result.error) {
            setError('Credenciais inválidas. Tente novamente.');
        } else {
            // Se o login for bem-sucedido, redireciona para o dashboard
            router.push('/admin/dashboard');
        }
    };

    // ... (Aqui vai o JSX do formulário de login)
    return (
        <div style={{maxWidth: '400px', margin: '100px auto'}}>
            <h1>Área Restrita</h1>
            <form onSubmit={handleSubmit}>
                {/* ... campos de usuário, senha e botão ... */}
            </form>
        </div>
    );
}