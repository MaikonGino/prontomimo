import {NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import HeroSlide from '@/models/HeroSlide';
import {revalidatePath} from 'next/cache';

// A CORREÇÃO PRINCIPAL ESTÁ AQUI:
// Garantimos que a função GET sempre retorne um JSON válido.
export async function GET(request, {params}) {
    const {id} = params;
    try {
        await dbConnect();
        const slide = await HeroSlide.findById(id);
        if (!slide) {
            return NextResponse.json({success: false, error: "Slide não encontrado"}, {status: 404});
        }
        return NextResponse.json({success: true, data: slide});
    } catch (error) {
        // Retorna um JSON de erro em caso de falha no servidor
        return NextResponse.json({success: false, error: "Falha ao buscar o slide"}, {status: 500});
    }
}

export async function PUT(request, {params}) {
    const {id} = params;
    const body = await request.json();
    await dbConnect();
    const updatedSlide = await HeroSlide.findByIdAndUpdate(id, body, {new: true, runValidators: true});
    revalidatePath('/');
    return NextResponse.json({success: true, data: updatedSlide});
}

export async function DELETE(request, {params}) {
    const {id} = params;
    await dbConnect();
    await HeroSlide.findByIdAndDelete(id);
    revalidatePath('/');
    return NextResponse.json({success: true, data: {}});
}