(function () {
    function exportarConfiguracoes(instance) {
        const conteudo = instance.calculadora.exportarConfiguracoes();
        const blob = new Blob([conteudo], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `alttab_config_${new Date().toISOString().split('T')[0]}.txt`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    window.ConfigModule.exportarConfiguracoes = exportarConfiguracoes;
})();
