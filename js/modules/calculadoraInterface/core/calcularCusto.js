(function () {
    function calcularCusto(instance) {
        try {
            const { tempo, peso } = window.CalculadoraUI.obterValoresInputs();

            const erros = window.CalculadoraUI.validarInputs(tempo, peso);
            if (erros.length > 0) {
                UtilsModule.mostrarNotificacao(erros.join('\n'), 'error');
                return;
            }

            const resultado = instance.calculadora.calcularCusto(tempo, peso);
            window.CalculadoraUI.exibirResultado(instance, resultado);

            UtilsModule.mostrarNotificacao('Cálculo realizado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro no cálculo:', error);
            UtilsModule.mostrarNotificacao(
                'Erro no cálculo: ' + error.message,
                'error'
            );
        }
    }

    window.CalculadoraUI.calcularCusto = calcularCusto;
})();
