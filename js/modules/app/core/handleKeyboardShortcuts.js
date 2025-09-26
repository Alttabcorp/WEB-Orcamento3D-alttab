(function () {
    function handleKeyboardShortcuts(instance, event) {
        if (!event) {
            return;
        }

        const key = event.key?.toLowerCase?.();

        if ((event.ctrlKey || event.metaKey) && key === 's') {
            event.preventDefault();
            if (instance?.configManager) {
                document.getElementById('btn-configuracoes')?.click();
            }
            return;
        }

        if ((event.ctrlKey || event.metaKey) && key === 'enter') {
            event.preventDefault();
            const form = document.getElementById('orcamentoForm');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
            return;
        }

        if (key === 'f1') {
            event.preventDefault();
            instance?.interfaceManager?.mostrarAjuda?.();
        }
    }

    window.AppModule.handleKeyboardShortcuts = handleKeyboardShortcuts;
})();
