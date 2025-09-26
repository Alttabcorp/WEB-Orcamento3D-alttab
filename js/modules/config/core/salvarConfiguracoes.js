(function () {
    function salvarConfiguracoes(instance) {
        try {
            const novasConfigs = {
                preco_filamento_por_kg: parseFloat(document.getElementById('config-preco-filamento')?.value),
                valor_kw_h: parseFloat(document.getElementById('config-valor-kwh')?.value),
                quantidade_acessorios: parseInt(document.getElementById('config-qty-acessorios')?.value, 10),
                custo_unidade_acessorio: parseFloat(document.getElementById('config-custo-acessorio')?.value),
                custo_fixo_mensal: parseFloat(document.getElementById('config-custo-fixo')?.value),
                percentual_falha: parseFloat(document.getElementById('config-percentual-falha')?.value) / 100,
                markup: parseFloat(document.getElementById('config-markup')?.value),
                percentual_imposto: parseFloat(document.getElementById('config-percentual-imposto')?.value) / 100,
                taxa_cartao: parseFloat(document.getElementById('config-taxa-cartao')?.value) / 100,
                custo_anuncio_percentual: parseFloat(document.getElementById('config-custo-anuncio')?.value) / 100,
                potencia_w: parseInt(document.getElementById('config-potencia')?.value, 10),
                valor_maquina: parseFloat(document.getElementById('config-valor-maquina')?.value),
                vida_util_horas: parseInt(document.getElementById('config-vida-util')?.value, 10)
            };

            for (const [chave, valor] of Object.entries(novasConfigs)) {
                if (Number.isNaN(valor) || valor < 0) {
                    throw new Error(`Valor inválido para ${chave}`);
                }
            }

            if (novasConfigs.percentual_falha > 1) {
                throw new Error('Percentual de falha não pode ser maior que 100%');
            }
            if (novasConfigs.percentual_imposto > 1) {
                throw new Error('Percentual de imposto não pode ser maior que 100%');
            }
            if (novasConfigs.taxa_cartao > 1) {
                throw new Error('Taxa do cartão não pode ser maior que 100%');
            }
            if (novasConfigs.custo_anuncio_percentual > 1) {
                throw new Error('Custo de anúncio não pode ser maior que 100%');
            }

            Object.entries(novasConfigs).forEach(([chave, valor]) => {
                instance.calculadora.atualizarConfiguracao(chave, valor);
            });

            alert('Configurações salvas com sucesso!');
            window.ConfigModule.fecharModal();
        } catch (error) {
            alert('Erro ao salvar configurações: ' + error.message);
        }
    }

    window.ConfigModule.salvarConfiguracoes = salvarConfiguracoes;
})();
