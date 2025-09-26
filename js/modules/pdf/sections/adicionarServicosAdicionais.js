(function () {
    async function adicionarServicosAdicionais(pdf, servicosAdicionais) {
        pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, 60);

        const { doc, margemEsquerda } = pdf;
        doc.setFontSize(16);
        doc.text('Serviços Inclusos', margemEsquerda, pdf.yAtual);
        doc.setFontSize(12);

        pdf.yAtual += 15;

        const servicosInclusos = [
            '✓ Modelagem 3D personalizada',
            '✓ Impressão em material PLA de alta qualidade',
            '✓ Acabamento e limpeza da peça',
            '✓ Embalagem segura para transporte'
        ];

        servicosInclusos.forEach((servico, index) => {
            doc.text(servico, margemEsquerda, pdf.yAtual + (index * 7));
        });

        pdf.yAtual += (servicosInclusos.length * 7) + 15;

        if (servicosAdicionais.length > 0) {
            pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, 30);

            doc.setFontSize(14);
            doc.text('Serviços Extras Solicitados:', margemEsquerda, pdf.yAtual);
            doc.setFontSize(12);

            pdf.yAtual += 10;

            servicosAdicionais.forEach((servico, index) => {
                doc.text(`+ ${servico}`, margemEsquerda, pdf.yAtual + (index * 7));
            });
            pdf.yAtual += (servicosAdicionais.length * 7) + 15;
        }

        return pdf.yAtual;
    }

    window.PDFSections.adicionarServicosAdicionais = adicionarServicosAdicionais;
})();
