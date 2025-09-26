(function () {
    class CalculadoraOrcamento3D {
        constructor() {
            this.configuracoes = window.CalculatorModule.carregarConfiguracoes(this);
            window.CalculatorModule.inicializar(this);
        }

        carregarConfiguracoes() {
            this.configuracoes = window.CalculatorModule.carregarConfiguracoes(this);
            return this.configuracoes;
        }

        salvarConfiguracoes() {
            return window.CalculatorModule.salvarConfiguracoes(this);
        }

        importarConfiguracoes(conteudoTxt) {
            return window.CalculatorModule.importarConfiguracoes(this, conteudoTxt);
        }

        exportarConfiguracoes() {
            return window.CalculatorModule.exportarConfiguracoes(this);
        }

        validarInputs(inputs) {
            return window.CalculatorModule.validarInputs(this, inputs);
        }

        calcularCusto(tempo_h, peso_g) {
            return window.CalculatorModule.calcularCusto(this, tempo_h, peso_g);
        }

        formatarMoeda(valor) {
            return window.CalculatorModule.formatarMoeda(valor);
        }

        atualizarConfiguracao(chave, valor) {
            return window.CalculatorModule.atualizarConfiguracao(this, chave, valor);
        }

        obterConfiguracoes() {
            return window.CalculatorModule.obterConfiguracoes(this);
        }

        resetarConfiguracoes() {
            return window.CalculatorModule.resetarConfiguracoes(this);
        }

        inicializar() {
            return window.CalculatorModule.inicializar(this);
        }
    }

    window.CalculadoraOrcamento3D = CalculadoraOrcamento3D;
    window.calculadora3D = new CalculadoraOrcamento3D();
})();
