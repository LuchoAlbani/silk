import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Importa los estilos necesarios de Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Banner.module.css';

interface SlideType {
  id: number;
  image: string;
  buttonText?: string | null;
  buttonAction?: () => void;
}

const slides: SlideType[] = [
  {
    id: 1,
    image: '/images/Banners_1.jpg',
    buttonText: null, // No mostrar botón
  },
  {
    id: 2,
    image: '/images/Banners-02.jpg',
    buttonText: 'CREA TU ARMARIO PERFECTO >',
    buttonAction: () => alert('Crea tu armario perfecto'),
  },
  {
    id: 3,
    image: '/images/Banners-03.jpg',
    buttonText: 'DESCUBRE MÁS >',
    buttonAction: () => alert('Explora más opciones'),
  },
];

const Banner: React.FC = () => {
  return (
    <div className={styles.bannerContainer}>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <img
                src={slide.image}
                alt={`Slide ${slide.id}`}
                className={styles.slideImage}
              />
              {slide.buttonText && slide.buttonAction && (
                <button
                  className={styles.slideButton}
                  onClick={slide.buttonAction}
                >
                  {slide.buttonText}
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
