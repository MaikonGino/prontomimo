import {NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import {revalidatePath} from 'next/cache'; // 1. Importa o comando

export async function GET(request, {params}) {
    const {id} = params;
    try {
        await dbConnect();
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({success: false, error: "Produto não encontrado"}, {status: 404});
        }
        return NextResponse.json({success: true, data: product});
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 500});
    }
}

export async function PUT(request, {params}) {
    const {id} = params;
    try {
        const body = await request.json();
        await dbConnect();
        const updatedProduct = await Product.findByIdAndUpdate(id, body, {new: true, runValidators: true});

        revalidatePath('/'); // 2. Regenera a home page após uma edição
        revalidatePath(`/products/${id}`); // Regenera a página de detalhes do produto específico

        if (!updatedProduct) {
            return NextResponse.json({success: false, error: "Produto não encontrado para atualizar"}, {status: 404});
        }
        return NextResponse.json({success: true, data: updatedProduct});
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}

export async function DELETE(request, {params}) {
    const {id} = params;
    try {
        await dbConnect();
        const deletedProduct = await Product.findByIdAndDelete(id);

        revalidatePath('/'); // 3. Regenera a home page após uma exclusão
        revalidatePath(`/products/${id}`); // Invalida a página de detalhes do produto deletado

        if (!deletedProduct) {
            return NextResponse.json({success: false, error: "Produto não encontrado para deletar"}, {status: 404});
        }
        return NextResponse.json({success: true, data: {}});
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}