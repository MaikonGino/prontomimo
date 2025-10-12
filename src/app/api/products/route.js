import {NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import {revalidatePath} from 'next/cache'; // 1. Importa o comando de revalidação

export async function GET(request) {
    try {
        await dbConnect();
        const products = await Product.find({});
        return NextResponse.json({success: true, data: products});
    } catch (error) {
        return NextResponse.json({success: false, error: "Falha ao buscar produtos"}, {status: 500});
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await dbConnect();
        const newProduct = await Product.create(body);

        revalidatePath('/'); // 2. Diz ao Next.js para regenerar a home page

        return NextResponse.json({success: true, data: newProduct}, {status: 201});
    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400});
    }
}