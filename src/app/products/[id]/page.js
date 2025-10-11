import {getAllProducts, getProductById} from '@/lib/productService';
import ProductDetailsClient from '@/components/ProductDetailsClient';

/**
 * Generates the list of product IDs for Next.js to create static pages during the build.
 */
export async function generateStaticParams() {
    const products = await getAllProducts();

    return products.map((product) => ({
        id: product._id.toString(), // Ensures the ID is a string
    }));
}

/**
 * The server-side page component that fetches data during the build.
 */
export default async function ProductPage({params}) {
    // A CORREÇÃO ESTÁ AQUI: Nós "esperamos" (await) os parâmetros antes de usá-los.
    const resolvedParams = await params;
    const {id} = resolvedParams;

    const product = await getProductById(id);

    if (!product) {
        // If the product doesn't exist, this will show the default 404 page.
        const {notFound} = await import('next/navigation');
        notFound();
    }

    // Passes the pre-fetched data to the client component for interactivity.
    return <ProductDetailsClient product={product}/>;
}