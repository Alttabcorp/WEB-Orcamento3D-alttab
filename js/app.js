/**
 * Módulo Principal da Aplicação
 * Coordena todos os módulos e inicializa a aplicação
 */

class AppManager {
    constructor() {
        this.calculadora = null;
        this.calculadoraInterface = null;
        this.configManager = null;
        this.pdfGenerator = null;
        this.interfaceManager = null;
        this.inicializada = false;
    }

    /**
     * Inicializa todos os módulos da aplicação
     */
    async inicializar() {
        if (this.inicializada) {
            console.warn('Aplicação já foi inicializada');
            return;
        }

        try {
            console.log('Iniciando aplicação Alttab 3D...');

            // Verificar dependências
            this.verificarDependencias();

            // Inicializar módulos na ordem correta
            this.calculadora = new CalculadoraOrcamento3D();
            this.calculadoraInterface = new CalculadoraInterface(this.calculadora);
            this.configManager = new ConfiguracaoManager(this.calculadora);
            this.pdfGenerator = new PDFGenerator();
            this.interfaceManager = new InterfaceManager();

            // Configurar event listeners principais
            this.configurarEventListeners();

            // Configurar formatação de telefone
            this.configurarFormatacaoTelefone();

            // Adicionar funcionalidades extras
            this.adicionarFuncionalidadesExtras();

            this.inicializada = true;
            console.log('Aplicação inicializada com sucesso!');

            // Mostrar notificação de boas-vindas
            UtilsModule.mostrarNotificacao('Sistema carregado com sucesso!', 'success');

        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            UtilsModule.mostrarNotificacao(
                'Erro ao carregar o sistema. Recarregue a página.',
                'error'
            );
        }
    }

    /**
     * Verifica se todas as dependências estão disponíveis
     */
    verificarDependencias() {
        const dependencias = [
            { nome: 'jsPDF', objeto: window.jsPDF },
            { nome: 'CalculadoraOrcamento3D', objeto: window.CalculadoraOrcamento3D },
            { nome: 'ConfiguracaoManager', objeto: window.ConfiguracaoManager },
            { nome: 'PDFGenerator', objeto: window.PDFGenerator },
            { nome: 'CalculadoraInterface', objeto: window.CalculadoraInterface },
            { nome: 'InterfaceManager', objeto: window.InterfaceManager },
            { nome: 'UtilsModule', objeto: window.UtilsModule }
        ];

        const faltando = dependencias.filter(dep => !dep.objeto);

        if (faltando.length > 0) {
            throw new Error(`Dependências não encontradas: ${faltando.map(d => d.nome).join(', ')}`);
        }
    }

    /**
     * Configura os event listeners principais
     */
    configurarEventListeners() {
        // Formulário principal
        const form = document.getElementById('orcamentoForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                this.pdfGenerator.gerarOrcamento(e);
            });
        }

        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Eventos de visibilidade da página
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.onPageVisible();
            }
        });
    }

    /**
     * Configura formatação automática do telefone
     */
    configurarFormatacaoTelefone() {
        const telefoneInput = document.getElementById('telefoneCliente');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', UtilsModule.formatarTelefone);
        }
    }

    /**
     * Adiciona funcionalidades extras à interface
     */
    adicionarFuncionalidadesExtras() {
        // Adicionar botão de copiar resultado
        this.calculadoraInterface.adicionarBotaoCopiar();
    }

    /**
     * Manipula atalhos de teclado
     * @param {KeyboardEvent} e - Evento do teclado
     */
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + S para abrir configurações
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (this.configManager) {
                document.getElementById('btn-configuracoes')?.click();
            }
        }

        // Ctrl/Cmd + Enter para gerar PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            const form = document.getElementById('orcamentoForm');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }

        // F1 para ajuda
        if (e.key === 'F1') {
            e.preventDefault();
            if (this.interfaceManager) {
                this.interfaceManager.mostrarAjuda();
            }
        }
    }

    /**
     * Executa quando a página fica visível novamente
     */
    onPageVisible() {
        // Verificar se há atualizações nas configurações
        if (this.calculadora) {
            console.log('Página visível - verificando configurações...');
        }
    }

    /**
     * Obtém estatísticas da aplicação
     * @returns {Object} - Estatísticas
     */
    obterEstatisticas() {
        return {
            inicializada: this.inicializada,
            configuracoes: this.calculadora?.obterConfiguracoes(),
            versao: '1.0.0',
            ultimoCalcullo: localStorage.getItem('ultimo_calculo_timestamp')
        };
    }

    /**
     * Reinicia a aplicação
     */
    reiniciar() {
        console.log('Reiniciando aplicação...');
        this.inicializada = false;

        // Limpar event listeners se necessário
        // Recriar instâncias
        this.inicializar();
    }

    /**
     * Método para debug - expõe informações úteis
     */
    debug() {
        return {
            app: this,
            calculadora: this.calculadora,
            interface: this.calculadoraInterface,
            interfaceManager: this.interfaceManager,
            config: this.configManager,
            pdf: this.pdfGenerator,
            stats: this.obterEstatisticas()
        };
    }
}

// Instância global
window.AppManager = AppManager;
window.appManager = new AppManager();

// Auto-inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.appManager.inicializar();
    });
} else {
    // DOM já carregado
    window.appManager.inicializar();
}
