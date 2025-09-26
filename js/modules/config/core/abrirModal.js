(function () {
    function abrirModal(instance) {
        window.ConfigModule.carregarValores(instance);
        window.ConfigModule.atualizarPreview(instance);

        const modal = document.getElementById('configuracoesModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    window.ConfigModule.abrirModal = abrirModal;
})();
