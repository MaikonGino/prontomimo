import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                // ATENÇÃO: Lógica de autenticação SIMPLES apenas para desenvolvimento.
                // No futuro, isso deve ser trocado por um sistema de usuários no banco de dados.
                if (credentials.username === "admin" && credentials.password === "mudar123") {
                    // Retorna um objeto de usuário se as credenciais estiverem corretas.
                    return {id: "1", name: "Admin", email: "admin@prontomimo.com"};
                }
                // Retorna null se as credenciais estiverem erradas.
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login', // Redireciona para uma página de login customizada que criaremos
    }
});

export {handler as GET, handler as POST};