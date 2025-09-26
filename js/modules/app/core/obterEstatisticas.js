(function () {
    function obterEstatisticas(instance) {
        return {
            inicializada: instance?.inicializada ?? false,
            configuracoes: instance?.calculadora?.obterConfiguracoes?.(),
            versao: '1.0.0',
            ultimoCalcullo: localStorage.getItem('ultimo_calculo_timestamp')
        };
    }

    window.AppModule.obterEstatisticas = obterEstatisticas;
})();
