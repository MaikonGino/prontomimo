import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Usuário", type: "text"},
                password: {label: "Senha", type: "password"}
            },
            async authorize(credentials, req) {
                // ATENÇÃO: Lógica de autenticação SIMPLES apenas para desenvolvimento.
                // No futuro, isso deve ser trocado por um sistema de usuários no banco de dados.
                if (credentials.username === process.env.ADMIN_USERNAME && credentials.password === process.env.ADMIN_PASSWORD) {
                    return {id: "1", name: "Admin"}; // Usuário autenticado
                }
                return null; // Falha na autenticação
            }
        })
    ],
    pages: {
        signIn: '/login', // Redireciona para a página de login que criaremos
    }
});

export {handler as GET, handler as POST};