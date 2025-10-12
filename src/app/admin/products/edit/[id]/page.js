import ProductForm from '@/components/ProductForm';
import {getProductById} from '@/lib/productService'; // Importa a função para buscar dados no servidor
import {notFound} from 'next/navigation';

// Esta página agora é um Server Component, responsável por buscar os dados.
export default async function EditProductPage({params}) {
    const {id} = params;
    const product = await getProductById(id);

    // Se o produto não for encontrado no banco de dados, mostra a página 404.
    if (!product) {
        notFound();
    }

    // Renderiza o formulário em modo "Edição", passando os dados do produto já carregados.
    // Isso elimina a necessidade de useEffect e useState para buscar dados.
    return <ProductForm product={product} isEditing={true}/>;
}