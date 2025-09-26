(function () {
    function criarBotaoConfiguracoes(instance) {
        if (document.getElementById('btn-configuracoes')) {
            return;
        }

        const btnConfig = document.createElement('button');
        btnConfig.id = 'btn-configuracoes';
        btnConfig.className = 'btn btn-config';
        btnConfig.innerHTML = '⚙️ Configurações';
        btnConfig.addEventListener('click', () => window.ConfigModule.abrirModal(instance));

        const header = document.querySelector('header') || document.querySelector('.container');
        if (header) {
            header.appendChild(btnConfig);
        }
    }

    window.ConfigModule.criarBotaoConfiguracoes = criarBotaoConfiguracoes;
})();
