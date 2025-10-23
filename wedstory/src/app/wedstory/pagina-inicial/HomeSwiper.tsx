"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const slidesData = [
  { img: "/assets/noivos.jpeg",    alt: "Casal",     title: "Personalize seu site",  buttonText: "Começar Agora", buttonLink: "#" },
  { img: "/assets/champagne.jpeg", alt: "Champagne", title: "Lista de Convidados",   buttonText: "Começar Agora", buttonLink: "/wedstory/convidados/lista" },
  { img: "/assets/aliancas.jpeg",  alt: "Alianças",  title: "Lista de Presentes",    buttonText: "Começar Agora", buttonLink: "/wedstory/presentes" },
];

export default function HomeSwiper() {
  return (
    <div className={styles.swiperRoot}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={false}
      >
        {slidesData.map((slide, i) => (
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
