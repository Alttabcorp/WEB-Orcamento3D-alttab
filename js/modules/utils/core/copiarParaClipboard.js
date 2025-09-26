(function () {
    async function copiarParaClipboard(texto) {
        try {
            await navigator.clipboard.writeText(texto);
            return true;
        } catch (error) {
            console.error('Erro ao copiar para clipboard:', error);
            return false;
        }
    }

    window.UtilsModuleCore.copiarParaClipboard = copiarParaClipboard;
})();
