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
        const lucroBruto = getValor('lucro-consumidor-display');
        const lucroLiquido = formatarMoeda(
            parseMoeda(lucroBruto)
                - parseMoeda(custoImposto)
                - parseMoeda(custoTaxaCartao)
                - parseMoeda(custoAnuncio)
        );
        const valorMarkup = window.CalculadoraUI.configuracoes?.markup
            ? formatarMoeda(window.CalculadoraUI.configuracoes.markup)
            : 'N/D';

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

---
Gerado por Alttab - Soluções em 3D
        `.trim();
    }

    window.CalculadoraUI.exportarResultado = exportarResultado;
})();
