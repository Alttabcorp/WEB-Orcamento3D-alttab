(function () {
    function salvarConfiguracoes(instance) {
        try {
            localStorage.setItem('alttab_config_3d', JSON.stringify(instance.configuracoes));
            return true;
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            return false;
        }
    }

    window.CalculatorModule.salvarConfiguracoes = salvarConfiguracoes;
})();
