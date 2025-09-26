(function () {
    const CONTADORES = [
        { campo: 'descricaoProjeto', contador: 'desc-counter', limite: 500 }
    ];

    function configurarContadores() {
        CONTADORES.forEach(({ campo, contador, limite }) => {
            const campoElement = document.getElementById(campo);
            const contadorElement = document.getElementById(contador);

            if (!campoElement || !contadorElement) {
                return;
            }

            campoElement.addEventListener('input', () => {
                const tamanho = campoElement.value.length;
                contadorElement.textContent = tamanho;

                if (tamanho > limite) {
                    contadorElement.style.color = 'var(--danger-color)';
                } else if (tamanho > limite * 0.8) {
                    contadorElement.style.color = 'var(--warning-color, #ffc107)';
                } else {
                    contadorElement.style.color = 'var(--primary-color)';
                }
            });
        });
    }

    window.InterfaceModule.configurarContadores = configurarContadores;
})();
