(function () {
    async function reiniciar(instance) {
        if (!instance) {
            return;
        }

        console.log('Reiniciando aplicação...');
        instance.inicializada = false;

        return window.AppModule.inicializar(instance);
    }

    window.AppModule.reiniciar = reiniciar;
})();
