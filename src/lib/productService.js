import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// Conecta ao banco de dados e busca todos os produtos
export async function getAllProducts() {
    try {
        await dbConnect();
        const products = await Product.find({}).lean();
        // Converte os dados para um formato seguro para passar entre componentes
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error);
        throw new Error("Não foi possível buscar os produtos.");
    }
}

// Conecta ao banco de dados e busca um produto por ID
export async function getProductById(id) {
    try {
        await dbConnect();
        const product = await Product.findById(id).lean();
        if (!product) {
            return null;
        }
        return JSON.parse(JSON.stringify(product));
    } catch (error) {
        console.error(`Erro ao buscar produto com ID ${id}:`, error);
        throw new Error("Não foi possível buscar o produto.");
    }
}