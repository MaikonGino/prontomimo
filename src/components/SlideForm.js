"use client";

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import './SlideForm.css';

export default function SlideForm({slide, isEditing = false}) {
    const [formData, setFormData] = useState({
        imageUrl: slide?.imageUrl || '',
        linkUrl: slide?.linkUrl || '',
        order: slide?.order || 0,
        isActive: slide?.isActive !== undefined ? slide.isActive : true,
    });
    const router = useRouter();

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({...prev, [name]: type === 'checkbox' ? checked : value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `/api/hero/${slide._id}` : '/api/hero';
        const method = isEditing ? 'PUT' : 'POST';

        await fetch(url, {
            method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });

        router.push('/admin/hero');
        router.refresh();
    };

    return (
        <div className="form-container">
            <h1 className="form-title">{isEditing ? 'Editar Slide' : 'Criar Novo Slide'}</h1>
            <form onSubmit={handleSubmit} className="slide-form">
                <div className="form-group">
                    <label htmlFor="imageUrl">URL da Imagem</label>
                    <input type="url" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
                           placeholder="https://..." required/>
                </div>
                <div className="form-group">
                    <label htmlFor="linkUrl">URL de Destino (Opcional)</label>
                    <input type="url" id="linkUrl" name="linkUrl" value={formData.linkUrl} onChange={handleChange}
                           placeholder="https://..."/>
                </div>
                <div className="form-group">
                    <label htmlFor="order">Ordem de Exibição (0 primeiro)</label>
                    <input type="number" id="order" name="order" value={formData.order} onChange={handleChange}
                           required/>
                </div>
                <div className="form-group" style={{flexDirection: 'row', alignItems: 'center'}}>
                    <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive}
                           onChange={handleChange} style={{width: 'auto'}}/>
                    <label htmlFor="isActive">Slide Ativo</label>
                </div>
                <div className="form-actions">
                    <button type="submit"
                            className="submit-button">{isEditing ? 'Salvar Alterações' : 'Criar Slide'}</button>
                    <Link href="/admin/hero" className="cancel-link">Cancelar</Link>
                </div>
            </form>
        </div>
    );
}