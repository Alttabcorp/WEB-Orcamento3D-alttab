(function () {
    function obterConfiguracoes(instance) {
        return { ...instance.configuracoes };
    }

    window.CalculatorModule.obterConfiguracoes = obterConfiguracoes;
})();
