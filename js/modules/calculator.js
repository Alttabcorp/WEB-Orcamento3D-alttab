/**
 * Módulo Calculadora de Orçamento 3D - Alttab
 * Calcula o custo de impressão 3D baseado nos parâmetros fornecidos
 */

class CalculadoraOrcamento3D {
    constructor() {
        this.configuracoes = this.carregarConfiguracoes();
        this.inicializar();
    }

    /**
     * Carrega configurações salvas no localStorage
     */
    carregarConfiguracoes() {
        const configSalva = localStorage.getItem('alttab_config_3d');
        if (configSalva) {
            try {
                return JSON.parse(configSalva);
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
            }
        }

        // Configurações padrão
        return {
            preco_filamento_por_kg: 156.00,
            potencia_w: 175,
            valor_kw_h: 0.84,
            quantidade_acessorios: 1,
            custo_unidade_acessorio: 0.48,
            custo_fixo_mensal: 300.00,
            valor_maquina: 2000.00,
            vida_util_horas: 24000,
            percentual_falha: 0.10,
            markup: 3,
            // Novos custos adicionais
            percentual_imposto: 0.085, // 8.5% de imposto
            taxa_cartao: 0.045, // 4.5% de taxa do cartão
            custo_anuncio_percentual: 0.15 // 15% do valor para anúncios
        };
    }

    /**
     * Salva configurações no localStorage
     */
    salvarConfiguracoes() {
        try {
            localStorage.setItem('alttab_config_3d', JSON.stringify(this.configuracoes));
            return true;
        } catch (error) {
            console.error('Erro ao salvar configurações:', error);
            return false;
        }
    }

    /**
     * Importa configurações de um arquivo texto
     * @param {string} conteudoTxt - Conteúdo do arquivo texto
     */
    importarConfiguracoes(conteudoTxt) {
        try {
            const linhas = conteudoTxt.split('\n');
            const novasConfiguracoes = {};

            linhas.forEach(linha => {
                linha = linha.trim();
                if (linha && linha.includes('=')) {
                    const [chave, valor] = linha.split('=').map(item => item.trim());
                    const valorNumerico = parseFloat(valor.replace(',', '.'));
                    
                    if (!isNaN(valorNumerico)) {
                        novasConfiguracoes[chave] = valorNumerico;
                    }
                }
            });

            // Atualiza apenas as configurações válidas
            Object.keys(this.configuracoes).forEach(chave => {
                if (novasConfiguracoes.hasOwnProperty(chave)) {
                    this.configuracoes[chave] = novasConfiguracoes[chave];
                }
            });

            this.salvarConfiguracoes();
            return true;
        } catch (error) {
            console.error('Erro ao importar configurações:', error);
            return false;
        }
    }

    /**
     * Exporta configurações para formato texto
     */
    exportarConfiguracoes() {
        let conteudo = '# Configurações Alttab 3D\n';
        conteudo += '# Gerado em: ' + new Date().toLocaleString('pt-BR') + '\n\n';
        
        Object.entries(this.configuracoes).forEach(([chave, valor]) => {
            conteudo += `${chave}=${valor}\n`;
        });

        return conteudo;
    }

    /**
     * Valida os inputs fornecidos
     * @param {Object} inputs - Objeto com os inputs a serem validados
     */
    validarInputs(inputs) {
        const erros = [];

        // Validações obrigatórias
        if (!inputs.tempo_h || inputs.tempo_h <= 0) {
            erros.push('Tempo de impressão deve ser maior que 0');
        }

        if (inputs.peso_g === undefined || inputs.peso_g < 0) {
            erros.push('Peso deve ser maior ou igual a 0');
        }

        // Validações das configurações
        const configsNumericas = [
            'preco_filamento_por_kg', 'potencia_w', 'valor_kw_h',
            'quantidade_acessorios', 'custo_unidade_acessorio',
            'custo_fixo_mensal', 'valor_maquina', 'vida_util_horas'
        ];

        configsNumericas.forEach(config => {
            if (this.configuracoes[config] < 0) {
                erros.push(`${config} deve ser maior ou igual a 0`);
            }
        });

        if (this.configuracoes.percentual_falha < 0 || this.configuracoes.percentual_falha > 1) {
            erros.push('Percentual de falha deve estar entre 0 e 1');
        }

        if (this.configuracoes.percentual_imposto < 0 || this.configuracoes.percentual_imposto > 1) {
            erros.push('Percentual de imposto deve estar entre 0 e 1');
        }

        if (this.configuracoes.taxa_cartao < 0 || this.configuracoes.taxa_cartao > 1) {
            erros.push('Taxa do cartão deve estar entre 0 e 1');
        }

        if (this.configuracoes.custo_anuncio_percentual < 0 || this.configuracoes.custo_anuncio_percentual > 1) {
            erros.push('Custo de anúncio deve estar entre 0 e 1');
        }

        return erros;
    }

