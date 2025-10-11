import {Poppins} from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
});

// Metadados do site para SEO e pré-visualização de links
export const metadata = {
    metadataBase: new URL('https://prontomimo.web.app'), // 1. URL base do seu site
    title: 'Pronto Mimo',
    description: 'Presentes de última hora em Araras e Americana.',
    openGraph: {
        title: 'Pronto Mimo',
        description: 'A solução inteligente para presentes de última hora.',
        images: [
            {
                url: '/logo-pronto-mimo.jpg', // 2. Caminho para sua imagem na pasta public
                width: 1200,
                height: 630,
                alt: 'Logo da Pronto Mimo',
            },
        ],
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="pt-br">
        <body className={poppins.variable} style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <CartProvider>
            <Header/>
            <main style={{flexGrow: 1, animation: 'fadeIn 0.5s ease-in-out'}}>
                {children}
            </main>
            <CartSidebar/>
            <Footer/>
            <Modal/>
        </CartProvider>
        </body>
        </html>
    );
}