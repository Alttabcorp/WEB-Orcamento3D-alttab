(function () {
    async function adicionarCabecalho(pdf) {
        const { doc, margemEsquerda, larguraUtil, margemDireita } = pdf;
        pdf.yAtual = pdf.margemSuperior;

        doc.setFillColor(248, 249, 250);
        doc.rect(margemEsquerda - 5, pdf.yAtual - 5, larguraUtil + 10, 50, 'F');

        const logo = await window.PDFCore.carregarLogoEmpresa(pdf);
        if (logo) {
            const logoWidth = 35;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            doc.addImage(logo, 'PNG', margemEsquerda, pdf.yAtual, logoWidth, logoHeight);
        } else {
            window.PDFCore.adicionarLogoOuFallback(pdf, margemEsquerda, pdf.yAtual, 30, 'cabecalho');
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.setTextColor(0, 123, 255);
        doc.text('PROPOSTA COMERCIAL', 105, pdf.yAtual + 20, { align: 'center' });

        doc.setFontSize(14);
        doc.setTextColor(108, 117, 125);
        doc.setFont('helvetica', 'normal');
        doc.text('Impressão 3D Personalizada', 105, pdf.yAtual + 28, { align: 'center' });

        doc.setFontSize(10);
        doc.setTextColor(73, 80, 87);

        const dataAtual = UtilsModule.formatarData();
        const dataVencimento = window.PDFCore.calcularDataVencimento();

        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(0.5);
        doc.rect(margemEsquerda, pdf.yAtual + 35, 70, 8);
        doc.text(`Emitido em: ${dataAtual}`, margemEsquerda + 2, pdf.yAtual + 40);

        doc.rect(margemDireita - 70, pdf.yAtual + 35, 70, 8);
        doc.text(`Válido até: ${dataVencimento}`, margemDireita - 68, pdf.yAtual + 40);

        pdf.yAtual += 50;
        doc.setDrawColor(0, 123, 255);
        doc.setLineWidth(1.5);
        doc.line(margemEsquerda, pdf.yAtual, margemDireita, pdf.yAtual);

        doc.setTextColor(0, 0, 0);
        doc.setDrawColor(0, 0, 0);
        pdf.yAtual += 10;

        return pdf.yAtual;
    }

    window.PDFSections.adicionarCabecalho = adicionarCabecalho;
})();
