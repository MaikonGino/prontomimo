import ProductCard from '@/components/ProductCard';
import {getAllProducts} from '@/lib/productService'; // Importa a função direta do nosso serviço

// A página principal, que é um Server Component e pode ser assíncrona
export default async function HomePage() {
    // Chama a função para buscar os dados diretamente do banco, sem 'fetch'.
    const products = await getAllProducts();

    const heroStyles = {
        backgroundColor: 'var(--verde-salvia)',
        color: 'var(--branco-gelo)',
        textAlign: 'center',
        padding: '80px 20px',
    };
    const heroTitleStyles = {
        fontFamily: 'var(--font-poppins)',
        fontWeight: '800',
        fontSize: '3.5rem',
        marginBottom: '10px'
    };
    const heroSubtitleStyles = {
        fontSize: '1.2rem',
        fontWeight: '400',
        maxWidth: '600px',
        margin: '0 auto'
    };
    const productsSectionStyles = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px',
    };
    const sectionTitleStyles = {
        fontFamily: 'var(--font-poppins)',
        fontWeight: '700',
        color: 'var(--azul-noturno)',
        textAlign: 'center',
        marginBottom: '50px',
        fontSize: '2.5rem'
    };

    return (
        <div>
            <section style={heroStyles}>
                <h1 style={heroTitleStyles}>O presente perfeito, agora.</h1>
                <p style={heroSubtitleStyles}>Soluções inteligentes e entrega rápida para você surpreender em Araras e
                    Americana.</p>
            </section>

            <section style={productsSectionStyles}>
                <h2 style={sectionTitleStyles}>Destaques para você</h2>
                {products.length === 0 && <p style={{textAlign: 'center'}}>Nenhum produto encontrado no momento.</p>}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '40px'
                }}>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </div>
            </section>
        </div>
    );
}