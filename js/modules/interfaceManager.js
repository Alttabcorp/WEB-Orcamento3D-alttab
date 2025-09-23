/**
 * Módulo de Interface Avançada
 * Gerencia funcionalidades extras da nova interface
 */

class InterfaceManager {
    constructor() {
        this.resumoAberto = false;
        this.detalhesExpandidos = false;
        this.inicializar();
    }

    /**
     * Inicializa o gerenciador de interface
     */
    inicializar() {
        this.configurarEventListeners();
        this.configurarValidacaoTempoReal();
        this.configurarContadores();
        this.configurarResumo();
        this.ocultarLoadingSpinner();
        this.atualizarStatusAplicacao('success', 'Sistema carregado com sucesso!');
    }

    /**
     * Configura event listeners da interface
     */
    configurarEventListeners() {
        // Botão de ajuda
        const btnAjuda = document.getElementById('btn-ajuda');
        if (btnAjuda) {
            btnAjuda.addEventListener('click', () => this.mostrarAjuda());
        }

        // Expandir/recolher detalhes
        const btnExpandir = document.getElementById('btn-expandir-detalhes');
        if (btnExpandir) {
            btnExpandir.addEventListener('click', () => this.toggleDetalhes());
        }

        // Preview PDF
        const btnPreview = document.getElementById('btn-preview-pdf');
        if (btnPreview) {
            btnPreview.addEventListener('click', () => this.previewPDF());
        }

        // Resumo sidebar
        const btnFecharResumo = document.getElementById('btn-fechar-resumo');
        if (btnFecharResumo) {
            btnFecharResumo.addEventListener('click', () => this.fecharResumo());
        }
    }

    /**
     * Configura validação em tempo real
     */
    configurarValidacaoTempoReal() {
        const campos = [
            { id: 'nomeCliente', tipo: 'obrigatorio', feedback: 'nome-feedback' },
            { id: 'emailCliente', tipo: 'email', feedback: 'email-feedback' },
            { id: 'telefoneCliente', tipo: 'telefone', feedback: 'telefone-feedback' }
        ];

        campos.forEach(({ id, tipo, feedback }) => {
            const campo = document.getElementById(id);
            const feedbackElement = document.getElementById(feedback);
            
            if (campo && feedbackElement) {
                campo.addEventListener('blur', () => {
                    this.validarCampo(campo, tipo, feedbackElement);
                });

                campo.addEventListener('input', () => {
                    if (campo.classList.contains('error')) {
                        this.validarCampo(campo, tipo, feedbackElement);
                    }
                });
            }
        });
    }

    /**
     * Valida um campo específico
     */
    validarCampo(campo, tipo, feedbackElement) {
        let valido = true;
        let mensagem = '';

        const valor = campo.value.trim();

        switch (tipo) {
            case 'obrigatorio':
                if (!valor) {
                    valido = false;
                    mensagem = 'Este campo é obrigatório';
                }
                break;

            case 'email':
                if (valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    valido = false;
                    mensagem = 'Digite um email válido';
                }
                break;

            case 'telefone':
                if (valor && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(valor)) {
                    valido = false;
                    mensagem = 'Digite um telefone válido: (11) 99999-9999';
                }
                break;
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

    /**
     * Configura contadores de caracteres
     */
    configurarContadores() {
        const contadores = [
            { campo: 'descricaoProjeto', contador: 'desc-counter', limite: 500 }
        ];

        contadores.forEach(({ campo, contador, limite }) => {
            const campoElement = document.getElementById(campo);
            const contadorElement = document.getElementById(contador);

            if (campoElement && contadorElement) {
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
            }
        });
    }

    /**
     * Configura resumo lateral
     */
    configurarResumo() {
        // Atualizar resumo quando campos mudarem
        const camposMonitorados = ['nomeCliente', 'tipoProjeto'];
        
        camposMonitorados.forEach(id => {
            const campo = document.getElementById(id);
            if (campo) {
                campo.addEventListener('input', () => this.atualizarResumo());
            }
        });
    }

    /**
     * Atualiza resumo lateral
     */
    atualizarResumo() {
        const nomeCliente = document.getElementById('nomeCliente')?.value || 'Não informado';
        const tipoProjeto = document.getElementById('tipoProjeto')?.value || 'Não definido';

        const resumoCliente = document.getElementById('resumo-cliente');
        const resumoProjeto = document.getElementById('resumo-projeto');

        if (resumoCliente) resumoCliente.textContent = nomeCliente;
        if (resumoProjeto) resumoProjeto.textContent = tipoProjeto;
    }

    /**
     * Mostra/oculta detalhes dos custos
     */
    toggleDetalhes() {
        const detalhes = document.getElementById('detalhes-custos');
        const btnExpandir = document.getElementById('btn-expandir-detalhes');
        
        if (detalhes && btnExpandir) {
            if (this.detalhesExpandidos) {
                detalhes.style.display = 'none';
                btnExpandir.innerHTML = '📋 Ver Detalhes';
                this.detalhesExpandidos = false;
            } else {
                detalhes.style.display = 'block';
                btnExpandir.innerHTML = '📋 Ocultar Detalhes';
                this.detalhesExpandidos = true;
            }
        }
    }

    /**
     * Fecha resumo lateral
     */
    fecharResumo() {
        const resumo = document.getElementById('resumo-orcamento');
        if (resumo) {
            resumo.style.display = 'none';
            this.resumoAberto = false;
        }
    }

    /**
     * Oculta spinner de loading
     */
    ocultarLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            setTimeout(() => {
                spinner.style.opacity = '0';
                setTimeout(() => {
                    spinner.style.display = 'none';
                }, 300);
            }, 500);
        }
    }

