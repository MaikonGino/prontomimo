"use client";

import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import Image from 'next/image';
import {motion} from 'framer-motion';
import './LoginPage.css'; // Importa nosso novo arquivo de estilos

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Novo estado para o feedback de carregamento
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Ativa o estado de carregamento

        try {
            const result = await signIn('credentials', {
                redirect: false,
                username,
                password,
            });

            if (result.error) {
                setError('Credenciais inválidas. Tente novamente.');
            } else {
                router.replace('/admin/dashboard'); // 'replace' é melhor para login, não deixa voltar no histórico
            }
        } finally {
            setLoading(false); // Desativa o carregamento, mesmo se der erro
        }
    };

    return (
        <div className="login-container">
            <motion.div
                className="login-card"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, ease: 'easeOut'}}
            >
                <div className="login-logo">
                    <Image
                        src="/logo-pronto-mimo.jpg"
                        alt="Logo da Pronto Mimo"
                        width={120}
                        height={40}
                        style={{objectFit: 'contain'}}
                    />
                </div>
                <h1 className="login-title">Acesso Administrativo</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Usuário"
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        required
                        className="input-field"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? (
                            <div className="spinner"></div> // Mostra o spinner se estiver carregando
                        ) : (
                            'Entrar' // Mostra o texto se não estiver carregando
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}