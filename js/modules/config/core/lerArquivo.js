(function () {
    function lerArquivo(instance, event) {
        const file = event?.target?.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            instance.conteudoArquivo = e.target?.result;
        };
        reader.readAsText(file);
    }

    window.ConfigModule.lerArquivo = lerArquivo;
})();
