(function () {
    function atualizarStatusAplicacao(status, mensagem) {
        if (status === 'success') {
            console.log('Status:', mensagem);
            return;
        }

        if (window.UtilsModule?.mostrarNotificacao) {
            window.UtilsModule.mostrarNotificacao(mensagem, status);
        } else {
            console.warn('UtilsModule.mostrarNotificacao não disponível:', mensagem);
        }
    }

    window.InterfaceModule.atualizarStatusAplicacao = atualizarStatusAplicacao;
})();
