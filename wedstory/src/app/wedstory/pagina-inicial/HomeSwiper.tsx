"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import styles from "./page.module.css";

const slidesData = [
  {
    img: "/assets/noivos.jpeg",
    alt: "Casal",
    title: "Personalize seu site",
    buttonText: "Começar Agora",
    buttonLink: "#",
  },
  {
    img: "/assets/champagne.jpeg",
    alt: "Champagne",
    title: "Lista de Convidados",
    buttonText: "Começar Agora",
    buttonLink: "/wedstory/convidados/lista", 
  },
  {
    img: "/assets/aliancas.jpeg", 
    alt: "Alianças",
    title: "Lista de Presentes",
    buttonText: "Começar Agora",
    buttonLink: "/wedstory/presentes", 
  },
];

export default function HomeSwiper() {
  return (
    <div className={styles.swiper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={false}
        className={styles.swiperInner}
      >
        {slidesData.map((slide, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide} style={{
            backgroundImage: `url(${slide.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
            <h2 className={styles.slideTitle}>{slide.title}</h2>
            <Link href={slide.buttonLink} className={styles.slideButton}>
              {slide.buttonText}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
