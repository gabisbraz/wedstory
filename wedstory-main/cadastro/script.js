document.addEventListener('DOMContentLoaded', () => {
    //SELEÇÃO DE NOIVO OU NOIVA
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.bride-button');
        if (!btn) return;

        const group = btn.closest('.select-buttons'); 

        group.querySelectorAll('.bride-button').forEach(b => {
            b.classList.remove('selected');
            b.setAttribute('aria-checked', 'false');
        });


        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
    });

    //BOTAO DE PROXIMO E VOLTAR
    const pagUm = document.querySelector('.pageOne');
    const pagDois = document.querySelector('.pageTwo');

    document.addEventListener('click', (e) => {
        const el = e.target.closest('.next-button, .back-button');
        if (!el) return;
        e.preventDefault();

        pagUm.classList.toggle('hidden'); 
        pagDois.classList.toggle('hidden');
    });

});