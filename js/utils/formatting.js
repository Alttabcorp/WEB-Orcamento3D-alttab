(function () {
    function ensureCore(methodName) {
        if (!window.UtilsModuleCore || typeof window.UtilsModuleCore[methodName] !== 'function') {
            console.warn(`UtilsModuleCore.${methodName} não está disponível.`);
            return () => undefined;
        }
        return window.UtilsModuleCore[methodName];
    }

    class UtilsModule {
        static formatarTelefone(evento) {
            return ensureCore('formatarTelefone')(evento);
        }

        static validarCampoObrigatorio(valor, nomeCampo) {
            return ensureCore('validarCampoObrigatorio')(valor, nomeCampo);
        }

        static validarEmail(email) {
            return ensureCore('validarEmail')(email);
        }

        static formatarMoeda(valor) {
            return ensureCore('formatarMoeda')(valor);
        }

        static formatarData(data) {
            return ensureCore('formatarData')(data);
        }

        static sanitizarNomeArquivo(nome) {
            return ensureCore('sanitizarNomeArquivo')(nome);
        }

        static debounce(func, delay) {
            return ensureCore('debounce')(func, delay);
        }

        static copiarParaClipboard(texto) {
            return ensureCore('copiarParaClipboard')(texto);
        }

        static mostrarNotificacao(mensagem, tipo = 'info') {
            return ensureCore('mostrarNotificacao')(mensagem, tipo);
        }
    }

    window.UtilsModule = UtilsModule;
})();
