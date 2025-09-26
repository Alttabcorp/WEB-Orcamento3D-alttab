(function () {
    function atualizarNumeracaoPaginas(pdf) {
        const totalPaginas = pdf.doc.internal.getNumberOfPages();

        for (let i = 1; i <= totalPaginas; i++) {
            pdf.doc.setPage(i);
            pdf.doc.setFillColor(248, 249, 250);
            pdf.doc.rect(pdf.margemDireita - 35, 305, 30, 10, 'F');
            pdf.doc.setFontSize(8);
            pdf.doc.setTextColor(173, 181, 189);
            pdf.doc.text(`Página ${i} de ${totalPaginas}`, pdf.margemDireita - 30, 310);
        }
    }

    window.PDFCore.atualizarNumeracaoPaginas = atualizarNumeracaoPaginas;
})();
