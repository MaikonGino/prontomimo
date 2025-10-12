import {getAllProducts, getProductById} from '@/lib/productService';
import ProductDetailsClient from '@/components/ProductDetailsClient';
import {notFound} from 'next/navigation';

/**
 * Generates the list of product IDs for Next.js to create static pages.
 */
export async function generateStaticParams() {
    const products = await getAllProducts();

    return products.map((product) => ({
        id: product._id.toString(),
    }));
}

/**
 * The server-side page component that fetches data during the build.
 */
export default async function ProductPage({params}) {
    // THE FIX IS HERE: We "await" the params before destructuring the id.
    const {id} = await params;

    const product = await getProductById(id);

    // If the product isn't found, Next.js will show the 404 page.
    if (!product) {
        notFound();
    }

    // Pass the pre-fetched data to the client component for interactivity.
    return <ProductDetailsClient product={product}/>;
}