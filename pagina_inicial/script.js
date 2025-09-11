// Array de objetos que define os slides do slider
const slidesData = [
  {
    img: "imgs/noivos.jpeg",      // Caminho da imagem
    alt: "Casal",                 // Texto alternativo da imagem
    title: "Personalize seu site", // Título que aparece no slide
    buttonText: "Começar Agora",   // Texto do botão
    buttonLink: "#"               // Link do botão
  },
  {
    img: "imgs/champagne.jpeg",
    alt: "Champagne",
    title: "Lista de Convidados",
    buttonText: "Começar Agora",
    buttonLink: "#"
  },
  {
    img: "imgs/alianças.jpeg",
    alt: "Alianças",
    title: "Lista de Presentes",
    buttonText: "Começar Agora",
    buttonLink: "#"
  }
];

// Seleciona o wrapper do Swiper onde os slides serão inseridos
const swiperWrapper = document.querySelector(".swiper-wrapper");

// Cria os slides dinamicamente com base no array slidesData
slidesData.forEach(slide => {
  const section = document.createElement("section");
  section.classList.add("swiper-slide"); // Adiciona a classe necessária para o Swiper

  // Define a imagem de fundo do slide
  section.style.backgroundImage = `url(${slide.img})`;
  section.style.backgroundSize = "cover";
  section.style.backgroundPosition = "center";
  section.style.backgroundRepeat = "no-repeat";

  // Insere o conteúdo do slide (título e botão)
  section.innerHTML = `
    <h2 class="slide-title">${slide.title}</h2>
    <a class="slide-button" href="${slide.buttonLink}">${slide.buttonText}</a>
  `;

  // Adiciona o slide criado ao wrapper do Swiper
  swiperWrapper.appendChild(section);
});

// Inicializa o Swiper com configuração personalizada
const swiper = new Swiper('.swiper', {
  loop: true, // Permite que os slides fiquem em loop contínuo
  navigation: { // Define os botões de navegação
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: { // Define os bullets de paginação
    el: '.swiper-pagination',
    clickable: true, // Permite clicar nos bullets
  },
  autoplay: false, // Desativa a troca automática de slides
});
