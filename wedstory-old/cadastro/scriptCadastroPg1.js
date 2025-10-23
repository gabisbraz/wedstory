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
})