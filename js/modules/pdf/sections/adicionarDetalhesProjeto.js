(function () {
    async function adicionarDetalhesProjeto(pdf, projeto) {
        pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, 60);

        const { doc, margemEsquerda, larguraUtil } = pdf;
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Especificações do Projeto', margemEsquerda, pdf.yAtual);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        pdf.yAtual += 15;

        doc.text([
            `Categoria: ${projeto.tipo}`,
            `Prazo de entrega: ${projeto.prazo} dias úteis`
        ], margemEsquerda, pdf.yAtual);

        pdf.yAtual += 25;

        doc.setFont('helvetica', 'bold');
        doc.text('Descrição detalhada:', margemEsquerda, pdf.yAtual);
        doc.setFont('helvetica', 'normal');
        pdf.yAtual += 10;

        const descricaoLinhas = doc.splitTextToSize(projeto.descricao, larguraUtil);
        doc.text(descricaoLinhas, margemEsquerda, pdf.yAtual);

        pdf.yAtual += (descricaoLinhas.length * 7) + 15;

        if (projeto.imagem) {
            try {
                const img = await window.PDFCore.carregarImagemArquivo(projeto.imagem);
                pdf.yAtual = await window.PDFSections.adicionarImagemProjeto(pdf, img);
            } catch (error) {
                console.warn('Erro ao carregar imagem do projeto:', error);
            }
        }

        return pdf.yAtual;
    }

    window.PDFSections.adicionarDetalhesProjeto = adicionarDetalhesProjeto;
})();