    /**
     * Calcula o custo total de impressão
     * @param {number} tempo_h - Tempo de impressão em horas
     * @param {number} peso_g - Peso da peça em gramas
     */
    calcularCusto(tempo_h, peso_g) {
        const inputs = { tempo_h, peso_g };
        
        // Validar inputs
        const erros = this.validarInputs(inputs);
        if (erros.length > 0) {
            throw new Error('Erros de validação: ' + erros.join(', '));
        }

        const config = this.configuracoes;
        
        // 1. Custo do filamento
        const custo_filamento = (peso_g / 1000) * config.preco_filamento_por_kg;

        // 2. Gasto energético
        const gasto_energetico_wh = config.potencia_w * tempo_h * 0.5; // fator operacional 0.5
        const gasto_energetico_kwh = gasto_energetico_wh / 1000;
        const custo_energetico = gasto_energetico_kwh * config.valor_kw_h;

        // 3. Acessórios + embalagens
        const custo_acessorios = config.quantidade_acessorios * config.custo_unidade_acessorio;

        // 4. Unidades por mês (estimativa)
        const unidades_no_mes = tempo_h > 0 ? 720 / tempo_h : 0;

        // 5. Custo fixo por unidade
        const custo_fixo_por_unidade = unidades_no_mes > 0 ? config.custo_fixo_mensal / unidades_no_mes : 0;

        // 6. Amortização
        const amortizacao = (config.valor_maquina / config.vida_util_horas) * tempo_h;

        // 7. Cálculo parcial (antes da falha)
        const subtotal = custo_filamento + custo_energetico + custo_acessorios + custo_fixo_por_unidade + amortizacao;

        // 8. Custo de falha adicional
        const custo_falha = config.percentual_falha * (custo_filamento + custo_energetico + amortizacao) * 0.7;

        // 9. Custo total por unidade
        const custo_total = subtotal + custo_falha;

        // 10. Preços com markup
        const valor_base = custo_total * config.markup;
        
        // 11. Custos adicionais
        const custo_imposto = valor_base * config.percentual_imposto;
        const custo_taxa_cartao = valor_base * config.taxa_cartao;
        const custo_anuncio = valor_base * config.custo_anuncio_percentual;
        
        // 12. Preço final
        const preco_consumidor_final = valor_base + custo_imposto + custo_taxa_cartao + custo_anuncio;
        const preco_lojista = preco_consumidor_final / 2; // 50% do preço final
        const lucro_bruto_consumidor = preco_consumidor_final - custo_total - custo_imposto - custo_taxa_cartao - custo_anuncio;
        const lucro_bruto_lojista = preco_lojista - custo_total;

        return {
            // Custos detalhados
            custo_filamento: this.formatarMoeda(custo_filamento),
            custo_energetico: this.formatarMoeda(custo_energetico),
            custo_acessorios: this.formatarMoeda(custo_acessorios),
            custo_fixo_por_unidade: this.formatarMoeda(custo_fixo_por_unidade),
            amortizacao: this.formatarMoeda(amortizacao),
            custo_falha: this.formatarMoeda(custo_falha),
            
            // Custos adicionais
            custo_imposto: this.formatarMoeda(custo_imposto),
            custo_taxa_cartao: this.formatarMoeda(custo_taxa_cartao),
            custo_anuncio: this.formatarMoeda(custo_anuncio),
            
            // Totais
            subtotal: this.formatarMoeda(subtotal),
            custo_total: this.formatarMoeda(custo_total),
            
            // Preços de venda
            preco_consumidor_final: this.formatarMoeda(preco_consumidor_final),
            preco_lojista: this.formatarMoeda(preco_lojista),
            lucro_bruto_consumidor: this.formatarMoeda(lucro_bruto_consumidor),
            lucro_bruto_lojista: this.formatarMoeda(lucro_bruto_lojista),
            
            // Dados técnicos
            gasto_energetico_wh: gasto_energetico_wh.toFixed(2),
            gasto_energetico_kwh: gasto_energetico_kwh.toFixed(4),
            unidades_no_mes: unidades_no_mes.toFixed(1),
            
            // Valores brutos para cálculos
            valores_brutos: {
                custo_filamento,
                custo_energetico,
                custo_acessorios,
                custo_fixo_por_unidade,
                amortizacao,
                custo_falha,
                custo_imposto,
                custo_taxa_cartao,
                custo_anuncio,
                subtotal,
                custo_total,
                preco_consumidor_final,
                preco_lojista,
                lucro_bruto_consumidor,
                lucro_bruto_lojista
            }
        };
    }

    /**
     * Formata valor em moeda brasileira
     * @param {number} valor - Valor a ser formatado
     */
    formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    /**
     * Atualiza uma configuração específica
     * @param {string} chave - Chave da configuração
     * @param {number} valor - Novo valor
     */
    atualizarConfiguracao(chave, valor) {
        if (this.configuracoes.hasOwnProperty(chave)) {
            this.configuracoes[chave] = parseFloat(valor);
            this.salvarConfiguracoes();
            return true;
        }
        return false;
    }

    /**
     * Obtém todas as configurações
     */
    obterConfiguracoes() {
        return { ...this.configuracoes };
    }

    /**
     * Reseta configurações para os valores padrão
     */
    resetarConfiguracoes() {
        this.configuracoes = {
            preco_filamento_por_kg: 156.00,
            potencia_w: 175,
            valor_kw_h: 0.84,
            quantidade_acessorios: 1,
            custo_unidade_acessorio: 0.48,
            custo_fixo_mensal: 300.00,
            valor_maquina: 2000.00,
            vida_util_horas: 24000,
            percentual_falha: 0.10,
            markup: 3
        };
        this.salvarConfiguracoes();
    }

    /**
     * Inicializa eventos e funcionalidades
     */
    inicializar() {
        console.log('Calculadora de Orçamento 3D inicializada');
        console.log('Configurações atuais:', this.configuracoes);
    }
}

// Exportar para uso global
window.CalculadoraOrcamento3D = CalculadoraOrcamento3D;

// Instância global
window.calculadora3D = new CalculadoraOrcamento3D();