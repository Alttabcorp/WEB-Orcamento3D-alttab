(function () {
    function getDefaultConfig() {
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
            percentual_imposto: 0.085,
            taxa_cartao: 0.045,
            custo_anuncio_percentual: 0.15
        };
    }

    window.CalculatorModule.getDefaultConfig = getDefaultConfig;
})();
