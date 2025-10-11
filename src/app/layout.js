import {Poppins} from 'next/font/google';
import './globals.css';
import {CartProvider} from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

// Configuração otimizada da fonte Poppins
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700', '800'],
    variable: '--font-poppins',
    display: 'swap',
});

// Metadados do site para SEO
export const metadata = {
    title: 'Pronto Mimo',
    description: 'Presentes de última hora em Araras e Americana.',
};

export default function RootLayout({children}) {
    return (
        <html lang="pt-br">
        <body className={poppins.variable} style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <CartProvider>
            <Header/>
            {/* A 'main' agora tem um estilo que aplica a animação de fade-in */}
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