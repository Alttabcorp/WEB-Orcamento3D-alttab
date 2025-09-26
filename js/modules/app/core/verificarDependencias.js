(function () {
    function verificarDependencias() {
        const dependencias = [
            { nome: 'jsPDF', objeto: window.jsPDF },
            { nome: 'CalculadoraOrcamento3D', objeto: window.CalculadoraOrcamento3D },
            { nome: 'ConfiguracaoManager', objeto: window.ConfiguracaoManager },
            { nome: 'PDFGenerator', objeto: window.PDFGenerator },
            { nome: 'CalculadoraInterface', objeto: window.CalculadoraInterface },
            { nome: 'InterfaceManager', objeto: window.InterfaceManager },
            { nome: 'UtilsModule', objeto: window.UtilsModule }
        ];

        const faltando = dependencias.filter((dep) => !dep.objeto);
        if (faltando.length > 0) {
            throw new Error(`Dependências não encontradas: ${faltando.map((d) => d.nome).join(', ')}`);
        }
    }

    window.AppModule.verificarDependencias = verificarDependencias;
})();
