(function () {
    function carregarConfiguracoes(instance) {
        const configSalva = localStorage.getItem('alttab_config_3d');
        if (configSalva) {
            try {
                const configs = JSON.parse(configSalva);
                return { ...window.CalculatorModule.getDefaultConfig(), ...configs };
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
            }
        }

        return window.CalculatorModule.getDefaultConfig();
    }

    window.CalculatorModule.carregarConfiguracoes = carregarConfiguracoes;
})();
