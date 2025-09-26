(function () {
    function previewPDF() {
        if (window.UtilsModule?.mostrarNotificacao) {
            window.UtilsModule.mostrarNotificacao('Preview em desenvolvimento...', 'info');
        } else {
            console.info('Preview em desenvolvimento...');
        }
    }

    window.InterfaceModule.previewPDF = previewPDF;
})();
