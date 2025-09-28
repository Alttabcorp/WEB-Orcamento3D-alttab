(function () {
    function exibirResultado(instance, resultado) {
        const secaoResultado = document.getElementById('resultado-calculo');
        if (!secaoResultado) {
            return;
        }

        secaoResultado.style.display = 'block';

        const atualizarElemento = window.CalculadoraUI.atualizarElemento;

        atualizarElemento('custo-total-display', resultado.custo_total);
        atualizarElemento('custo-filamento-display', resultado.custo_filamento);
        atualizarElemento('custo-energetico-display', resultado.custo_energetico);
        atualizarElemento('custo-acessorios-display', resultado.custo_acessorios);
        atualizarElemento('custo-fixo-display', resultado.custo_fixo_por_unidade);
        atualizarElemento('amortizacao-display', resultado.amortizacao);
        atualizarElemento('custo-falha-display', resultado.custo_falha);

        atualizarElemento('custo-imposto-display', resultado.custo_imposto);
        atualizarElemento('custo-taxa-cartao-display', resultado.custo_taxa_cartao);
        atualizarElemento('custo-anuncio-display', resultado.custo_anuncio);

        atualizarElemento('preco-consumidor-display', resultado.preco_consumidor_final);
        atualizarElemento('preco-lojista-display', resultado.preco_lojista);
        atualizarElemento('lucro-consumidor-display', resultado.lucro_bruto_consumidor);
        atualizarElemento('lucro-lojista-display', resultado.lucro_bruto_lojista);

        if (resultado.precos_escalonados) {
            atualizarElemento('preco-faixa-base-display', resultado.precos_escalonados.faixa_padrao);
            atualizarElemento('preco-faixa-10-display', resultado.precos_escalonados.faixa_10);
            atualizarElemento('preco-faixa-50-display', resultado.precos_escalonados.faixa_50_intervalo);
            atualizarElemento('preco-faixa-100-display', resultado.precos_escalonados.faixa_100);
        }

        window.CalculadoraUI.scrollParaResultado();
        window.CalculadoraUI.adicionarBotaoCopiar(instance);
    }

    window.CalculadoraUI.exibirResultado = exibirResultado;
})();
