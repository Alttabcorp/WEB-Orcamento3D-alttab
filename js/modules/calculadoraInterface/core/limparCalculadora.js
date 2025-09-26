(function () {
    function limparCalculadora(instance) {
        const tempoInput = document.getElementById('tempo-impressao');
        const pesoInput = document.getElementById('peso-peca');

        if (tempoInput) tempoInput.value = '';
        if (pesoInput) pesoInput.value = '';

        window.CalculadoraUI.ocultarResultado();
        UtilsModule.mostrarNotificacao('Calculadora limpa!', 'info');
    }

    window.CalculadoraUI.limparCalculadora = limparCalculadora;
})();
