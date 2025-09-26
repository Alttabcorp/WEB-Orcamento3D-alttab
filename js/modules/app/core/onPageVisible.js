(function () {
    function onPageVisible(instance) {
        if (instance?.calculadora) {
            console.log('Página visível - verificando configurações...');
        }
    }

    window.AppModule.onPageVisible = onPageVisible;
})();