    /**
     * Atualiza status da aplicação
     */
    atualizarStatusAplicacao(status, mensagem) {
        const statusBar = document.getElementById('app-status');
        const statusText = document.getElementById('status-text');
        const statusIndicator = document.getElementById('status-indicator');

        if (statusBar && statusText && statusIndicator) {
            statusText.textContent = mensagem;
            statusIndicator.className = `status-indicator ${status}`;
            statusBar.style.display = 'flex';

            // Auto-ocultar após 3 segundos para status de sucesso
            if (status === 'success') {
                setTimeout(() => {
                    statusBar.style.display = 'none';
                }, 3000);
            }
        }
    }

    /**
     * Preview do PDF (funcionalidade futura)
     */
    previewPDF() {
        UtilsModule.mostrarNotificacao('Preview em desenvolvimento...', 'info');
    }

    /**
     * Mostra modal de ajuda
     */
    mostrarAjuda() {
        const ajudaHTML = `
        <div class="ajuda-modal">
            <div class="ajuda-content">
                <h3>🆘 Como usar o sistema</h3>
                <div class="ajuda-secoes">
                    <div class="ajuda-secao">
                        <h4>1. 🖨️ Calculadora 3D</h4>
                        <p>Insira o tempo de impressão e peso da peça. O cálculo é automático!</p>
                    </div>
                    <div class="ajuda-secao">
                        <h4>2. 👤 Dados do Cliente</h4>
                        <p>Preencha as informações do cliente para personalizar o orçamento (opcionais).</p>
                    </div>
                    <div class="ajuda-secao">
                        <h4>3. 📋 Projeto</h4>
                        <p>Descreva detalhadamente o que será desenvolvido e adicione imagem se necessário.</p>
                    </div>
                    <div class="ajuda-secao">
                        <h4>4. ⚙️ Configurações</h4>
                        <p>Configure custos, margens e parâmetros através do menu de configurações.</p>
                    </div>
                </div>
                
                <div class="ajuda-atalhos">
                    <h4>⌨️ Atalhos de Teclado</h4>
                    <p><strong>F1:</strong> Mostrar esta ajuda</p>
                    <p><strong>Ctrl + Enter:</strong> Gerar PDF</p>
                    <p><strong>Ctrl + S:</strong> Abrir configurações</p>
                </div>
                
                <div style="text-align: center; margin-top: 2rem;">
                    <button type="button" onclick="this.closest('.ajuda-modal').remove()" class="btn btn-primary">
                        ✅ Entendi
                    </button>
                </div>
            </div>
        </div>
        `;

        // Remover modal existente se houver
        const modalExistente = document.querySelector('.ajuda-modal');
        if (modalExistente) {
            modalExistente.remove();
        }

        // Adicionar novo modal
        document.body.insertAdjacentHTML('beforeend', ajudaHTML);

        // Adicionar event listener para fechar com ESC
        const novoModal = document.querySelector('.ajuda-modal');
        if (novoModal) {
            const handler = (e) => {
                if (e.key === 'Escape') {
                    novoModal.remove();
                    document.removeEventListener('keydown', handler);
                }
            };
            document.addEventListener('keydown', handler);

            // Fechar clicando fora do conteúdo
            novoModal.addEventListener('click', (e) => {
                if (e.target === novoModal) {
                    novoModal.remove();
                    document.removeEventListener('keydown', handler);
                }
            });
        }
    }
}

// Exportar para uso global
window.InterfaceManager = InterfaceManager;
