class AppManager {
    constructor() {
        this.calculadora = null;
        this.calculadoraInterface = null;
        this.configManager = null;
        this.pdfGenerator = null;
        this.interfaceManager = null;
        this.inicializada = false;
        this._formSubmitHandler = null;
        this._keydownHandler = null;
        this._visibilityHandler = null;
        this._telefoneHandler = null;
    }

    async inicializar() {
        return window.AppModule.inicializar(this);
    }

    verificarDependencias() {
        return window.AppModule.verificarDependencias();
    }

    configurarEventListeners() {
        return window.AppModule.configurarEventListeners(this);
    }

    configurarFormatacaoTelefone() {
        return window.AppModule.configurarFormatacaoTelefone(this);
    }

    adicionarFuncionalidadesExtras() {
        return window.AppModule.adicionarFuncionalidadesExtras(this);
    }

    handleKeyboardShortcuts(event) {
        return window.AppModule.handleKeyboardShortcuts(this, event);
    }

    onPageVisible() {
        return window.AppModule.onPageVisible(this);
    }

    obterEstatisticas() {
        return window.AppModule.obterEstatisticas(this);
    }

    reiniciar() {
        return window.AppModule.reiniciar(this);
    }

    debug() {
        return window.AppModule.debug(this);
    }
}

// Instância global
window.AppManager = AppManager;
window.appManager = new AppManager();

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.appManager.inicializar();
    });
} else {
    // DOM já carregado
    window.appManager.inicializar();
}
