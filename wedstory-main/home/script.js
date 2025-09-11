document.addEventListener('DOMContentLoaded', function() {

    // Seleciona todos os links do nav e footer
    const links = document.querySelectorAll('nav a, footer a');

    // Função para remover a classe 'active' de todos os links
    function removeActive() {
        links.forEach(link => link.classList.remove('active'));
    }

    // Adiciona evento de clique a todos os links
    links.forEach(link => {
        link.addEventListener('click', function() {
            removeActive();         // Remove active de todos
            this.classList.add('active'); // Adiciona active ao clicado
            console.log(`Link ativo: ${this.textContent}`);
        });
    });

});
