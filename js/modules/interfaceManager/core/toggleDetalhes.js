(function () {
    function toggleDetalhes(instance) {
        const detalhes = document.getElementById('detalhes-custos');
        const btnExpandir = document.getElementById('btn-expandir-detalhes');

        if (!detalhes || !btnExpandir) {
            return;
        }

        const estaAberto = Boolean(instance?.detalhesExpandidos);

        if (estaAberto) {
            detalhes.style.display = 'none';
            btnExpandir.innerHTML = '📋 Ver Detalhes';
            instance.detalhesExpandidos = false;
        } else {
            detalhes.style.display = 'block';
            btnExpandir.innerHTML = '📋 Ocultar Detalhes';
            instance.detalhesExpandidos = true;
        }
    }

    window.InterfaceModule.toggleDetalhes = toggleDetalhes;
})();
