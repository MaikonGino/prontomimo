import ProductCard from '@/components/ProductCard';

async function getProducts() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error('Falha ao buscar produtos');
    }

    return res.json();
}

export default async function HomePage() {
    const { data: products } = await getProducts();

    return (
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
            <h1 style={{
                fontFamily: 'var(--font-poppins)', // Garante a fonte correta
                fontWeight: '700', // Deixa o título em negrito
                color: 'var(--azul-noturno)',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                Nossos Mimos
            </h1>

            {products.length === 0 && <p>Nenhum produto encontrado.</p>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px'
            }}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </main>
    );
}