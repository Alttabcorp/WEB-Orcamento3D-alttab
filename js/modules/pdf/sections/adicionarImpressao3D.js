(function () {
    async function adicionarImpressao3D(pdf, impressao3D) {
        if (!impressao3D.tempo || !impressao3D.peso) {
            return pdf.yAtual;
        }

        pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, 50);

        const { doc, margemEsquerda } = pdf;
        doc.setFontSize(16);
        doc.text('Detalhes da Impressão', margemEsquerda, pdf.yAtual);
        doc.setFontSize(12);

        pdf.yAtual += 15;

        doc.text([
            `Tempo estimado de produção: ${impressao3D.tempo} horas`,
            `Especificações: Peça de ${impressao3D.peso}g em material PLA`
        ], margemEsquerda, pdf.yAtual);

        pdf.yAtual += 25;

        if (impressao3D.custoCalculado) {
            pdf.yAtual = await window.PDFSections.adicionarResumoFinanceiro(pdf, impressao3D.custoCalculado);
        }

        return pdf.yAtual;
    }

    window.PDFSections.adicionarImpressao3D = adicionarImpressao3D;
})();
