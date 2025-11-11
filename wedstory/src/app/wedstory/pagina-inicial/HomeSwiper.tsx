"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function HomeSwiper() {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/slides");
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error("Erro ao carregar slides:", err);
      }
    }
    fetchSlides();
  }, []);

  if (slides.length === 0) {
    return <p className={styles.loading}>Carregando slides...</p>;
  }

  return (
    <div className={styles.swiperRoot}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={false}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            <div className={styles.bgWrap}>
              <Image
                src={slide.img}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={styles.bgImage}
              />
            </div>

            <div className={styles.contentCenter}>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <Link href={slide.buttonLink} className={styles.slideButton}>
                {slide.buttonText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
