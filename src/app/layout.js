import {Poppins} from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import PageTransition from '@/components/PageTransition';
import Providers from '@/providers'; // 1. Import the new Providers component

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
});

export const metadata = {
    viewport: 'width=device-width, initial-scale=1',
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
        <body className={poppins.variable} style={{overflowX: 'hidden'}}>
        {/* 2. Wrap everything inside the <body> with the Providers component */}
        <Providers>
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                <CartProvider>
                    <Header/>
                    <main style={{
                        flex: '1',
                        position: 'relative',
                        overflow: 'hidden',
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
        </Providers>
        </body>
        </html>
    );
}