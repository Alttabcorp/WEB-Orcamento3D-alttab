(function () {
    class PDFGenerator {
        constructor() {
            this.doc = null;
            this.margemEsquerda = 20;
            this.margemDireita = 190;
            this.larguraUtil = 170;
            this.margemSuperior = 20;
            this.margemInferior = 30;
            this.alturaUtil = 267;
            this.yAtual = 20;
            this.logoCarregado = null;
        }

        getBasePath() {
            return window.PDFCore.getBasePath();
        }

        carregarImagem(src) {
            return window.PDFCore.carregarImagem(src);
        }

        carregarImagemArquivo(arquivo) {
            return window.PDFCore.carregarImagemArquivo(arquivo);
        }

        async carregarLogoEmpresa() {
            return window.PDFCore.carregarLogoEmpresa(this);
        }

        async adicionarCabecalho() {
            return window.PDFSections.adicionarCabecalho(this);
        }

        async adicionarCabecalhoSimples() {
            return window.PDFSections.adicionarCabecalhoSimples(this);
        }

        adicionarLinhaDivisoria(y, estilo = 'padrao') {
            return window.PDFCore.adicionarLinhaDivisoria(this, y, estilo);
        }

        async adicionarDadosCliente(cliente) {
            return window.PDFSections.adicionarDadosCliente(this, cliente);
        }

        async adicionarDetalhesProjeto(projeto) {
            return window.PDFSections.adicionarDetalhesProjeto(this, projeto);
        }

        async adicionarImagemProjeto(img) {
            return window.PDFSections.adicionarImagemProjeto(this, img);
        }

        async adicionarImpressao3D(impressao3D) {
            return window.PDFSections.adicionarImpressao3D(this, impressao3D);
        }

        /*
        Resumo financeiro
        async adicionarResumoFinanceiro(custo) {
            return window.PDFSections.adicionarResumoFinanceiro(this, custo);
        }*/

        async adicionarServicosAdicionais(servicosAdicionais) {
            return window.PDFSections.adicionarServicosAdicionais(this, servicosAdicionais);
        }

        async adicionarRodape() {
            return window.PDFSections.adicionarRodape(this);
        }

        coletarDadosFormulario() {
            return window.PDFCore.coletarDadosFormulario(this);
        }

        validarDados(dados) {
            return window.PDFCore.validarDados(dados);
        }

        calcularDataVencimento() {
            return window.PDFCore.calcularDataVencimento();
        }

        async verificarQuebraPagina(espacoNecessario = 30) {
            return window.PDFCore.verificarQuebraPagina(this, espacoNecessario);
        }

        atualizarPosicaoY(novaY) {
            return window.PDFCore.atualizarPosicaoY(this, novaY);
        }

        async gerarOrcamento(e) {
            return window.PDFCore.gerarOrcamento(this, e);
        }

        atualizarNumeracaoPaginas() {
            return window.PDFCore.atualizarNumeracaoPaginas(this);
        }

        adicionarLogoOuFallback(x, y, size, tipo = 'cabecalho') {
            return window.PDFCore.adicionarLogoOuFallback(this, x, y, size, tipo);
        }
    }

    window.PDFGenerator = PDFGenerator;
})();
