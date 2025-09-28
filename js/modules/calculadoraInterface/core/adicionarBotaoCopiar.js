(function () {
    function adicionarBotaoCopiar(instance) {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (!secaoResultado || document.getElementById('btn-copiar-resultado')) {
            return;
        }

        const btnCopiar = document.createElement('button');
        btnCopiar.id = 'btn-copiar-resultado';
        btnCopiar.type = 'button';
        btnCopiar.className = 'btn btn-secondary';
        btnCopiar.style.marginTop = '1rem';
        btnCopiar.innerHTML = '📋 Copiar Resultado';
        btnCopiar.addEventListener('click', () => instance.copiarResultado());

        secaoResultado.appendChild(btnCopiar);
    }

    window.CalculadoraUI.adicionarBotaoCopiar = adicionarBotaoCopiar;
})();
