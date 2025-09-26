(function () {
    function configurarFormatacaoTelefone(instance) {
        const telefoneInput = document.getElementById('telefoneCliente');
        if (!telefoneInput) {
            return;
        }

        if (instance?._telefoneHandler) {
            telefoneInput.removeEventListener('input', instance._telefoneHandler);
        }

        instance._telefoneHandler = (event) => {
            if (window.UtilsModule?.formatarTelefone) {
                window.UtilsModule.formatarTelefone(event);
            }
        };

        telefoneInput.addEventListener('input', instance._telefoneHandler);
    }

    window.AppModule.configurarFormatacaoTelefone = configurarFormatacaoTelefone;
})();
