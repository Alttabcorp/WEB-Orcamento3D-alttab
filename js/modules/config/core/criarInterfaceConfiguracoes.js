(function () {
    function criarInterfaceConfiguracoes() {
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
                            <input type="number" id="config-preco-filamento" step="0.01" min="0" placeholder="Ex: 156.00">
                        </div>
                        <div class="form-group">
                            <label for="config-valor-kwh">Tarifa de Energia (R$/kWh)</label>
                            <input type="number" id="config-valor-kwh" step="0.01" min="0" placeholder="Ex: 0.84">
                        </div>
                        <div class="form-group">
                            <label for="config-qty-acessorios">Quantidade de Acessórios/Embalagem</label>
                            <input type="number" id="config-qty-acessorios" min="0" placeholder="Ex: 1">
                        </div>
                        <div class="form-group">
                            <label for="config-custo-acessorio">Custo Unitário de Acessório/Embalagem (R$)</label>
                            <input type="number" id="config-custo-acessorio" step="0.01" min="0" placeholder="Ex: 0.48">
                        </div>
                        <div class="form-group">
                            <label for="config-custo-fixo">Custo Fixo Mensal (R$)</label>
                            <input type="number" id="config-custo-fixo" step="0.01" min="0" placeholder="Ex: 300.00">
                        </div>
                        <div class="form-group">
                            <label for="config-percentual-falha">Percentual de Falha (%)</label>
                            <input type="number" id="config-percentual-falha" step="0.01" min="0" max="100" placeholder="Ex: 10">
                        </div>
                        <div class="form-group">
                            <label for="config-markup">Markup</label>
                            <input type="number" id="config-markup" step="0.1" min="1" placeholder="Ex: 3">
                        </div>
                        <div class="form-group">
                            <label for="config-percentual-imposto">Percentual de Imposto (%)</label>
                            <input type="number" id="config-percentual-imposto" step="0.01" min="0" max="100" placeholder="Ex: 8.5">
                        </div>
                        <div class="form-group">
                            <label for="config-taxa-cartao">Taxa do Cartão (%)</label>
                            <input type="number" id="config-taxa-cartao" step="0.01" min="0" max="100" placeholder="Ex: 4.5">
                        </div>
                        <div class="form-group">
                            <label for="config-custo-anuncio">Custo de Anúncio (%)</label>
                            <input type="number" id="config-custo-anuncio" step="0.01" min="0" max="100" placeholder="Ex: 15">
                        </div>
                    </div>

                    <div id="maquina-tab" class="tab-content">
                        <div class="form-group">
                            <label for="config-potencia">Potência da Impressora (W)</label>
                            <input type="number" id="config-potencia" min="0" placeholder="Ex: 175">
                        </div>
                        <div class="form-group">
                            <label for="config-valor-maquina">Valor da Máquina (R$)</label>
                            <input type="number" id="config-valor-maquina" step="0.01" min="0" placeholder="Ex: 2000.00">
                        </div>
                        <div class="form-group">
                            <label for="config-vida-util">Vida Útil da Máquina (horas)</label>
                            <input type="number" id="config-vida-util" min="1" placeholder="Ex: 24000">
                        </div>
                    </div>

                    <div id="importar-tab" class="tab-content">
                        <div class="import-export-section">
                            <h3>Importar Configurações</h3>
                            <div class="form-group">
                                <label for="config-file">Selecionar arquivo de configuração (.txt)</label>
                                <input type="file" id="config-file" accept=".txt">
                            </div>
                            <button type="button" id="importar-config" class="btn btn-secondary">Importar Configurações</button>
                        </div>

                        <div class="import-export-section">
                            <h3>Exportar Configurações</h3>
                            <button type="button" id="exportar-config" class="btn btn-secondary">Exportar Configurações</button>
                        </div>

                        <div class="import-export-section">
                            <h3>Resetar Configurações</h3>
                            <button type="button" id="resetar-config" class="btn btn-danger">Resetar para Padrão</button>
                        </div>

                        <div class="config-preview">
                            <h3>Configurações Atuais</h3>
                            <pre id="config-preview-text"></pre>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="salvar-config" class="btn btn-primary">Salvar Configurações</button>
                    <button type="button" id="cancelar-config" class="btn btn-secondary">Cancelar</button>
                </div>
            </div>
        </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    window.ConfigModule.criarInterfaceConfiguracoes = criarInterfaceConfiguracoes;
})();
