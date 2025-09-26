(function () {
    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const REGEX_TELEFONE = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

    function validarCampo(campo, tipo, feedbackElement) {
        let valido = true;
        let mensagem = '';

        const valor = campo?.value?.trim?.() ?? '';

        switch (tipo) {
            case 'obrigatorio':
                if (!valor) {
                    valido = false;
                    mensagem = 'Este campo é obrigatório';
                }
                break;
            case 'email':
                if (valor && !REGEX_EMAIL.test(valor)) {
                    valido = false;
                    mensagem = 'Digite um email válido';
                }
                break;
            case 'telefone':
                if (valor && !REGEX_TELEFONE.test(valor)) {
                    valido = false;
                    mensagem = 'Digite um telefone válido: (11) 99999-9999';
                }
                break;
            default:
                break;
        }

        if (!campo || !feedbackElement) {
            return valido;
        }

        if (valido) {
            campo.classList.remove('error');
            campo.classList.add('success');
            feedbackElement.textContent = '';
            feedbackElement.className = 'validation-feedback';
        } else {
            campo.classList.remove('success');
            campo.classList.add('error');
            feedbackElement.textContent = mensagem;
            feedbackElement.className = 'validation-feedback error';
        }

        return valido;
    }

    window.InterfaceModule.validarCampo = validarCampo;
})();
