"use client";

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import RichTextEditor from './RichTextEditor'; // 1. Importa o nosso novo editor
import './ProductForm.css';

export default function ProductForm({product, isEditing = false}) {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        brand: product?.brand || '',
        description: product?.description || '',
        price: product?.price || 0,
        stock: product?.stock || 0,
        mainImage: product?.mainImage || '',
    });
    const router = useRouter();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleDescriptionChange = (value) => {
        setFormData(prev => ({...prev, description: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `/api/products/${product._id}` : '/api/products';
        const method = isEditing ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });

        router.push('/admin/dashboard');
        router.refresh();
    };

    return (
        <div className="form-container">
            <h1 className="form-title">{isEditing ? 'Editar Produto' : 'Criar Novo Produto'}</h1>
            <form onSubmit={handleSubmit} className="product-form">
                {/* Outros campos do formulário (sem alterações) */}
                <div className="form-group">
                    <label htmlFor="name">Nome do Produto</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Marca</label>
                    <input type="text" id="brand" name="brand" value={formData.brand} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mainImage">URL da Imagem Principal</label>
                    <input type="url" id="mainImage" name="mainImage" value={formData.mainImage} onChange={handleChange}
                           placeholder="https://..." required/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Preço (ex: 89.90)</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required
                           step="0.01"/>
                </div>
                <div className="form-group">
                    <label htmlFor="stock">Estoque</label>
                    <input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange}
                           required/>
                </div>

                {/* 2. O editor antigo é substituído pelo novo */}
                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <RichTextEditor
                        content={formData.description}
                        onChange={handleDescriptionChange}
                    />
                </div>

                <div className="form-actions">
                    <button type="submit"
                            className="submit-button">{isEditing ? 'Salvar Alterações' : 'Criar Produto'}</button>
                    <Link href="/admin/dashboard" className="cancel-link">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}