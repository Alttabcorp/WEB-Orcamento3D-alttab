(function () {
    function scrollParaResultado() {
        const elemento = document.getElementById('resultado-calculo');
        if (elemento) {
            elemento.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }

    window.CalculadoraUI.scrollParaResultado = scrollParaResultado;
})();
