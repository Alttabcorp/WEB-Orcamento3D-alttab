(function () {
    const CAMPOS_VALIDACAO = [
        { id: 'nomeCliente', tipo: 'obrigatorio', feedback: 'nome-feedback' },
        { id: 'emailCliente', tipo: 'email', feedback: 'email-feedback' },
        { id: 'telefoneCliente', tipo: 'telefone', feedback: 'telefone-feedback' }
    ];

    function configurarValidacaoTempoReal(instance) {
        CAMPOS_VALIDACAO.forEach(({ id, tipo, feedback }) => {
            const campo = document.getElementById(id);
            const feedbackElement = document.getElementById(feedback);

            if (!campo || !feedbackElement) {
                return;
            }

            campo.addEventListener('blur', () => {
                window.InterfaceModule.validarCampo(campo, tipo, feedbackElement);
            });

            campo.addEventListener('input', () => {
                if (campo.classList.contains('error')) {
                    window.InterfaceModule.validarCampo(campo, tipo, feedbackElement);
                }
            });
        });
    }

    window.InterfaceModule.configurarValidacaoTempoReal = configurarValidacaoTempoReal;
})();
