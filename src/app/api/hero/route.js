import {NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import HeroSlide from '@/models/HeroSlide';

// Função GET para buscar todos os slides ativos e ordenados
export async function GET(request) {
    try {
        await dbConnect();
        // Busca apenas slides que estão ativos e os ordena pelo campo 'order'
        const slides = await HeroSlide.find({isActive: true}).sort({order: 'asc'});
        return NextResponse.json({success: true, data: slides});
    } catch (error) {
        console.error("Falha ao buscar slides do Hero:", error);
        return NextResponse.json({success: false, error: "Falha ao buscar slides"}, {status: 500});
    }
}

export async function POST(request) {
    const body = await request.json();
    await dbConnect();
    const newSlide = await HeroSlide.create(body);
    revalidatePath('/'); // Limpa o cache da home page
    return NextResponse.json({success: true, data: newSlide}, {status: 201});
}