(function () {
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    window.CalculatorModule.formatarMoeda = formatarMoeda;
})();
