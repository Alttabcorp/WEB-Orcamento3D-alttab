(function () {
    class InterfaceManager {
        constructor() {
            this.detalhesExpandidos = false;
            this.inicializar();
        }

        inicializar() {
            window.InterfaceModule.configurarEventListeners(this);
            window.InterfaceModule.configurarValidacaoTempoReal(this);
            window.InterfaceModule.configurarContadores(this);
            window.InterfaceModule.ocultarLoadingSpinner();
            window.InterfaceModule.atualizarStatusAplicacao('success', 'Sistema carregado com sucesso!');
        }

        configurarEventListeners() {
            window.InterfaceModule.configurarEventListeners(this);
        }

        configurarValidacaoTempoReal() {
            window.InterfaceModule.configurarValidacaoTempoReal(this);
        }

        validarCampo(campo, tipo, feedbackElement) {
            return window.InterfaceModule.validarCampo(campo, tipo, feedbackElement);
        }

        configurarContadores() {
            window.InterfaceModule.configurarContadores(this);
        }

        toggleDetalhes() {
            window.InterfaceModule.toggleDetalhes(this);
        }

        ocultarLoadingSpinner() {
            window.InterfaceModule.ocultarLoadingSpinner();
        }

        atualizarStatusAplicacao(status, mensagem) {
            window.InterfaceModule.atualizarStatusAplicacao(status, mensagem);
        }

        previewPDF() {
            window.InterfaceModule.previewPDF();
        }

        mostrarAjuda() {
            window.InterfaceModule.mostrarAjuda(this);
        }
    }

    window.InterfaceManager = InterfaceManager;
})();
