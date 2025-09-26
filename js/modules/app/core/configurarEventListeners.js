(function () {
    function configurarEventListeners(instance) {
        if (!instance) {
            return;
        }

        const form = document.getElementById('orcamentoForm');
        if (form) {
            if (instance._formSubmitHandler) {
                form.removeEventListener('submit', instance._formSubmitHandler);
            }

            instance._formSubmitHandler = (event) => {
                instance.pdfGenerator?.gerarOrcamento?.(event);
            };

            form.addEventListener('submit', instance._formSubmitHandler);
        }

        if (instance._keydownHandler) {
            document.removeEventListener('keydown', instance._keydownHandler);
        }
        instance._keydownHandler = (event) => {
            window.AppModule.handleKeyboardShortcuts(instance, event);
        };
        document.addEventListener('keydown', instance._keydownHandler);

        if (instance._visibilityHandler) {
            document.removeEventListener('visibilitychange', instance._visibilityHandler);
        }
        instance._visibilityHandler = () => {
            if (document.visibilityState === 'visible') {
                window.AppModule.onPageVisible(instance);
            }
        };
        document.addEventListener('visibilitychange', instance._visibilityHandler);
    }

    window.AppModule.configurarEventListeners = configurarEventListeners;
})();
