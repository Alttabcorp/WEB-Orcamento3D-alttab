(function () {
    function atualizarPreview(instance) {
        const preview = document.getElementById('config-preview-text');
        if (!preview) {
            return;
        }

        const conteudo = instance?.calculadora?.exportarConfiguracoes?.();
        preview.textContent = conteudo || '';
    }

    window.ConfigModule.atualizarPreview = atualizarPreview;
})();
