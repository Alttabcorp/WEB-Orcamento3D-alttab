(function () {
    function setInputValue(id, value) {
        const input = document.getElementById(id);
        if (input) {
            input.value = value ?? '';
        }
    }

    function carregarValores(instance) {
        if (!instance?.calculadora?.obterConfiguracoes) {
            return;
        }

        const config = instance.calculadora.obterConfiguracoes();
        if (!config) {
            return;
        }

        setInputValue('config-preco-filamento', config.preco_filamento_por_kg);
        setInputValue('config-valor-kwh', config.valor_kw_h);
        setInputValue('config-qty-acessorios', config.quantidade_acessorios);
        setInputValue('config-custo-acessorio', config.custo_unidade_acessorio);
        setInputValue('config-custo-fixo', config.custo_fixo_mensal);
        setInputValue('config-percentual-falha', config.percentual_falha * 100);
        setInputValue('config-markup', config.markup);
        setInputValue('config-percentual-imposto', config.percentual_imposto * 100);
        setInputValue('config-taxa-cartao', config.taxa_cartao * 100);
        setInputValue('config-custo-anuncio', config.custo_anuncio_percentual * 100);
        setInputValue('config-potencia', config.potencia_w);
        setInputValue('config-valor-maquina', config.valor_maquina);
        setInputValue('config-vida-util', config.vida_util_horas);
    }

    window.ConfigModule.carregarValores = carregarValores;
})();
