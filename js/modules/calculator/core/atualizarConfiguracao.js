(function () {
    function atualizarConfiguracao(instance, chave, valor) {
        if (Object.prototype.hasOwnProperty.call(instance.configuracoes, chave)) {
            instance.configuracoes[chave] = parseFloat(valor);
            window.CalculatorModule.salvarConfiguracoes(instance);
            return true;
        }
        return false;
    }

    window.CalculatorModule.atualizarConfiguracao = atualizarConfiguracao;
})();
