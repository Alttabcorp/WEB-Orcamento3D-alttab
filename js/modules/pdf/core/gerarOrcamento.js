(function () {
    async function gerarOrcamento(pdf, e) {
        e.preventDefault();

        try {
            console.log('Iniciando geração do PDF...');

            const dados = window.PDFCore.coletarDadosFormulario();
            const erros = window.PDFCore.validarDados(dados);

            if (erros.length > 0) {
                UtilsModule.mostrarNotificacao(
                    'Corrija os seguintes erros:\n' + erros.join('\n'),
                    'error'
                );
                return;
            }

            console.log('Dados coletados:', dados);

            if (!window.jsPDF) {
                throw new Error('jsPDF não está disponível');
            }

            pdf.doc = new window.jsPDF();
            pdf.yAtual = pdf.margemSuperior;

            await window.PDFSections.adicionarCabecalho(pdf);
            await window.PDFSections.adicionarDadosCliente(pdf, dados.cliente);
            await window.PDFSections.adicionarDetalhesProjeto(pdf, dados.projeto, pdf.yAtual);
            await window.PDFSections.adicionarImpressao3D(pdf, dados.impressao3D, pdf.yAtual);
            await window.PDFSections.adicionarServicosAdicionais(pdf, dados.servicosAdicionais, pdf.yAtual);

            await window.PDFSections.adicionarRodape(pdf);
            window.PDFCore.atualizarNumeracaoPaginas(pdf);

            const nomeArquivo = `orcamento-${UtilsModule.sanitizarNomeArquivo(dados.cliente.nome)}.pdf`;
            pdf.doc.save(nomeArquivo);

            let mensagem = 'Orçamento gerado com sucesso!';
            if (dados.projeto.imagem) {
                mensagem = 'Orçamento com imagem gerado com sucesso!';
            }
            UtilsModule.mostrarNotificacao(mensagem, 'success');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            UtilsModule.mostrarNotificacao(
                'Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.',
                'error'
            );
        }
    }

    window.PDFCore.gerarOrcamento = gerarOrcamento;
})();
