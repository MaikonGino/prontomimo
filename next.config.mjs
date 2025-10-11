/** @type {import('next').NextConfig} */
const nextConfig = {
    // Instrução para gerar um site estático.
    output: 'export',

    // ESTA É A CORREÇÃO:
    // Desativa a otimização de imagens no servidor,
    // tornando o componente <Image> compatível com o 'output: export'.
    images: {
        unoptimized: true,
    },
};

export default nextConfig;