(function () {
    function ocultarResultado() {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (secaoResultado) {
            secaoResultado.style.display = 'none';
        }
    }

    window.CalculadoraUI.ocultarResultado = ocultarResultado;
})();
