/**
 * Módulo de Interface Avançada
 * Gerencia funcionalidades extras da nova interface
 */

class InterfaceManager {
    constructor() {
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
        // Usando o sistema de notificações do UtilsModule
        if (status === 'success') {
            // Silencioso para evitar spam de notificações
            console.log('Status:', mensagem);
        } else {
            UtilsModule.mostrarNotificacao(mensagem, status);
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
                <button type="button" class="btn-close-modal">&times;</button>
                <h3>🆘 Guia de Uso - Sistema Alttab 3D</h3>
                
                <div class="ajuda-secoes">
                    <div class="ajuda-secao">
                        <h4>1. 🖨️ Calculadora de Impressão 3D</h4>
                        <p>• <strong>Tempo de Impressão:</strong> Insira o tempo em horas (ex: 4.5 para 4h30min)</p>
                        <p>• <strong>Peso da Peça:</strong> Peso do filamento necessário em gramas</p>
                        <p>• <strong>Cálculo Automático:</strong> Os valores são calculados automaticamente conforme você digita</p>
                        <p>• <strong>Detalhes:</strong> Clique em "Ver Detalhes" para visualizar o breakdown completo dos custos</p>
                    </div>
                    
                    <div class="ajuda-secao">
                        <h4>2. 👤 Dados do Cliente</h4>
                        <p>• <strong>Campos Opcionais:</strong> Todos os campos podem ser preenchidos posteriormente</p>
                        <p>• <strong>Formatação Automática:</strong> O telefone é formatado automaticamente</p>
                        <p>• <strong>Validação:</strong> Email é validado automaticamente</p>
                    </div>
                    
                    <div class="ajuda-secao">
                        <h4>3. 📋 Detalhes do Projeto</h4>
                        <p>• <strong>Descrição:</strong> Descreva o projeto detalhadamente</p>
                        <p>• <strong>Imagem:</strong> Adicione uma imagem do projeto (opcional)</p>
                        <p>• <strong>Prazo:</strong> Defina o prazo de entrega em dias úteis</p>
                    </div>
                    
                    <div class="ajuda-secao">
                        <h4>4. ⚙️ Configurações Avançadas</h4>
                        <p>• <strong>Custos:</strong> Configure preços de filamento, energia, impostos, etc.</p>
                        <p>• <strong>Máquina:</strong> Ajuste potência, valor e vida útil da impressora</p>
                        <p>• <strong>Import/Export:</strong> Salve e carregue configurações</p>
                    </div>
                </div>
                
                <div class="ajuda-atalhos">
                    <h4>⌨️ Atalhos de Teclado</h4>
                    <div class="atalhos-grid">
                        <div class="atalho-item">
                            <kbd>F1</kbd>
                            <span>Abrir esta ajuda</span>
                        </div>
                        <div class="atalho-item">
                            <kbd>Ctrl + Enter</kbd>
                            <span>Gerar PDF do orçamento</span>
                        </div>
                        <div class="atalho-item">
                            <kbd>Ctrl + S</kbd>
                            <span>Abrir configurações</span>
                        </div>
                        <div class="atalho-item">
                            <kbd>Esc</kbd>
                            <span>Fechar modal de ajuda</span>
                        </div>
                    </div>
                </div>
                
                <div class="ajuda-dicas">
                    <h4>💡 Dicas Importantes</h4>
                    <ul>
                        <li>O sistema salva automaticamente suas configurações no navegador</li>
                        <li>Você pode trabalhar offline após o primeiro carregamento</li>
                        <li>O cálculo inclui automaticamente impostos, taxas de cartão e custos de anúncio</li>
                        <li>Use a função "Copiar Resultado" para compartilhar cálculos rapidamente</li>
                    </ul>
                </div>
                
                <div class="ajuda-actions">
                    <button type="button" class="btn btn-primary btn-fechar-ajuda">
                        ✅ Entendi
                    </button>
                    <button type="button" class="btn btn-secondary btn-config-ajuda">
                        ⚙️ Ir para Configurações
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
            
            // Botão X do canto
            const btnX = novoModal.querySelector('.btn-close-modal');
            btnX?.addEventListener('click', () => {
                novoModal.remove();
                document.removeEventListener('keydown', handler);
            });
            
            // Botão fechar
            const btnFechar = novoModal.querySelector('.btn-fechar-ajuda');
            btnFechar?.addEventListener('click', () => {
                novoModal.remove();
                document.removeEventListener('keydown', handler);
            });
            
            // Botão configurações
            const btnConfig = novoModal.querySelector('.btn-config-ajuda');
            btnConfig?.addEventListener('click', () => {
                novoModal.remove();
                document.removeEventListener('keydown', handler);
                // Abrir configurações
                document.getElementById('btn-configuracoes')?.click();
            });
            
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
