(function () {
    async function copiarResultado(instance) {
        const resultado = window.CalculadoraUI.exportarResultado();
        if (!resultado) {
            UtilsModule.mostrarNotificacao('Nenhum resultado para copiar.', 'warning');
            return;
        }

        const sucesso = await UtilsModule.copiarParaClipboard(resultado);
        if (sucesso) {
            UtilsModule.mostrarNotificacao('Resultado copiado para clipboard!', 'success');
        } else {
            UtilsModule.mostrarNotificacao('Erro ao copiar resultado.', 'error');
        }
    }

    window.CalculadoraUI.copiarResultado = copiarResultado;
})();
