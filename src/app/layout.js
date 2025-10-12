import {Poppins} from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import PageTransition from '@/components/PageTransition';
import Providers from '@/providers';
import { Analytics } from "@vercel/analytics/next"

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
        title: 'Pronto Mimo | Presentes perfeitos, agora.',
        description: 'A solução inteligente para presentes de última hora com entrega rápida em Araras e Americana.',
        url: 'https://prontomimo.web.app',
        siteName: 'Pronto Mimo',
        images: [
            {
                url: '/opengraph.png',
                width: 1200,
                height: 630,
                alt: 'Pronto Mimo - A solução para presentes de última hora.',
            },
        ],
        locale: 'pt_BR',
        type: 'website',
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="pt-br">
        <body className={poppins.variable} style={{overflowX: 'hidden'}}>
        {/* A CORREÇÃO ESTÁ AQUI: */}
        {/* O componente <Providers> (que contém o SessionProvider) agora envolve toda a aplicação. */}
        {/* Isso permite que qualquer componente saiba se o usuário está logado. */}
        <Providers>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <CartProvider>
                    <Header/>
                    <main style={{
                        flex: '1',
                        position: 'relative',
                        overflowX: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <PageTransition>{children}</PageTransition>
                    </main>
                    <Footer/>
                    <CartSidebar/>
                    <Modal/>
                </CartProvider>
            </div>
        </Providers>
        </body>
        </html>
    );
}