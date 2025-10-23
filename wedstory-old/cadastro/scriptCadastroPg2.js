function togglePassword(element, inputId) {
    const senhaInput = document.getElementById(inputId);
    const toggleIcon = element.querySelector('img');
    
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        toggleIcon.src = '../assets/olho-aberto.png'; // muda para olho aberto
    } else {
        senhaInput.type = 'password';
        toggleIcon.src = '../assets/olho-fechado.png'; // volta para olho fechado
    }
}