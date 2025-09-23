/**
 * Módulo da Interface da Calculadora
 * Gerencia a interface e interações da calculadora de impressão 3D
 */

class CalculadoraInterface {
    constructor(calculadora) {
        this.calculadora = calculadora;
        this.initEventListeners();
    }

    /**
     * Inicializa os event listeners
     */
    initEventListeners() {
        // Botões principais
        const btnCalcular = document.getElementById('calcular-custo');
        const btnLimpar = document.getElementById('limpar-calculo');
        
        if (btnCalcular) {
            btnCalcular.addEventListener('click', () => this.calcularCusto());
        }
        
        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => this.limparCalculadora());
        }

        // Cálculo automático com debounce
        const tempoInput = document.getElementById('tempo-impressao');
        const pesoInput = document.getElementById('peso-peca');
        
        if (tempoInput && pesoInput) {
            const calcularAutoDebounced = UtilsModule.debounce(() => {
                this.calcularCustoAutomatico();
            }, 500);

            tempoInput.addEventListener('input', calcularAutoDebounced);
            pesoInput.addEventListener('input', calcularAutoDebounced);
        }
    }

    /**
     * Obtém valores dos inputs
     * @returns {Object} - Valores de tempo e peso
     */
    obterValoresInputs() {
        const tempo = parseFloat(document.getElementById('tempo-impressao').value);
        const peso = parseFloat(document.getElementById('peso-peca').value);
        
        return { tempo, peso };
    }

    /**
     * Valida inputs antes do cálculo
     * @param {number} tempo - Tempo de impressão
     * @param {number} peso - Peso da peça
     * @returns {Array} - Lista de erros
     */
    validarInputs(tempo, peso) {
        const erros = [];

        if (!tempo || tempo <= 0) {
            erros.push('Por favor, insira um tempo de impressão válido (maior que 0).');
        }

        if (isNaN(peso) || peso < 0) {
            erros.push('Por favor, insira um peso válido (maior ou igual a 0).');
        }

        return erros;
    }

    /**
     * Calcula o custo de impressão
     */
    calcularCusto() {
        try {
            const { tempo, peso } = this.obterValoresInputs();
            
            // Validar inputs
            const erros = this.validarInputs(tempo, peso);
            if (erros.length > 0) {
                UtilsModule.mostrarNotificacao(erros.join('\n'), 'error');
                return;
            }
            
            // Calcular
            const resultado = this.calculadora.calcularCusto(tempo, peso);
            this.exibirResultado(resultado);
            
            // Notificação de sucesso
            UtilsModule.mostrarNotificacao('Cálculo realizado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro no cálculo:', error);
            UtilsModule.mostrarNotificacao(
                'Erro no cálculo: ' + error.message,
                'error'
            );
        }
    }

    /**
     * Calcula custo automaticamente (sem notificações)
     */
    calcularCustoAutomatico() {
        const { tempo, peso } = this.obterValoresInputs();
        
        if (tempo > 0 && peso >= 0 && !isNaN(tempo) && !isNaN(peso)) {
            try {
                const resultado = this.calculadora.calcularCusto(tempo, peso);
                this.exibirResultado(resultado);
            } catch (error) {
                console.warn('Erro no cálculo automático:', error);
                this.ocultarResultado();
            }
        } else {
            this.ocultarResultado();
        }
    }

    /**
     * Exibe o resultado do cálculo na interface
     * @param {Object} resultado - Resultado do cálculo
     */
    exibirResultado(resultado) {
        // Exibir seção de resultado
        const secaoResultado = document.getElementById('resultado-calculo');
        if (secaoResultado) {
            secaoResultado.style.display = 'block';
            
            // Atualizar valores principais
            this.atualizarElemento('custo-total-display', resultado.custo_total);
            this.atualizarElemento('custo-filamento-display', resultado.custo_filamento);
            this.atualizarElemento('custo-energetico-display', resultado.custo_energetico);
            this.atualizarElemento('custo-acessorios-display', resultado.custo_acessorios);
            this.atualizarElemento('custo-fixo-display', resultado.custo_fixo_por_unidade);
            this.atualizarElemento('amortizacao-display', resultado.amortizacao);
            this.atualizarElemento('custo-falha-display', resultado.custo_falha);
            
            // Atualizar novos custos adicionais
            this.atualizarElemento('custo-imposto-display', resultado.custo_imposto);
            this.atualizarElemento('custo-taxa-cartao-display', resultado.custo_taxa_cartao);
            this.atualizarElemento('custo-anuncio-display', resultado.custo_anuncio);
            
            // Atualizar preços de venda
            this.atualizarElemento('preco-consumidor-display', resultado.preco_consumidor_final);
            this.atualizarElemento('preco-lojista-display', resultado.preco_lojista);
            this.atualizarElemento('lucro-consumidor-display', resultado.lucro_bruto_consumidor);
            this.atualizarElemento('lucro-lojista-display', resultado.lucro_bruto_lojista);
            
            // Scroll suave para o resultado
            this.scrollParaResultado();
        }
    }

    /**
     * Oculta o resultado do cálculo
     */
    ocultarResultado() {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (secaoResultado) {
            secaoResultado.style.display = 'none';
        }
    }

    /**
     * Atualiza texto de um elemento
     * @param {string} elementId - ID do elemento
     * @param {string} valor - Valor a ser exibido
     */
    atualizarElemento(elementId, valor) {
        const elemento = document.getElementById(elementId);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    /**
     * Faz scroll suave para o resultado
     */
    scrollParaResultado() {
        const elemento = document.getElementById('resultado-calculo');
        if (elemento) {
            elemento.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }
    }

    /**
     * Limpa os campos da calculadora e oculta resultado
     */
    limparCalculadora() {
        // Limpar inputs
        const tempoInput = document.getElementById('tempo-impressao');
        const pesoInput = document.getElementById('peso-peca');
        
        if (tempoInput) tempoInput.value = '';
        if (pesoInput) pesoInput.value = '';
        
        // Ocultar resultado
        this.ocultarResultado();
        
        // Notificação
        UtilsModule.mostrarNotificacao('Calculadora limpa!', 'info');
    }

    /**
     * Exporta resultado atual para texto
     * @returns {string|null} - Resultado formatado ou null se não há resultado
     */
    exportarResultado() {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (!secaoResultado || secaoResultado.style.display === 'none') {
            return null;
        }

        const { tempo, peso } = this.obterValoresInputs();
        const custoTotal = document.getElementById('custo-total-display').textContent;
        const custoFilamento = document.getElementById('custo-filamento-display').textContent;
        const custoEnergetico = document.getElementById('custo-energetico-display').textContent;
        const custoImposto = document.getElementById('custo-imposto-display').textContent;
        const custoTaxaCartao = document.getElementById('custo-taxa-cartao-display').textContent;
        const custoAnuncio = document.getElementById('custo-anuncio-display').textContent;
        const precoConsumidor = document.getElementById('preco-consumidor-display').textContent;
        const precoLojista = document.getElementById('preco-lojista-display').textContent;

        return `
ORÇAMENTO IMPRESSÃO 3D - ${UtilsModule.formatarData()}
================================================

DADOS DA PEÇA:
- Tempo de Impressão: ${tempo} horas
- Peso da Peça: ${peso} gramas

CUSTOS DETALHADOS:
- Custo do Filamento: ${custoFilamento}
- Custo Energético: ${custoEnergetico}
- Imposto: ${custoImposto}
- Taxa do Cartão: ${custoTaxaCartao}
- Custo de Anúncio: ${custoAnuncio}

TOTAL:
- Custo Total: ${custoTotal}

PREÇOS SUGERIDOS:
- Preço Consumidor Final: ${precoConsumidor}
- Preço Lojista: ${precoLojista}

---
Gerado por Alttab - Soluções em 3D
        `.trim();
    }

    /**
     * Copia resultado para clipboard
     */
    async copiarResultado() {
        const resultado = this.exportarResultado();
        if (!resultado) {
            UtilsModule.mostrarNotificacao('Nenhum resultado para copiar.', 'warning');
            return;
        }

        const sucesso = await UtilsModule.copiarParaClipboard(resultado);
        if (sucesso) {
            UtilsModule.mostrarNotificacao('Resultado copiado para clipboard!', 'success');
        } else {
            UtilsModule.mostrarNotificacao('Erro ao copiar resultado.', 'error');
        }
    }

    /**
     * Adiciona botão de copiar resultado (se não existir)
     */
    adicionarBotaoCopiar() {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (!secaoResultado || document.getElementById('btn-copiar-resultado')) {
            return;
        }

        const btnCopiar = document.createElement('button');
        btnCopiar.id = 'btn-copiar-resultado';
        btnCopiar.className = 'btn btn-secondary';
        btnCopiar.style.marginTop = '1rem';
        btnCopiar.innerHTML = '📋 Copiar Resultado';
        btnCopiar.addEventListener('click', () => this.copiarResultado());

        secaoResultado.appendChild(btnCopiar);
    }
}

// Exportar para uso global
window.CalculadoraInterface = CalculadoraInterface;
