import ProductList from '@/components/ProductList';
import {getAllProducts} from '@/lib/productService';
import HeroCarousel from '@/components/HeroCarousel';
import './HomePage.css';

export default async function HomePage() {
    let products = await getAllProducts();

    products.sort((a, b) => {
        if (a.stock > 0 && b.stock === 0) return -1;
        if (a.stock === 0 && b.stock > 0) return 1;
        return 0;
    });

    return (
        <div>
            {/* O componente estático de texto foi substituído pelo carrossel dinâmico */}
            <HeroCarousel/>

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