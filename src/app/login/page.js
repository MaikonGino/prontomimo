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
            redirect: false,
            username,
            password,
        });

        if (result.error) {
            setError('Credenciais inválidas. Tente novamente.');
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div style={{maxWidth: '400px', margin: '100px auto', padding: '20px'}}>
            <h1 style={{textAlign: 'center', color: 'var(--azul-profundo)'}}>Área Restrita</h1>
            <form onSubmit={handleSubmit}
                  style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px'}}>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário"
                       required style={{padding: '15px', borderRadius: '8px', border: '1px solid var(--cinza-claro)'}}/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       placeholder="Senha" required
                       style={{padding: '15px', borderRadius: '8px', border: '1px solid var(--cinza-claro)'}}/>
                {error && <p style={{color: 'var(--vermelho-alerta)'}}>{error}</p>}
                <button type="submit" style={{
                    padding: '15px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--azul-profundo)',
                    color: 'var(--branco)',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>Entrar
                </button>
            </form>
        </div>
    );
}