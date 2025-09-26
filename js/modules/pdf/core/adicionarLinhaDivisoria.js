(function () {
    function adicionarLinhaDivisoria(pdf, y, estilo = 'padrao') {
        const { doc, margemEsquerda, margemDireita } = pdf;
        doc.setDrawColor(0, 123, 255);

        switch (estilo) {
            case 'grossa':
                doc.setLineWidth(1.5);
                break;
            case 'pontilhada':
                doc.setLineWidth(0.5);
                doc.setLineDashPattern([2, 2], 0);
                break;
            default:
                doc.setLineWidth(0.8);
        }

        doc.line(margemEsquerda, y, margemDireita, y);

        // Resetar estilo
        doc.setLineDashPattern([], 0);
        doc.setDrawColor(0, 0, 0);
    }

    window.PDFCore.adicionarLinhaDivisoria = adicionarLinhaDivisoria;
})();
