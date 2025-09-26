(function () {
    function obterValoresInputs() {
        const tempo = parseFloat(document.getElementById('tempo-impressao').value);
        const peso = parseFloat(document.getElementById('peso-peca').value);

        return { tempo, peso };
    }

    window.CalculadoraUI.obterValoresInputs = obterValoresInputs;
})();
