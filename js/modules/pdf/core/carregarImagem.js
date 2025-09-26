(function () {
    function carregarImagem(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    window.PDFCore.carregarImagem = carregarImagem;
})();
