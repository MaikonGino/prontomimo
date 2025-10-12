import {getAllProducts} from '@/lib/productService';
import ProductList from '@/components/ProductList';
import './HomePage.css'; // Importa o novo CSS

export default async function HomePage() {
    const products = await getAllProducts();

    return (
        <div>
            <section className="hero">
                <h1 className="hero-title">O presente perfeito, agora.</h1>
                <p className="hero-subtitle">Soluções inteligentes e entrega rápida para você surpreender em Araras e
                    Americana.</p>
            </section>
            <section className="products-section">
                <h2 className="section-title">Destaques para você</h2>
                {products.length === 0 ? (
                    <p style={{textAlign: 'center'}}>Nenhum produto encontrado no momento.</p>
                ) : (
                    <ProductList products={products}/>
                )}
            </section>
        </div>
    );
}