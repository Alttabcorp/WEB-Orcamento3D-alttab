(function () {
    async function adicionarDadosCliente(pdf, cliente) {
        pdf.yAtual = await window.PDFCore.verificarQuebraPagina(pdf, 40);

        const { doc, margemEsquerda } = pdf;
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('Dados do Cliente', margemEsquerda, pdf.yAtual);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        pdf.yAtual += 10;

        doc.text([
            `Nome: ${cliente.nome}`,
            `Email: ${cliente.email}`,
            `Telefone: ${cliente.telefone}`
        ], margemEsquerda, pdf.yAtual);

        pdf.yAtual += 25;
        window.PDFCore.adicionarLinhaDivisoria(pdf, pdf.yAtual, 'pontilhada');
        pdf.yAtual += 10;

        return pdf.yAtual;
    }

    window.PDFSections.adicionarDadosCliente = adicionarDadosCliente;
})();
