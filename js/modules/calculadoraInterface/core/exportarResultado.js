(function () {
    function exportarResultado() {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (!secaoResultado || secaoResultado.style.display === 'none') {
            return null;
        }

        const getValor = (id) => {
            const elemento = document.getElementById(id);
            return elemento ? elemento.textContent : 'N/D';
        };

        const parseMoeda = (valor) => {
            if (typeof valor !== 'string') {
                return 0;
            }
            const normalizado = valor.replace(/[^\d,-]/g, '').replace(/\.(?=\d{3})/g, '').replace(',', '.');
            const numero = parseFloat(normalizado);
            return Number.isFinite(numero) ? numero : 0;
        };

        const formatarMoeda = typeof UtilsModule?.formatarMoeda === 'function'
            ? UtilsModule.formatarMoeda
            : (valor) => Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const { tempo = 'N/D', peso = 'N/D' } = window.CalculadoraUI.obterValoresInputs();
        const custoTotal = getValor('custo-total-display');
        const custoFilamento = getValor('custo-filamento-display');
        const custoEnergetico = getValor('custo-energetico-display');
        const custoAcessorios = getValor('custo-acessorios-display');
        const custoFixo = getValor('custo-fixo-display');
        const amortizacao = getValor('amortizacao-display');
        const custoFalha = getValor('custo-falha-display');
        const custoImposto = getValor('custo-imposto-display');
        const custoTaxaCartao = getValor('custo-taxa-cartao-display');
        const custoAnuncio = getValor('custo-anuncio-display');
        const precoConsumidor = getValor('preco-consumidor-display');
        const precoLojista = getValor('preco-lojista-display');
        const precoFaixaBase = getValor('preco-faixa-base-display');
        const precoFaixa10 = getValor('preco-faixa-10-display');
        const precoFaixa50 = getValor('preco-faixa-50-display');
        const precoFaixa100 = getValor('preco-faixa-100-display');
        const lucroBruto = getValor('lucro-consumidor-display');
        const lucroLiquido = formatarMoeda(
            parseMoeda(lucroBruto)
                - parseMoeda(custoImposto)
                - parseMoeda(custoTaxaCartao)
                - parseMoeda(custoAnuncio)
        );
        const valorMarkup = formatarMoeda(
            parseMoeda(precoConsumidor) - parseMoeda(custoTotal)
        );

        return `
ORÇAMENTO IMPRESSÃO 3D - ${UtilsModule.formatarData()}
================================================

DADOS DA PEÇA:
- Tempo de Impressão: ${tempo} horas
- Peso da Peça: ${peso} gramas

CUSTOS DETALHADOS:
- Custo do Filamento: ${custoFilamento}
- Custo Energético: ${custoEnergetico}
- Acessórios / Embalagem: ${custoAcessorios}
- Custo Fixo por Unidade: ${custoFixo}
- Amortização: ${amortizacao}
- Custo por Falha: ${custoFalha}
- Markup: ${valorMarkup}
- Imposto: ${custoImposto}
- Taxa do Cartão: ${custoTaxaCartao}
- Custo de Anúncio: ${custoAnuncio}

TOTAL:
- Custo Total: ${custoTotal}

PREÇOS SUGERIDOS:
- Preço Consumidor Final: ${precoConsumidor}
- Preço Lojista: ${precoLojista}
- Lucro Bruto (Consumidor): ${lucroBruto}
- Lucro Líquido (Consumidor): ${lucroLiquido}

ESCALONAMENTO:
- 1 - 9 unidades: ${precoFaixaBase}
- 10 - 49 unidades: ${precoFaixa10}
- 50 - 99 unidades: ${precoFaixa50}
- 100+ unidades: ${precoFaixa100}

---
Gerado por Alttab - Soluções em 3D
        `.trim();
    }

    window.CalculadoraUI.exportarResultado = exportarResultado;
})();
