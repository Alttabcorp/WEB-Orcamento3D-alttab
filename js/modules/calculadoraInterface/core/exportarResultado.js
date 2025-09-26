(function () {
    function exportarResultado() {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (!secaoResultado || secaoResultado.style.display === 'none') {
            return null;
        }

        const { tempo, peso } = window.CalculadoraUI.obterValoresInputs();
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

    window.CalculadoraUI.exportarResultado = exportarResultado;
})();
