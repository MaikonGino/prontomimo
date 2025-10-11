import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function getAllProducts() {
    try {
        await dbConnect();
        const products = await Product.find({}).lean();
        return JSON.parse(JSON.stringify(products));
    } catch (error) {
        console.error("Erro ao buscar todos os produtos:", error);
        throw new Error("Não foi possível buscar os produtos.");
    }
}

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