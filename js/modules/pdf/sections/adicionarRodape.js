(function () {
    async function adicionarRodape(pdf) {
        const rodapeY = 265;
        const { doc, margemEsquerda, larguraUtil, margemDireita } = pdf;

    doc.setFillColor(248, 249, 250);
    doc.rect(margemEsquerda - 5, rodapeY - 10, larguraUtil + 10, 40, 'F');

    doc.setDrawColor(0, 123, 255);
    doc.setLineWidth(1);
    doc.line(margemEsquerda, rodapeY - 5, margemDireita, rodapeY - 5);

        try {
            const logo = await window.PDFCore.carregarLogoEmpresa(pdf);
            if (logo) {
                const logoWidth = 18;
                const logoHeight = (logo.height * logoWidth) / logo.width;
                doc.addImage(logo, 'PNG', margemEsquerda, rodapeY - 2, logoWidth, logoHeight);
            } else {
                window.PDFCore.adicionarLogoOuFallback(pdf, margemEsquerda, rodapeY - 5, 16, 'rodape');
                doc.setFontSize(14);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 123, 255);
                doc.text('ALTTAB', margemEsquerda + 20, rodapeY + 5);
            }
        } catch (logoError) {
            console.warn('Erro no rodapé:', logoError);
            window.PDFCore.adicionarLogoOuFallback(pdf, margemEsquerda, rodapeY - 3, 16, 'rodape');
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 123, 255);
            doc.text('ALTTAB', margemEsquerda + 20, rodapeY + 5);
        }

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(108, 117, 125);
        doc.text('Impressão 3D Profissional', margemEsquerda + 45, rodapeY + 5);

        doc.setFontSize(9);
        doc.setTextColor(73, 80, 87);

        const col1X = margemEsquerda;
        doc.setFont('helvetica', 'bold');
        doc.text('Contato:', col1X, rodapeY + 15);
        doc.setFont('helvetica', 'normal');
        doc.text('alttabcorp@gmail.com', col1X, rodapeY + 20);
        doc.text('WhatsApp: (83) 99332-2427', col1X, rodapeY + 25);

        const col2X = margemEsquerda + 85;
        doc.setFont('helvetica', 'bold');
        doc.text('Informações:', col2X, rodapeY + 15);
        doc.setFont('helvetica', 'normal');
        doc.text('www.alttabcorp.com.br', col2X, rodapeY + 20);
        doc.text('Cajazeiras, PB - Brasil', col2X, rodapeY + 25);

        doc.setFontSize(8);
        doc.setTextColor(108, 117, 125);
        doc.setFont('helvetica', 'italic');

        const avisos = [
            '✓ Orçamento válido por 30 dias a partir da data de emissão',
            '✓ Garantia de qualidade em todos os nossos produtos e serviços',
            '✓ Preços sujeitos a alteração sem aviso prévio'
        ];

        avisos.forEach((aviso, index) => {
            doc.text(aviso, margemEsquerda, rodapeY + 35 + (index * 4));
        });

        const paginaAtual = doc.internal.getNumberOfPages();
        doc.setFontSize(8);
        doc.setTextColor(173, 181, 189);
        doc.text(`Página ${paginaAtual}`, margemDireita - 30, rodapeY + 45);

        doc.setTextColor(0, 0, 0);
        doc.setDrawColor(0, 0, 0);

        return rodapeY;
    }

    window.PDFSections.adicionarRodape = adicionarRodape;
})();
