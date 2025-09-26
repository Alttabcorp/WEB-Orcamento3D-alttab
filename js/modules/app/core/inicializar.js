(function () {
    async function inicializar(instance) {
        if (!instance) {
            return;
        }

        if (instance.inicializada) {
            console.warn('Aplicação já foi inicializada');
            return;
        }

        try {
            console.log('Iniciando aplicação Alttab 3D...');

            window.AppModule.verificarDependencias();

            instance.calculadora = new window.CalculadoraOrcamento3D();
            instance.calculadoraInterface = new window.CalculadoraInterface(instance.calculadora);
            instance.configManager = new window.ConfiguracaoManager(instance.calculadora);
            instance.pdfGenerator = new window.PDFGenerator();
            instance.interfaceManager = new window.InterfaceManager();

            window.AppModule.configurarEventListeners(instance);
            window.AppModule.configurarFormatacaoTelefone(instance);
            window.AppModule.adicionarFuncionalidadesExtras(instance);

            instance.inicializada = true;
            console.log('Aplicação inicializada com sucesso!');

            if (window.UtilsModule?.mostrarNotificacao) {
                window.UtilsModule.mostrarNotificacao('Sistema carregado com sucesso!', 'success');
            }
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            if (window.UtilsModule?.mostrarNotificacao) {
                window.UtilsModule.mostrarNotificacao(
                    'Erro ao carregar o sistema. Recarregue a página.',
                    'error'
                );
            }
        }
    }

    window.AppModule.inicializar = inicializar;
})();
