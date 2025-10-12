/** @type {import('next').NextConfig} */
const nextConfig = {
    // O projeto agora é uma aplicação Next.js padrão,
    // com otimização de imagem e renderização no servidor ativadas.

    // 1. Adicionamos a configuração de 'images'
    images: {
        // 2. 'remotePatterns' é a forma moderna e segura de autorizar domínios
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co', // Autoriza o domínio do seu provedor de imagens
                port: '',
                pathname: '/**', // Permite qualquer imagem dentro deste domínio
            },
        ],
    },
};

export default nextConfig;