(function () {
    class ConfiguracaoManager {
        constructor(calculadora) {
            this.calculadora = calculadora;
            this.inicializar();
        }

        inicializar() {
            this.criarInterfaceConfiguracoes();
            this.adicionarEventListeners();
        }

        criarInterfaceConfiguracoes() {
            window.ConfigModule.criarInterfaceConfiguracoes();
        }

        adicionarEventListeners() {
            window.ConfigModule.adicionarEventListeners(this);
        }

        criarBotaoConfiguracoes() {
            window.ConfigModule.criarBotaoConfiguracoes(this);
        }

        abrirModal() {
            window.ConfigModule.abrirModal(this);
        }

        fecharModal() {
            window.ConfigModule.fecharModal();
        }

        trocarTab(tabId) {
            window.ConfigModule.trocarTab(this, tabId);
        }

        carregarValores() {
            window.ConfigModule.carregarValores(this);
        }

        salvarConfiguracoes() {
            window.ConfigModule.salvarConfiguracoes(this);
        }

        lerArquivo(event) {
            window.ConfigModule.lerArquivo(this, event);
        }

        importarConfiguracoes() {
            window.ConfigModule.importarConfiguracoes(this);
        }

        exportarConfiguracoes() {
            window.ConfigModule.exportarConfiguracoes(this);
        }

        resetarConfiguracoes() {
            window.ConfigModule.resetarConfiguracoes(this);
        }

        atualizarPreview() {
            window.ConfigModule.atualizarPreview(this);
        }
    }

    window.ConfiguracaoManager = ConfiguracaoManager;
})();
