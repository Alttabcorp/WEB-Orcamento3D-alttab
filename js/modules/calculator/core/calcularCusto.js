(function () {
    function ajustarParaFinal(valor, sufixo) {
        if (!Number.isFinite(valor) || !Number.isFinite(sufixo)) {
            return 0;
        }
        const fracao = sufixo % 1;
        let inteiro = Math.floor(valor);
        let candidato = inteiro + fracao;
        if (candidato < valor) {
            inteiro += 1;
            candidato = inteiro + fracao;
        }
        return Number(candidato.toFixed(2));
    }

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

    const precoConsumidorBase = custo_total * config.markup;
    const preco_consumidor_final = ajustarParaFinal(precoConsumidorBase, 0.9);
    const ajuste_psicologico = preco_consumidor_final - precoConsumidorBase;
        const valor_markup = preco_consumidor_final - custo_total;

        const custo_imposto = preco_consumidor_final * config.percentual_imposto;
        const custo_taxa_cartao = preco_consumidor_final * config.taxa_cartao;
        const custo_anuncio = preco_consumidor_final * config.custo_anuncio_percentual;

        const margemMinimaLojista = Number(config.margem_minima_lojista) || 1.35;
        const preco_lojista_base = Math.max(preco_consumidor_final * 0.5, custo_total * margemMinimaLojista);
        let preco_lojista = ajustarParaFinal(preco_lojista_base, 0.45);
        const limiteSuperiorLojista = ajustarParaFinal(preco_consumidor_final * 0.95, 0.45);
        if (limiteSuperiorLojista >= preco_lojista_base && preco_lojista > limiteSuperiorLojista) {
            preco_lojista = limiteSuperiorLojista;
        }
        const lucro_bruto_consumidor = preco_consumidor_final - custo_total;
        const lucro_liquido_consumidor = lucro_bruto_consumidor - custo_imposto - custo_taxa_cartao - custo_anuncio;
        const lucro_bruto_lojista = preco_lojista - custo_total;

        const materialProducao = custo_filamento + custo_energetico;
        const servicoTecnico = custo_fixo_por_unidade + amortizacao + custo_falha + valor_markup;
        const acabamentoEmbalagem = custo_acessorios;

    const preco_faixa_10 = ajustarParaFinal(Math.max(preco_consumidor_final * 0.84, custo_total * 1.15), 0.5);
        const precoFaixa50MinCalc = ajustarParaFinal(Math.max(preco_lojista * 0.88, custo_total * 1.08), 0.94);
        const preco_faixa_50_max = preco_lojista;
        const preco_faixa_50_min = precoFaixa50MinCalc > preco_faixa_50_max ? preco_faixa_50_max : precoFaixa50MinCalc;
        const preco_faixa_100 = Math.min(
            ajustarParaFinal(Math.max(preco_faixa_50_min * 0.94, custo_total * 1.05), 0.7),
            preco_faixa_50_min
        );

        const formatar = window.CalculatorModule.formatarMoeda;
        const faixa50IntervaloFormatado = preco_faixa_50_min === preco_faixa_50_max
            ? formatar(preco_faixa_50_max)
            : `${formatar(preco_faixa_50_min)} - ${formatar(preco_faixa_50_max)}`;

        return {
            custo_filamento: formatar(custo_filamento),
            custo_energetico: formatar(custo_energetico),
            custo_acessorios: formatar(custo_acessorios),
            custo_fixo_por_unidade: formatar(custo_fixo_por_unidade),
            amortizacao: formatar(amortizacao),
            custo_falha: formatar(custo_falha),
            material_producao: formatar(materialProducao),
            servico_tecnico: formatar(servicoTecnico),
            acabamento_embalagem: formatar(acabamentoEmbalagem),
            valor_markup: formatar(valor_markup),
            custo_imposto: formatar(custo_imposto),
            custo_taxa_cartao: formatar(custo_taxa_cartao),
            custo_anuncio: formatar(custo_anuncio),
            subtotal: formatar(subtotal),
            custo_total: formatar(custo_total),
            preco_consumidor_final: formatar(preco_consumidor_final),
            preco_lojista: formatar(preco_lojista),
            precos_escalonados: {
                faixa_padrao: formatar(preco_consumidor_final),
                faixa_10: formatar(preco_faixa_10),
                faixa_50_intervalo: faixa50IntervaloFormatado,
                faixa_100: formatar(preco_faixa_100)
            },
            lucro_bruto_consumidor: formatar(lucro_bruto_consumidor),
            lucro_liquido_consumidor: formatar(lucro_liquido_consumidor),
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
                material_producao: materialProducao,
                servico_tecnico: servicoTecnico,
                acabamento_embalagem: acabamentoEmbalagem,
                valor_markup,
                custo_imposto,
                custo_taxa_cartao,
                custo_anuncio,
                subtotal,
                custo_total,
                preco_consumidor_base: precoConsumidorBase,
                ajuste_psicologico,
                preco_consumidor_final,
                lucro_liquido_consumidor,
                preco_lojista,
                precos_escalonados: {
                    faixa_padrao: preco_consumidor_final,
                    faixa_10: preco_faixa_10,
                    faixa_50_min: preco_faixa_50_min,
                    faixa_50_max: preco_faixa_50_max,
                    faixa_100: preco_faixa_100
                },
                lucro_bruto_consumidor,
                lucro_bruto_lojista
            }
        };
    }

    window.CalculatorModule.calcularCusto = calcularCusto;
})();
