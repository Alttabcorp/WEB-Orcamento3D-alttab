(function () {
    function formatarMoeda(valor) {
        if (typeof valor !== 'number') {
            return Number(valor || 0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });
        }

        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    window.UtilsModuleCore.formatarMoeda = formatarMoeda;
})();
