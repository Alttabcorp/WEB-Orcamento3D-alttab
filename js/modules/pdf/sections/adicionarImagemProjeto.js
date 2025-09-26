(function () {
    async function adicionarImagemProjeto(pdf, img) {
        const maxWidth = 120;
        const maxHeight = 80;

        let imgWidth = maxWidth;
        let imgHeight = (img.height * maxWidth) / img.width;

        if (imgHeight > maxHeight) {
            imgHeight = maxHeight;
            imgWidth = (img.width * maxHeight) / img.height;
        }

        const espacoNecessario = imgHeight + 30;
        pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, espacoNecessario);

        const { doc, margemEsquerda, larguraUtil } = pdf;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('Imagem de referência:', margemEsquerda, pdf.yAtual);

        pdf.yAtual += 10;

        const xPos = margemEsquerda + (larguraUtil - imgWidth) / 2;

        try {
            doc.addImage(img, 'JPEG', xPos, pdf.yAtual, imgWidth, imgHeight);
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.2);
            doc.rect(xPos, pdf.yAtual, imgWidth, imgHeight);
        } catch (error) {
            console.warn('Erro ao adicionar imagem ao PDF:', error);
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(10);
            doc.text('(Imagem não pôde ser carregada)', margemEsquerda, pdf.yAtual + 20);
            pdf.yAtual += 30;
            return pdf.yAtual;
        }

        pdf.yAtual += imgHeight + 15;
        return pdf.yAtual;
    }

    window.PDFSections.adicionarImagemProjeto = adicionarImagemProjeto;
})();
