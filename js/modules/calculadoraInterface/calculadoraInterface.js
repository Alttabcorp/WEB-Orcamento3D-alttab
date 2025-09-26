(function () {
    class CalculadoraInterface {
        constructor(calculadora) {
            this.calculadora = calculadora;
            window.CalculadoraUI.initEventListeners(this);
        }

        obterValoresInputs() {
            return window.CalculadoraUI.obterValoresInputs();
        }

        validarInputs(tempo, peso) {
            return window.CalculadoraUI.validarInputs(tempo, peso);
        }

        calcularCusto() {
            window.CalculadoraUI.calcularCusto(this);
        }

        calcularCustoAutomatico() {
            window.CalculadoraUI.calcularCustoAutomatico(this);
        }

        exibirResultado(resultado) {
            window.CalculadoraUI.exibirResultado(this, resultado);
        }

        ocultarResultado() {
            window.CalculadoraUI.ocultarResultado();
        }

        atualizarElemento(elementId, valor) {
            window.CalculadoraUI.atualizarElemento(elementId, valor);
        }

        scrollParaResultado() {
            window.CalculadoraUI.scrollParaResultado();
        }

        limparCalculadora() {
            window.CalculadoraUI.limparCalculadora(this);
        }

        exportarResultado() {
            return window.CalculadoraUI.exportarResultado();
        }

        async copiarResultado() {
            await window.CalculadoraUI.copiarResultado(this);
        }

        adicionarBotaoCopiar() {
            window.CalculadoraUI.adicionarBotaoCopiar(this);
        }
    }

    window.CalculadoraInterface = CalculadoraInterface;
})();
