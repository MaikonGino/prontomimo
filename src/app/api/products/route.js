import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import {NextResponse} from 'next/server';

/**
 * @description Manipula requisições GET para buscar todos os produtos.
 * @param {Request} request - O objeto da requisição.
 * @returns {NextResponse} Uma resposta JSON com a lista de produtos ou um erro.
 */
export async function GET(request) {
    try {
        // Conecta ao banco de dados de forma segura e otimizada
        await dbConnect();

        // Pede ao Mongoose para encontrar TODOS os produtos na coleção
        const products = await Product.find({});

        // Envia uma resposta de sucesso com a lista de produtos em formato JSON
        return NextResponse.json({success: true, data: products});

    } catch (error) {
        // Se qualquer coisa der errado no processo, envia uma resposta de erro
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json({success: false, error: "Erro no servidor"}, {status: 500});
    }
}

/**
 * @description Manipula requisições POST para criar um novo produto.
 * @param {Request} request - O objeto da requisição, contendo os dados do produto no corpo.
 * @returns {NextResponse} Uma resposta JSON com o produto criado ou um erro.
 */
export async function POST(request) {
    try {
        // Pega os dados do produto que foram enviados no corpo da requisição
        const body = await request.json();

        // Conecta ao banco de dados
        await dbConnect();

        // Usa nosso "molde" (Model) para criar um novo produto no banco de dados
        const newProduct = await Product.create(body);

        // Retorna uma resposta de sucesso com o produto que foi criado
        return NextResponse.json({success: true, data: newProduct}, {status: 201}); // 201 = Created

    } catch (error) {
        // Se houver um erro (ex: campo obrigatório faltando), retorna um erro
        console.error("Erro ao criar produto:", error);
        return NextResponse.json({success: false, error: error.message}, {status: 400}); // 400 = Bad Request
    }
}