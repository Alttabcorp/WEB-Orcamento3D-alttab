(function () {
    const CORES = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#007bff'
    };

    function removerNotificacaoExistente() {
        document.querySelectorAll('.toast-notification').forEach((toast) => toast.remove());
    }

    function mostrarNotificacao(mensagem, tipo = 'info') {
        removerNotificacaoExistente();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${tipo}`;
        toast.textContent = mensagem;

        Object.assign(toast.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '6px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            opacity: '0',
            transform: 'translateX(100%)'
        });

        toast.style.backgroundColor = CORES[tipo] || CORES.info;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    window.UtilsModuleCore.mostrarNotificacao = mostrarNotificacao;
})();
