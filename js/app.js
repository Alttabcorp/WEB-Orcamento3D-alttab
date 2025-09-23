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

        // Adicionar validação em tempo real nos campos obrigatórios
        this.adicionarValidacaoTempoReal();

        // Adicionar dicas de ajuda
        this.adicionarDicasAjuda();
    }

    /**
     * Adiciona validação em tempo real nos campos
     */
    adicionarValidacaoTempoReal() {
        const campos = [
            { id: 'nomeCliente', validacao: 'obrigatorio' },
            { id: 'emailCliente', validacao: 'email' },
            { id: 'telefoneCliente', validacao: 'obrigatorio' },
            { id: 'descricaoProjeto', validacao: 'obrigatorio' }
        ];

        campos.forEach(campo => {
            const elemento = document.getElementById(campo.id);
            if (elemento) {
                elemento.addEventListener('blur', () => {
                    this.validarCampo(elemento, campo.validacao);
                });
            }
        });
    }

    /**
     * Valida um campo específico
     * @param {HTMLElement} elemento - Elemento a ser validado
     * @param {string} tipoValidacao - Tipo de validação
     */
    validarCampo(elemento, tipoValidacao) {
        const valor = elemento.value.trim();
        let erro = null;

        switch (tipoValidacao) {
            case 'obrigatorio':
                erro = UtilsModule.validarCampoObrigatorio(valor, elemento.labels[0]?.textContent || 'Campo');
                break;
            case 'email':
                if (valor && !UtilsModule.validarEmail(valor)) {
                    erro = 'Formato de email inválido';
                }
                break;
        }

        // Aplicar estilo visual
        if (erro) {
            elemento.style.borderColor = '#dc3545';
            elemento.title = erro;
        } else {
            elemento.style.borderColor = '#28a745';
            elemento.title = '';
        }
    }

    /**
     * Adiciona dicas de ajuda aos campos
     */
    adicionarDicasAjuda() {
        const dicas = {
            'tempo-impressao': 'Tempo total estimado para imprimir a peça em horas (ex: 4.5)',
            'peso-peca': 'Peso do filamento necessário em gramas (ex: 25.5)',
            'prazoEntrega': 'Quantos dias úteis você precisa para entregar o projeto'
        };

        Object.entries(dicas).forEach(([id, dica]) => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.title = dica;
                elemento.setAttribute('data-dica', dica);
            }
        });
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
            this.mostrarAjuda();
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
     * Mostra modal de ajuda
     */
    mostrarAjuda() {
        const ajuda = `
ATALHOS DO SISTEMA:
• Ctrl/Cmd + S: Abrir configurações
• Ctrl/Cmd + Enter: Gerar orçamento PDF
• F1: Esta ajuda

COMO USAR:
1. Preencha os dados do cliente
2. Insira tempo e peso da impressão 3D
3. O cálculo é feito automaticamente
4. Gere o PDF com o orçamento completo

CONFIGURAÇÕES:
• Clique no botão "⚙️ Configurações" para ajustar custos
• Você pode importar/exportar suas configurações
• Todas as configurações são salvas no navegador
        `;

        UtilsModule.mostrarNotificacao(ajuda, 'info');
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
