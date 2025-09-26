(function () {
    function atualizarElemento(elementId, valor) {
        const elemento = document.getElementById(elementId);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    window.CalculadoraUI.atualizarElemento = atualizarElemento;
})();
