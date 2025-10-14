"use client";

import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Autoplay, EffectFade} from 'swiper/modules';
import Link from 'next/link';

// Importa os estilos do Swiper e os nossos estilos personalizados
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroCarousel.css';

export default function HeroCarousel() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/hero')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSlides(data.data);
                }
                setLoading(false);
            });
    }, []);

    // Enquanto carrega, mostra um placeholder elegante
    if (loading && slides.length === 0) {
        return <div className="hero-carousel"/>;
    }

    // Se não houver slides cadastrados, não renderiza nada
    if (slides.length === 0) {
        return null;
    }

    return (
        <div className="hero-carousel">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{clickable: true}}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                style={{height: '100%'}}
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide._id}>
                        {slide.linkUrl ? (
                            <Link href={slide.linkUrl} target="_blank" rel="noopener noreferrer">
                                <img src={slide.imageUrl} alt={slide.title || 'Slide do Carrossel'}
                                     className="swiper-slide-image"/>
                            </Link>
                        ) : (
                            <img src={slide.imageUrl} alt={slide.title || 'Slide do Carrossel'}
                                 className="swiper-slide-image"/>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}