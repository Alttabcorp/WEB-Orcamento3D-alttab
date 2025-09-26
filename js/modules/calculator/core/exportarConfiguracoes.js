(function () {
    function exportarConfiguracoes(instance) {
        let conteudo = '# Configurações Alttab 3D\n';
        conteudo += '# Gerado em: ' + new Date().toLocaleString('pt-BR') + '\n\n';

        Object.entries(instance.configuracoes).forEach(([chave, valor]) => {
            conteudo += `${chave}=${valor}\n`;
        });

        return conteudo;
    }

    window.CalculatorModule.exportarConfiguracoes = exportarConfiguracoes;
})();
