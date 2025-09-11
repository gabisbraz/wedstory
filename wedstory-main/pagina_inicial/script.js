const slidesData = [
  {
    img: "imgs/noivos.jpeg",      
    alt: "Casal",                 
    title: "Personalize seu site", 
    buttonText: "Começar Agora",   
    buttonLink: "#"               
  },
  {
    img: "imgs/champagne.jpeg",
    alt: "Champagne",
    title: "Lista de Convidados",
    buttonText: "Começar Agora",
    buttonLink: "../wedstory-feature-dev/assets/index.html"
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
  loop: true, 
  navigation: { 
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: { // Define os bullets de paginação
    el: '.swiper-pagination',
    clickable: true, 
  },
  autoplay: false, // Desativa a troca automática de slides
});
