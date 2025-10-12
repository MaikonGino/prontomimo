import {NextResponse} from 'next/server';
import {getProductById} from '@/lib/productService'; // Importa nossa nova função

export async function GET(request, {params}) {
    const {id} = params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return NextResponse.json({success: false, error: "Produto não encontrado"}, {status: 404});
        }
        return NextResponse.json({success: true, data: product});
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }
}