(function () {
    function inicializar(instance) {
        console.log('Calculadora de Orçamento 3D inicializada');
        console.log('Configurações atuais:', instance.configuracoes);
    }

    window.CalculatorModule.inicializar = inicializar;
})();
