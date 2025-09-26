(function () {
    function adicionarEventListeners(instance) {
        window.ConfigModule.criarBotaoConfiguracoes(instance);

        const modal = document.getElementById('configuracoesModal');
        if (!modal) {
            return;
        }

        const closeBtn = modal.querySelector('.close');
        const cancelBtn = document.getElementById('cancelar-config');
        const salvarBtn = document.getElementById('salvar-config');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => window.ConfigModule.fecharModal());
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => window.ConfigModule.fecharModal());
        }
        if (salvarBtn) {
            salvarBtn.addEventListener('click', () => window.ConfigModule.salvarConfiguracoes(instance));
        }

        const tabButtons = modal.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => window.ConfigModule.trocarTab(instance, button.dataset.tab));
        });

        const importarBtn = document.getElementById('importar-config');
        const exportarBtn = document.getElementById('exportar-config');
        const resetarBtn = document.getElementById('resetar-config');
        const fileInput = document.getElementById('config-file');

        if (importarBtn) {
            importarBtn.addEventListener('click', () => window.ConfigModule.importarConfiguracoes(instance));
        }
        if (exportarBtn) {
            exportarBtn.addEventListener('click', () => window.ConfigModule.exportarConfiguracoes(instance));
        }
        if (resetarBtn) {
            resetarBtn.addEventListener('click', () => window.ConfigModule.resetarConfiguracoes(instance));
        }
        if (fileInput) {
            fileInput.addEventListener('change', (e) => window.ConfigModule.lerArquivo(instance, e));
        }

        if (instance._outsideClickHandler) {
            window.removeEventListener('click', instance._outsideClickHandler);
        }

        instance._outsideClickHandler = (e) => {
            if (e.target === modal) {
                window.ConfigModule.fecharModal();
            }
        };
        window.addEventListener('click', instance._outsideClickHandler);
    }

    window.ConfigModule.adicionarEventListeners = adicionarEventListeners;
})();
