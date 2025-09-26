(function () {
    function importarConfiguracoes(instance, conteudoTxt) {
        try {
            const linhas = conteudoTxt.split('\n');
            const novasConfiguracoes = {};

            linhas.forEach(linha => {
                const texto = linha.trim();
                if (texto && texto.includes('=')) {
                    const [chave, valor] = texto.split('=').map(item => item.trim());
                    const valorNumerico = parseFloat(String(valor).replace(',', '.'));
                    if (!isNaN(valorNumerico)) {
                        novasConfiguracoes[chave] = valorNumerico;
                    }
                }
            });

            const atuais = { ...instance.configuracoes };
            Object.keys(atuais).forEach(chave => {
                if (novasConfiguracoes.hasOwnProperty(chave)) {
                    atuais[chave] = novasConfiguracoes[chave];
                }
            });

            instance.configuracoes = atuais;
            return window.CalculatorModule.salvarConfiguracoes(instance);
        } catch (error) {
            console.error('Erro ao importar configurações:', error);
            return false;
        }
    }

    window.CalculatorModule.importarConfiguracoes = importarConfiguracoes;
})();
