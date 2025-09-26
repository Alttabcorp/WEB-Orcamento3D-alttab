(function () {
    function fecharModal() {
        const modal = document.getElementById('configuracoesModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    window.ConfigModule.fecharModal = fecharModal;
})();
