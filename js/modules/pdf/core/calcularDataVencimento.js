(function () {
    function calcularDataVencimento() {
        const hoje = new Date();
        const vencimento = new Date(hoje.getTime() + (30 * 24 * 60 * 60 * 1000));
        return vencimento.toLocaleDateString('pt-BR');
    }

    window.PDFCore.calcularDataVencimento = calcularDataVencimento;
})();
