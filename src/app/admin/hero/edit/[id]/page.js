"use client";

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import SlideForm from '@/components/SlideForm';

export default function EditSlidePage() {
    const {id} = useParams();
    const [slide, setSlide] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/hero/${id}`).then(res => res.json()).then(data => setSlide(data.data));
        }
    }, [id]);

    if (!slide) return <div style={{textAlign: 'center', padding: '50px'}}>Carregando slide...</div>;

    return <SlideForm slide={slide} isEditing={true}/>;
}