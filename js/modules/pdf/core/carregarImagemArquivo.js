(function () {
    function carregarImagemArquivo(arquivo) {
        return new Promise((resolve, reject) => {
            if (!arquivo) {
                reject(new Error('Nenhum arquivo fornecido'));
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = reader.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(arquivo);
        });
    }

    window.PDFCore.carregarImagemArquivo = carregarImagemArquivo;
})();
