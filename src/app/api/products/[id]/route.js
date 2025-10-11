import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import {NextResponse} from 'next/server';

export async function GET(request, {params}) {
    // 'params' contém os parâmetros dinâmicos da URL, como o nosso 'id'
    const {id} = params;

    try {
        await dbConnect();

        // Usa o método findById para buscar um único produto pelo seu ID
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json({success: false, error: "Produto não encontrado"}, {status: 404});
        }

        return NextResponse.json({success: true, data: product});

    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        return NextResponse.json({success: false, error: "Erro no servidor"}, {status: 500});
    }
}