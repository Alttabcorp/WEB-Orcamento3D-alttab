(function () {
    function formatarData(data = new Date()) {
        if (!(data instanceof Date)) {
            return new Date(data).toLocaleDateString('pt-BR');
        }
        return data.toLocaleDateString('pt-BR');
    }

    window.UtilsModuleCore.formatarData = formatarData;
})();
