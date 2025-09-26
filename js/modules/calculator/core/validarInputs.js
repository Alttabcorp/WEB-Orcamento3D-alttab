(function () {
    function validarInputs(instance, inputs) {
        const erros = [];

        if (!inputs.tempo_h || inputs.tempo_h <= 0) {
            erros.push('Tempo de impressão deve ser maior que 0');
        }

        if (inputs.peso_g === undefined || inputs.peso_g < 0) {
            erros.push('Peso deve ser maior ou igual a 0');
        }

        const configsNumericas = [
            'preco_filamento_por_kg', 'potencia_w', 'valor_kw_h',
            'quantidade_acessorios', 'custo_unidade_acessorio',
            'custo_fixo_mensal', 'valor_maquina', 'vida_util_horas'
        ];

        configsNumericas.forEach(config => {
            if (instance.configuracoes[config] < 0) {
                erros.push(`${config} deve ser maior ou igual a 0`);
            }
        });

        if (instance.configuracoes.percentual_falha < 0 || instance.configuracoes.percentual_falha > 1) {
            erros.push('Percentual de falha deve estar entre 0 e 1');
        }

        if (instance.configuracoes.percentual_imposto < 0 || instance.configuracoes.percentual_imposto > 1) {
            erros.push('Percentual de imposto deve estar entre 0 e 1');
        }

        if (instance.configuracoes.taxa_cartao < 0 || instance.configuracoes.taxa_cartao > 1) {
            erros.push('Taxa do cartão deve estar entre 0 e 1');
        }

        if (instance.configuracoes.custo_anuncio_percentual < 0 || instance.configuracoes.custo_anuncio_percentual > 1) {
            erros.push('Custo de anúncio deve estar entre 0 e 1');
        }

        return erros;
    }

    window.CalculatorModule.validarInputs = validarInputs;
})();
