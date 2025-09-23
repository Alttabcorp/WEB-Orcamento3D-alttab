/**
 * Módulo de Configuração - Alttab 3D
 * Gerencia configurações avançadas e importação/exportação
 */

class ConfiguracaoManager {
    constructor(calculadora) {
        this.calculadora = calculadora;
        this.inicializar();
    }

    /**
     * Inicializa o gerenciador de configurações
     */
    inicializar() {
        this.criarInterfaceConfiguracoes();
        this.adicionarEventListeners();
    }

    /**
     * Cria a interface das configurações avançadas
     */
    criarInterfaceConfiguracoes() {
        // Verifica se já existe
        if (document.getElementById('configuracoesModal')) {
            return;
        }

        const modalHTML = `
        <div id="configuracoesModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Configurações Avançadas</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="config-tabs">
                        <button class="tab-button active" data-tab="custos">Custos</button>
                        <button class="tab-button" data-tab="maquina">Máquina</button>
                        <button class="tab-button" data-tab="importar">Importar/Exportar</button>
                    </div>

                    <div id="custos-tab" class="tab-content active">
                        <div class="form-group">
                            <label for="config-preco-filamento">Preço do Filamento por Kg (R$)</label>
                            <input type="number" id="config-preco-filamento" step="0.01" min="0" 
                                   placeholder="Ex: 156.00">
                        </div>
                        <div class="form-group">
                            <label for="config-valor-kwh">Tarifa de Energia (R$/kWh)</label>
                            <input type="number" id="config-valor-kwh" step="0.01" min="0" 
                                   placeholder="Ex: 0.84">
                        </div>
                        <div class="form-group">
                            <label for="config-qty-acessorios">Quantidade de Acessórios/Embalagem</label>
                            <input type="number" id="config-qty-acessorios" min="0" 
                                   placeholder="Ex: 1">
                        </div>
                        <div class="form-group">
                            <label for="config-custo-acessorio">Custo Unitário de Acessório/Embalagem (R$)</label>
                            <input type="number" id="config-custo-acessorio" step="0.01" min="0" 
                                   placeholder="Ex: 0.48">
                        </div>
                        <div class="form-group">
                            <label for="config-custo-fixo">Custo Fixo Mensal (R$)</label>
                            <input type="number" id="config-custo-fixo" step="0.01" min="0" 
                                   placeholder="Ex: 300.00">
                        </div>
                        <div class="form-group">
                            <label for="config-percentual-falha">Percentual de Falha (%)</label>
                            <input type="number" id="config-percentual-falha" step="0.01" min="0" max="100" 
                                   placeholder="Ex: 10">
                        </div>
                        <div class="form-group">
                            <label for="config-markup">Markup</label>
                            <input type="number" id="config-markup" step="0.1" min="1" 
                                   placeholder="Ex: 3">
                        </div>
                        <div class="form-group">
                            <label for="config-percentual-imposto">Percentual de Imposto (%)</label>
                            <input type="number" id="config-percentual-imposto" step="0.01" min="0" max="100" 
                                   placeholder="Ex: 8.5">
                        </div>
                        <div class="form-group">
                            <label for="config-taxa-cartao">Taxa do Cartão (%)</label>
                            <input type="number" id="config-taxa-cartao" step="0.01" min="0" max="100" 
                                   placeholder="Ex: 4.5">
                        </div>
                        <div class="form-group">
                            <label for="config-custo-anuncio">Custo de Anúncio (%)</label>
                            <input type="number" id="config-custo-anuncio" step="0.01" min="0" max="100" 
                                   placeholder="Ex: 15">
                        </div>
                    </div>

                    <div id="maquina-tab" class="tab-content">
                        <div class="form-group">
                            <label for="config-potencia">Potência da Impressora (W)</label>
                            <input type="number" id="config-potencia" min="0" 
                                   placeholder="Ex: 175">
                        </div>
                        <div class="form-group">
                            <label for="config-valor-maquina">Valor da Máquina (R$)</label>
                            <input type="number" id="config-valor-maquina" step="0.01" min="0" 
                                   placeholder="Ex: 2000.00">
                        </div>
                        <div class="form-group">
                            <label for="config-vida-util">Vida Útil da Máquina (horas)</label>
                            <input type="number" id="config-vida-util" min="1" 
                                   placeholder="Ex: 24000">
                        </div>
                    </div>

                    <div id="importar-tab" class="tab-content">
                        <div class="import-export-section">
                            <h3>Importar Configurações</h3>
                            <div class="form-group">
                                <label for="config-file">Selecionar arquivo de configuração (.txt)</label>
                                <input type="file" id="config-file" accept=".txt">
                            </div>
                            <button type="button" id="importar-config" class="btn btn-secondary">
                                Importar Configurações
                            </button>
                        </div>

                        <div class="import-export-section">
                            <h3>Exportar Configurações</h3>
                            <button type="button" id="exportar-config" class="btn btn-secondary">
                                Exportar Configurações
                            </button>
                        </div>

                        <div class="import-export-section">
                            <h3>Resetar Configurações</h3>
                            <button type="button" id="resetar-config" class="btn btn-danger">
                                Resetar para Padrão
                            </button>
                        </div>

                        <div class="config-preview">
                            <h3>Configurações Atuais</h3>
                            <pre id="config-preview-text"></pre>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="salvar-config" class="btn btn-primary">
                        Salvar Configurações
                    </button>
                    <button type="button" id="cancelar-config" class="btn btn-secondary">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    /**
     * Adiciona event listeners
     */
    adicionarEventListeners() {
        // Botão para abrir configurações
        this.criarBotaoConfiguracoes();

        // Modal events
        const modal = document.getElementById('configuracoesModal');
        const closeBtn = modal.querySelector('.close');
        const cancelBtn = document.getElementById('cancelar-config');
        const salvarBtn = document.getElementById('salvar-config');

        closeBtn.addEventListener('click', () => this.fecharModal());
        cancelBtn.addEventListener('click', () => this.fecharModal());
        salvarBtn.addEventListener('click', () => this.salvarConfiguracoes());

        // Tabs
        const tabButtons = modal.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.trocarTab(e.target.dataset.tab));
        });

        // Import/Export
        document.getElementById('importar-config').addEventListener('click', () => this.importarConfiguracoes());
        document.getElementById('exportar-config').addEventListener('click', () => this.exportarConfiguracoes());
        document.getElementById('resetar-config').addEventListener('click', () => this.resetarConfiguracoes());

        // File input
        document.getElementById('config-file').addEventListener('change', (e) => this.lerArquivo(e));

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.fecharModal();
            }
        });
    }

    /**
     * Cria botão para abrir configurações
     */
    criarBotaoConfiguracoes() {
        if (document.getElementById('btn-configuracoes')) {
            return;
        }

        const btnConfig = document.createElement('button');
        btnConfig.id = 'btn-configuracoes';
        btnConfig.className = 'btn btn-config';
        btnConfig.innerHTML = '⚙️ Configurações';
        btnConfig.addEventListener('click', () => this.abrirModal());

        // Adiciona o botão no header ou em local apropriado
        const header = document.querySelector('header') || document.querySelector('.container');
        if (header) {
            header.appendChild(btnConfig);
        }
    }

    /**
     * Abre o modal de configurações
     */
    abrirModal() {
        this.carregarValores();
        this.atualizarPreview();
        document.getElementById('configuracoesModal').style.display = 'block';
    }

    /**
     * Fecha o modal de configurações
     */
    fecharModal() {
        document.getElementById('configuracoesModal').style.display = 'none';
    }

    /**
     * Troca entre as abas
     */
    trocarTab(tabId) {
        // Remove active de todos
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Ativa o selecionado
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(`${tabId}-tab`).classList.add('active');

        if (tabId === 'importar') {
            this.atualizarPreview();
        }
    }

    /**
     * Carrega valores atuais nos campos
     */
    carregarValores() {
        const config = this.calculadora.obterConfiguracoes();
        
        document.getElementById('config-preco-filamento').value = config.preco_filamento_por_kg;
        document.getElementById('config-valor-kwh').value = config.valor_kw_h;
        document.getElementById('config-qty-acessorios').value = config.quantidade_acessorios;
        document.getElementById('config-custo-acessorio').value = config.custo_unidade_acessorio;
        document.getElementById('config-custo-fixo').value = config.custo_fixo_mensal;
        document.getElementById('config-percentual-falha').value = config.percentual_falha * 100;
        document.getElementById('config-markup').value = config.markup;
        document.getElementById('config-percentual-imposto').value = config.percentual_imposto * 100;
        document.getElementById('config-taxa-cartao').value = config.taxa_cartao * 100;
        document.getElementById('config-custo-anuncio').value = config.custo_anuncio_percentual * 100;
        document.getElementById('config-potencia').value = config.potencia_w;
        document.getElementById('config-valor-maquina').value = config.valor_maquina;
        document.getElementById('config-vida-util').value = config.vida_util_horas;
    }

    /**
     * Salva as configurações
     */
    salvarConfiguracoes() {
        try {
            const novasConfigs = {
                preco_filamento_por_kg: parseFloat(document.getElementById('config-preco-filamento').value),
                valor_kw_h: parseFloat(document.getElementById('config-valor-kwh').value),
                quantidade_acessorios: parseInt(document.getElementById('config-qty-acessorios').value),
                custo_unidade_acessorio: parseFloat(document.getElementById('config-custo-acessorio').value),
                custo_fixo_mensal: parseFloat(document.getElementById('config-custo-fixo').value),
                percentual_falha: parseFloat(document.getElementById('config-percentual-falha').value) / 100,
                markup: parseFloat(document.getElementById('config-markup').value),
                percentual_imposto: parseFloat(document.getElementById('config-percentual-imposto').value) / 100,
                taxa_cartao: parseFloat(document.getElementById('config-taxa-cartao').value) / 100,
                custo_anuncio_percentual: parseFloat(document.getElementById('config-custo-anuncio').value) / 100,
                potencia_w: parseInt(document.getElementById('config-potencia').value),
                valor_maquina: parseFloat(document.getElementById('config-valor-maquina').value),
                vida_util_horas: parseInt(document.getElementById('config-vida-util').value)
            };

            // Validar valores
            for (const [chave, valor] of Object.entries(novasConfigs)) {
                if (isNaN(valor) || valor < 0) {
                    throw new Error(`Valor inválido para ${chave}`);
                }
            }

            // Validação específica para percentuais
            if (novasConfigs.percentual_falha > 1) {
                throw new Error('Percentual de falha não pode ser maior que 100%');
            }
            if (novasConfigs.percentual_imposto > 1) {
                throw new Error('Percentual de imposto não pode ser maior que 100%');
            }
            if (novasConfigs.taxa_cartao > 1) {
                throw new Error('Taxa do cartão não pode ser maior que 100%');
            }
            if (novasConfigs.custo_anuncio_percentual > 1) {
                throw new Error('Custo de anúncio não pode ser maior que 100%');
            }

            // Atualizar configurações
            Object.entries(novasConfigs).forEach(([chave, valor]) => {
                this.calculadora.atualizarConfiguracao(chave, valor);
            });

            alert('Configurações salvas com sucesso!');
            this.fecharModal();
        } catch (error) {
            alert('Erro ao salvar configurações: ' + error.message);
        }
    }

    /**
     * Lê arquivo de configuração
     */
    lerArquivo(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const conteudo = e.target.result;
            this.conteudoArquivo = conteudo;
        };
        reader.readAsText(file);
    }

    /**
     * Importa configurações do arquivo
     */
    importarConfiguracoes() {
        if (!this.conteudoArquivo) {
            alert('Por favor, selecione um arquivo primeiro.');
            return;
        }

        if (this.calculadora.importarConfiguracoes(this.conteudoArquivo)) {
            alert('Configurações importadas com sucesso!');
            this.carregarValores();
            this.atualizarPreview();
        } else {
            alert('Erro ao importar configurações. Verifique o formato do arquivo.');
        }
    }

    /**
     * Exporta configurações para arquivo
     */
    exportarConfiguracoes() {
        const conteudo = this.calculadora.exportarConfiguracoes();
        const blob = new Blob([conteudo], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `alttab_config_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Reseta configurações para padrão
     */
    resetarConfiguracoes() {
        if (confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão?')) {
            this.calculadora.resetarConfiguracoes();
            this.carregarValores();
            this.atualizarPreview();
            alert('Configurações resetadas para os valores padrão.');
        }
    }

    /**
     * Atualiza preview das configurações
     */
    atualizarPreview() {
        const preview = document.getElementById('config-preview-text');
        if (preview) {
            preview.textContent = this.calculadora.exportarConfiguracoes();
        }
    }
}

// Exportar para uso global
window.ConfiguracaoManager = ConfiguracaoManager;
