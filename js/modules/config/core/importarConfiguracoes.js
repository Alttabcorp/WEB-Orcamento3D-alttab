(function () {
    function importarConfiguracoes(instance) {
        if (!instance?.conteudoArquivo) {
            alert('Por favor, selecione um arquivo primeiro.');
            return;
        }

        const sucesso = instance.calculadora.importarConfiguracoes(instance.conteudoArquivo);
        if (sucesso) {
            alert('Configurações importadas com sucesso!');
            window.ConfigModule.carregarValores(instance);
            window.ConfigModule.atualizarPreview(instance);
        } else {
            alert('Erro ao importar configurações. Verifique o formato do arquivo.');
        }
    }

    window.ConfigModule.importarConfiguracoes = importarConfiguracoes;
})();
