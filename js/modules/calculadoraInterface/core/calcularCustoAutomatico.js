(function () {
    function calcularCustoAutomatico(instance) {
        const { tempo, peso } = window.CalculadoraUI.obterValoresInputs();

        if (tempo > 0 && peso >= 0 && !isNaN(tempo) && !isNaN(peso)) {
            try {
                const resultado = instance.calculadora.calcularCusto(tempo, peso);
                window.CalculadoraUI.exibirResultado(instance, resultado);
            } catch (error) {
                console.warn('Erro no cálculo automático:', error);
                window.CalculadoraUI.ocultarResultado();
            }
        } else {
            window.CalculadoraUI.ocultarResultado();
        }
    }

    window.CalculadoraUI.calcularCustoAutomatico = calcularCustoAutomatico;
})();
