(function () {
    function validarInputs(tempo, peso) {
        const erros = [];

        if (!tempo || tempo <= 0) {
            erros.push('Por favor, insira um tempo de impressão válido (maior que 0).');
        }

        if (isNaN(peso) || peso < 0) {
            erros.push('Por favor, insira um peso válido (maior ou igual a 0).');
        }

        return erros;
    }

    window.CalculadoraUI.validarInputs = validarInputs;
})();
