/**
 * Módulo de Utilitários - Formatação e Validação
 * Funções auxiliares para formatação de dados
 */

class UtilsModule {
    /**
     * Formata campo de telefone brasileiro
     * @param {Event} e - Evento do input
     */
    static formatarTelefone(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 7) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        }
        
        e.target.value = value;
    }

    /**
     * Valida se um campo é obrigatório e não está vazio
     * @param {string} valor - Valor a ser validado
     * @param {string} nomeCampo - Nome do campo para mensagem de erro
     * @returns {string|null} - Mensagem de erro ou null se válido
     */
    static validarCampoObrigatorio(valor, nomeCampo) {
        if (!valor || valor.trim() === '') {
            return `O campo ${nomeCampo} é obrigatório.`;
        }
        return null;
    }

    /**
     * Valida formato de email
     * @param {string} email - Email a ser validado
     * @returns {boolean} - True se válido
     */
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Formata valor monetário brasileiro
     * @param {number} valor - Valor numérico
     * @returns {string} - Valor formatado em moeda
     */
    static formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    /**
     * Formata data brasileira
     * @param {Date} data - Data a ser formatada
     * @returns {string} - Data formatada
     */
    static formatarData(data = new Date()) {
        return data.toLocaleDateString('pt-BR');
    }

    /**
     * Sanitiza nome para nome de arquivo
     * @param {string} nome - Nome a ser sanitizado
     * @returns {string} - Nome sanitizado
     */
    static sanitizarNomeArquivo(nome) {
        return nome
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .toLowerCase();
    }

    /**
     * Debounce function para otimizar chamadas de função
     * @param {Function} func - Função a ser executada
     * @param {number} delay - Delay em ms
     * @returns {Function} - Função com debounce
     */
    static debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    /**
     * Copia texto para clipboard
     * @param {string} texto - Texto a ser copiado
     * @returns {Promise<boolean>} - True se copiado com sucesso
     */
    static async copiarParaClipboard(texto) {
        try {
            await navigator.clipboard.writeText(texto);
            return true;
        } catch (error) {
            console.error('Erro ao copiar para clipboard:', error);
            return false;
        }
    }

    /**
     * Mostra notificação toast
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {string} tipo - Tipo da mensagem (success, error, warning, info)
     */
    static mostrarNotificacao(mensagem, tipo = 'info') {
        // Remove notificações existentes
        const existente = document.querySelector('.toast-notification');
        if (existente) {
            existente.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${tipo}`;
        toast.textContent = mensagem;
        
        // Estilos inline para funcionar sem CSS adicional
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

        // Cores por tipo
        const cores = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#007bff'
        };
        toast.style.backgroundColor = cores[tipo] || cores.info;

        document.body.appendChild(toast);

        // Animação de entrada
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 10);

        // Remover após 3 segundos
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Exportar para uso global
window.UtilsModule = UtilsModule;
