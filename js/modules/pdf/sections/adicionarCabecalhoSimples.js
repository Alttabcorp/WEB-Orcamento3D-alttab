(function () {
    async function adicionarCabecalhoSimples(pdf) {
        const { doc, margemEsquerda, larguraUtil, margemDireita } = pdf;
        pdf.yAtual = pdf.margemSuperior;

        doc.setFillColor(248, 249, 250);
        doc.rect(margemEsquerda - 5, pdf.yAtual - 5, larguraUtil + 10, 30, 'F');

        const logo = await window.PDFCore.carregarLogoEmpresa(pdf);
        if (logo) {
            const logoWidth = 25;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            doc.addImage(logo, 'PNG', margemEsquerda, pdf.yAtual, logoWidth, logoHeight);
        } else {
            window.PDFCore.adicionarLogoOuFallback(pdf, margemEsquerda, pdf.yAtual, 20, 'cabecalho');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(0, 123, 255);
        doc.text('ALTTAB', margemEsquerda + 30, pdf.yAtual + 8);

        doc.setFontSize(10);
        doc.setTextColor(108, 117, 125);
        doc.setFont('helvetica', 'normal');
        doc.text('Proposta Comercial', margemEsquerda + 30, pdf.yAtual + 16);

        const numeroPagina = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.setTextColor(73, 80, 87);
        doc.text(`Página ${numeroPagina}`, margemDireita - 25, pdf.yAtual + 12);

        pdf.yAtual += 25;
        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(1);
        doc.line(margemEsquerda, pdf.yAtual, margemDireita, pdf.yAtual);

        doc.setTextColor(0, 0, 0);
        doc.setDrawColor(0, 0, 0);
        pdf.yAtual += 10;

        return pdf.yAtual;
    }

    window.PDFSections.adicionarCabecalhoSimples = adicionarCabecalhoSimples;
})();
