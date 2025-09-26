(function () {
    function calcularCusto(instance, tempo_h, peso_g) {
        const inputs = { tempo_h, peso_g };
        const erros = window.CalculatorModule.validarInputs(instance, inputs);
        if (erros.length > 0) {
            throw new Error('Erros de validação: ' + erros.join(', '));
        }

        const config = instance.configuracoes;

        const custo_filamento = (peso_g / 1000) * config.preco_filamento_por_kg;

        const gasto_energetico_wh = config.potencia_w * tempo_h * 0.5;
        const gasto_energetico_kwh = gasto_energetico_wh / 1000;
        const custo_energetico = gasto_energetico_kwh * config.valor_kw_h;

        const custo_acessorios = config.quantidade_acessorios * config.custo_unidade_acessorio;

        const unidades_no_mes = tempo_h > 0 ? 720 / tempo_h : 0;

        const custo_fixo_por_unidade = unidades_no_mes > 0 ? config.custo_fixo_mensal / unidades_no_mes : 0;

        const amortizacao = (config.valor_maquina / config.vida_util_horas) * tempo_h;

        const subtotal = custo_filamento + custo_energetico + custo_acessorios + custo_fixo_por_unidade + amortizacao;

        const custo_falha = config.percentual_falha * (custo_filamento + custo_energetico + amortizacao) * 0.7;

        const custo_total = subtotal + custo_falha;

        const valor_base = custo_total * config.markup;

        const custo_imposto = valor_base * config.percentual_imposto;
        const custo_taxa_cartao = valor_base * config.taxa_cartao;
        const custo_anuncio = valor_base * config.custo_anuncio_percentual;

        const preco_consumidor_final = valor_base + custo_imposto + custo_taxa_cartao + custo_anuncio;
        const preco_lojista = preco_consumidor_final / 2;
        const lucro_bruto_consumidor = preco_consumidor_final - custo_total - custo_imposto - custo_taxa_cartao - custo_anuncio;
        const lucro_bruto_lojista = preco_lojista - custo_total;

        const formatar = window.CalculatorModule.formatarMoeda;

        return {
            custo_filamento: formatar(custo_filamento),
            custo_energetico: formatar(custo_energetico),
            custo_acessorios: formatar(custo_acessorios),
            custo_fixo_por_unidade: formatar(custo_fixo_por_unidade),
            amortizacao: formatar(amortizacao),
            custo_falha: formatar(custo_falha),
            custo_imposto: formatar(custo_imposto),
            custo_taxa_cartao: formatar(custo_taxa_cartao),
            custo_anuncio: formatar(custo_anuncio),
            subtotal: formatar(subtotal),
            custo_total: formatar(custo_total),
            preco_consumidor_final: formatar(preco_consumidor_final),
            preco_lojista: formatar(preco_lojista),
            lucro_bruto_consumidor: formatar(lucro_bruto_consumidor),
            lucro_bruto_lojista: formatar(lucro_bruto_lojista),
            gasto_energetico_wh: gasto_energetico_wh.toFixed(2),
            gasto_energetico_kwh: gasto_energetico_kwh.toFixed(4),
            unidades_no_mes: unidades_no_mes.toFixed(1),
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

    window.CalculatorModule.calcularCusto = calcularCusto;
})();
