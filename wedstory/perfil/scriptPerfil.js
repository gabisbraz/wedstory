window.addEventListener('DOMContentLoaded', () => {
    
    // Botão Salvar
    const btnSalvar = document.getElementById('btnSalvar');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', () => {
            alert('Salvo por enquanto!');
        });
    }
    
    // Botão Alterar Senha
    const btnAlterarSenha = document.getElementById('btnAlterarSenha');
    if (btnAlterarSenha) {
        btnAlterarSenha.addEventListener('click', () => {
            alert('Essa funcionalidade ainda está em desenvolvimento.');
        });
    }
    
});