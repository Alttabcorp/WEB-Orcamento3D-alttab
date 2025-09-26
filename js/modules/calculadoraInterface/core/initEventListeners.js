(function () {
    function initEventListeners(instance) {
        const btnCalcular = document.getElementById('calcular-custo');
        const btnLimpar = document.getElementById('limpar-calculo');

        if (btnCalcular) {
            btnCalcular.addEventListener('click', () => instance.calcularCusto());
        }

        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => instance.limparCalculadora());
        }

        const tempoInput = document.getElementById('tempo-impressao');
        const pesoInput = document.getElementById('peso-peca');

        if (tempoInput && pesoInput) {
            const calcularAutoDebounced = UtilsModule.debounce(() => {
                instance.calcularCustoAutomatico();
            }, 500);

            tempoInput.addEventListener('input', calcularAutoDebounced);
            pesoInput.addEventListener('input', calcularAutoDebounced);
        }
    }

    window.CalculadoraUI.initEventListeners = initEventListeners;
})();
