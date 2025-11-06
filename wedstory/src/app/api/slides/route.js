export async function GET() {
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

  return Response.json(slidesData);
}
