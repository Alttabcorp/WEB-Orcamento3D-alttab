(function () {
    function sanitizarNomeArquivo(nome) {
        return (nome || '')
            .toString()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .toLowerCase();
    }

    window.UtilsModuleCore.sanitizarNomeArquivo = sanitizarNomeArquivo;
})();
