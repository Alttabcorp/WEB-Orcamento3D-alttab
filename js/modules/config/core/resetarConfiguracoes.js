(function () {
    function resetarConfiguracoes(instance) {
        if (confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão?')) {
            instance.calculadora.resetarConfiguracoes();
            window.ConfigModule.carregarValores(instance);
            window.ConfigModule.atualizarPreview(instance);
            alert('Configurações resetadas para os valores padrão.');
        }
    }

    window.ConfigModule.resetarConfiguracoes = resetarConfiguracoes;
})();
