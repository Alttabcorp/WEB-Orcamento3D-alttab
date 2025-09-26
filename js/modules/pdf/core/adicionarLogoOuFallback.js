(function () {
    function adicionarLogoOuFallback(pdf, x, y, size, tipo = 'cabecalho') {
        const { doc } = pdf;
        doc.setFillColor(0, 123, 255);
        const raio = size / 2;
        doc.circle(x + raio, y + raio, raio, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(tipo === 'cabecalho' ? 12 : 8);
        doc.setFont('helvetica', 'bold');

        const textX = x + raio - 2;
        const textY = y + raio + 3;
        doc.text('A', textX, textY);

        doc.setTextColor(0, 0, 0);
    }

    window.PDFCore.adicionarLogoOuFallback = adicionarLogoOuFallback;
})();
