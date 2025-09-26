(function () {
    function resetarConfiguracoes(instance) {
        instance.configuracoes = window.CalculatorModule.getDefaultConfig();
        window.CalculatorModule.salvarConfiguracoes(instance);
    }

    window.CalculatorModule.resetarConfiguracoes = resetarConfiguracoes;
})();
