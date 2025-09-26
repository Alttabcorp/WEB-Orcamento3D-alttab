(function () {
    async function carregarLogoEmpresa(pdf) {
        if (pdf.logoCarregado) {
            return pdf.logoCarregado;
        }

        try {
            const logoPath = `${window.PDFCore.getBasePath()}assets/images/logo/logo.png`;
            pdf.logoCarregado = await window.PDFCore.carregarImagem(logoPath);
            return pdf.logoCarregado;
        } catch (error) {
            console.warn('Erro ao carregar logo:', error);
            pdf.logoCarregado = null;
            return null;
        }
    }

    window.PDFCore.carregarLogoEmpresa = carregarLogoEmpresa;
})();
