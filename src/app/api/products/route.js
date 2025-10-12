import {NextResponse} from 'next/server';
import {getProductById} from '@/lib/productService';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// Função GET (Ler um produto) - Já existente
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

// NOVA FUNÇÃO PUT (Atualizar um produto)
export async function PUT(request, {params}) {
    const {id} = params;
    try {
        const body = await request.json();
        await dbConnect();
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            return NextResponse.json({success: false, error: "Produto não encontrado para atualizar"}, {status: 404});
        }
        return NextResponse.json({success: true, data: updatedProduct});
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}

// NOVA FUNÇÃO DELETE (Deletar um produto)
export async function DELETE(request, {params}) {
    const {id} = params;
    try {
        await dbConnect();
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return NextResponse.json({success: false, error: "Produto não encontrado para deletar"}, {status: 404});
        }
        return NextResponse.json({success: true, data: {}}); // Retorna sucesso com dados vazios
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}