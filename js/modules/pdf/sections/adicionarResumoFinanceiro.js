(function () {
    async function adicionarResumoFinanceiro(pdf, custo) {
        if (!custo) {
            return pdf.yAtual;
        }

        pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, 90);

        const { doc, margemEsquerda, margemDireita, larguraUtil } = pdf;
        doc.setFontSize(16);
        doc.text('Resumo Financeiro', margemEsquerda, pdf.yAtual);

        pdf.yAtual += 10;

        window.PDFCore.adicionarLinhaDivisoria(pdf, pdf.yAtual, 'grossa');

        pdf.yAtual += 10;
        doc.setFontSize(12);

        const resumoItens = [
            `Material e Produção: ${custo.custo_filamento}`,
            `Serviços Técnicos: ${custo.custo_fixo_por_unidade}`,
            `Acabamento/Embalagem: ${custo.custo_acessorios}`
        ];

        doc.text(resumoItens, margemEsquerda, pdf.yAtual);
        pdf.yAtual += (resumoItens.length * 7) + 10;

        window.PDFCore.adicionarLinhaDivisoria(pdf, pdf.yAtual);
        pdf.yAtual += 10;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(73, 80, 87);
        doc.text(`Custo de Produção: ${custo.custo_total}`, margemEsquerda, pdf.yAtual);

        pdf.yAtual += 18;

        if (custo.preco_consumidor_final) {
            doc.setFillColor(231, 243, 255);
            doc.rect(margemEsquerda - 2, pdf.yAtual - 12, larguraUtil + 4, 22, 'F');
            doc.setFontSize(18);
            doc.setTextColor(0, 123, 255);
            doc.text('Preço Cliente Final:', margemEsquerda, pdf.yAtual);
            doc.text(custo.preco_consumidor_final, margemDireita, pdf.yAtual, { align: 'right' });
            pdf.yAtual += 22;
        }

        if (custo.preco_lojista) {
            doc.setFillColor(239, 235, 252);
            doc.rect(margemEsquerda - 2, pdf.yAtual - 12, larguraUtil + 4, 22, 'F');
            doc.setFontSize(16);
            doc.setTextColor(111, 66, 193);
            doc.text('Preço Lojista (mín. 50 unidades):', margemEsquerda, pdf.yAtual);
            doc.text(custo.preco_lojista, margemDireita, pdf.yAtual, { align: 'right' });
            pdf.yAtual += 20;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);

        return pdf.yAtual;
    }

    window.PDFSections.adicionarResumoFinanceiro = adicionarResumoFinanceiro;
})();
