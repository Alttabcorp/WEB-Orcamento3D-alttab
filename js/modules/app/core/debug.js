(function () {
    function debug(instance) {
        return {
            app: instance,
            calculadora: instance?.calculadora,
            interface: instance?.calculadoraInterface,
            interfaceManager: instance?.interfaceManager,
            config: instance?.configManager,
            pdf: instance?.pdfGenerator,
            stats: window.AppModule.obterEstatisticas(instance)
        };
    }

    window.AppModule.debug = debug;
})();
