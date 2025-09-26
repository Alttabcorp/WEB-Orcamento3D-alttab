(function () {
    async function verificarQuebraPagina(pdf, espacoNecessario = 30) {
        const espacoRestante = pdf.alturaUtil - pdf.yAtual;

        if (espacoRestante < espacoNecessario) {
            if (window.PDFSections.adicionarRodape) {
                await window.PDFSections.adicionarRodape(pdf);
            }

            pdf.doc.addPage();

            if (window.PDFSections.adicionarCabecalhoSimples) {
                await window.PDFSections.adicionarCabecalhoSimples(pdf);
            }

            return pdf.yAtual;
        }

        return pdf.yAtual;
    }

    window.PDFCore.verificarQuebraPagina = verificarQuebraPagina;
})();
