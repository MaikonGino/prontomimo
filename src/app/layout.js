import {Poppins} from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import PageTransition from '@/components/PageTransition';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://prontomimo.web.app'),
    title: 'Pronto Mimo',
    description: 'Presentes de última hora em Araras e Americana.',
    openGraph: {
        title: 'Pronto Mimo',
        description: 'A solução inteligente para presentes de última hora.',
        images: [{url: '/logo-pronto-mimo.jpg', width: 1200, height: 630, alt: 'Logo da Pronto Mimo'}],
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="pt-br">
        <body className={poppins.variable}>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <CartProvider>
                <Header/>
                {/* A CORREÇÃO DEFINITIVA ESTÁ AQUI: */}
                {/* 1. Trocamos 'overflow: hidden' por 'overflowX: hidden'. Isso contém a animação de slide */}
                {/* HORIZONTALMENTE, mas libera o fluxo VERTICAL. */}
                {/* 2. 'flex: 1' garante que o main ocupe todo o espaço disponível, empurrando o footer. */}
                <main style={{
                    flex: '1',
                    position: 'relative',
                    overflowX: 'hidden', // Apenas o eixo X é escondido
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <PageTransition>{children}</PageTransition>
                </main>
                <Footer/>
                <CartSidebar/>
                <Modal/>
            </CartProvider>
        </div>
        </body>
        </html>
    );
}