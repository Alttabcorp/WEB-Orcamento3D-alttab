(function () {
    function coletarDadosFormulario() {
        const dados = {
            cliente: {
                nome: document.getElementById('nomeCliente').value,
                email: document.getElementById('emailCliente').value,
                telefone: document.getElementById('telefoneCliente').value
            },
            projeto: {
                tipo: 'Impressão 3D',
                descricao: document.getElementById('descricaoProjeto').value,
                prazo: document.getElementById('prazoEntrega').value,
                imagem: null
            },
            servicosAdicionais: Array.from(document.querySelectorAll('input[name="servicosAdicionais"]:checked'))
                .map(checkbox => checkbox.value),
            impressao3D: {
                tempo: document.getElementById('tempo-impressao').value,
                peso: document.getElementById('peso-peca').value,
                custoCalculado: null
            }
        };

        const inputImagem = document.getElementById('imagemProjeto');
        if (inputImagem && inputImagem.files && inputImagem.files[0]) {
            dados.projeto.imagem = inputImagem.files[0];
        }

        if (dados.impressao3D.tempo && dados.impressao3D.peso && window.calculadora3D) {
            try {
                dados.impressao3D.custoCalculado = window.calculadora3D.calcularCusto(
                    parseFloat(dados.impressao3D.tempo),
                    parseFloat(dados.impressao3D.peso)
                );
            } catch (error) {
                console.warn('Erro ao calcular custo para PDF:', error);
            }
        }

        return dados;
    }

    window.PDFCore.coletarDadosFormulario = coletarDadosFormulario;
})();
