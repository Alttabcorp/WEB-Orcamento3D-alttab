(function () {
    function configurarEventListeners(instance) {
        const btnAjuda = document.getElementById('btn-ajuda');
        if (btnAjuda) {
            btnAjuda.addEventListener('click', () => window.InterfaceModule.mostrarAjuda(instance));
        }

        const btnExpandir = document.getElementById('btn-expandir-detalhes');
        if (btnExpandir) {
            btnExpandir.addEventListener('click', () => window.InterfaceModule.toggleDetalhes(instance));
        }
    }

    window.InterfaceModule.configurarEventListeners = configurarEventListeners;
})();
