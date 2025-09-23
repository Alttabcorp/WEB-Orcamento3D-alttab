/**
 * Módulo de Geração de PDF
 * Responsável por gerar orçamentos em PDF
 */

class PDFGenerator {
    constructor() {
        this.doc = null;
        this.margemEsquerda = 20;
        this.margemDireita = 190;
        this.larguraUtil = 170;
    }

    /**
     * Obtém o caminho base da aplicação
     */
    getBasePath() {
        const path = window.location.pathname;
        return path.substring(0, path.lastIndexOf('/') + 1);
    }

    /**
     * Carrega imagem de forma assíncrona
     * @param {string} src - URL da imagem
     */
    carregarImagem(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Adiciona cabeçalho do PDF
     */
    async adicionarCabecalho() {
        // Tentar carregar o logo
        try {
            const basePath = this.getBasePath();
            const logoUrl = basePath + 'assets/images/logo/logo.png';
            console.log('Tentando carregar logo de:', logoUrl);
            const logo = await this.carregarImagem(logoUrl);
            
            const logoWidth = 40;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            this.doc.addImage(logo, 'PNG', this.margemEsquerda, 10, logoWidth, logoHeight);
        } catch (logoError) {
            console.warn('Não foi possível carregar o logo:', logoError);
        }

        // Configurações iniciais
        this.doc.setFont("helvetica");
        this.doc.setFontSize(20);
        
        // Título
        this.doc.text("Orçamento - Alttab", 105, 40, { align: "center" });
        this.doc.setFontSize(12);
        this.doc.text("Data: " + UtilsModule.formatarData(), this.margemEsquerda, 50);
        
        // Linha divisória
        this.adicionarLinhaDivisoria(55);
    }

    /**
     * Adiciona linha divisória
     * @param {number} y - Posição Y da linha
     */
    adicionarLinhaDivisoria(y) {
        this.doc.setDrawColor(0, 123, 255);
        this.doc.setLineWidth(0.5);
        this.doc.line(this.margemEsquerda, y, this.margemDireita, y);
    }

    /**
     * Adiciona seção de dados do cliente
     * @param {Object} cliente - Dados do cliente
     * @returns {number} - Posição Y após a seção
     */
    adicionarDadosCliente(cliente) {
        this.doc.setFontSize(16);
        this.doc.text("Dados do Cliente", this.margemEsquerda, 65);
        this.doc.setFontSize(12);
        
        this.doc.text([
            `Nome: ${cliente.nome}`,
            `Email: ${cliente.email}`,
            `Telefone: ${cliente.telefone}`
        ], this.margemEsquerda, 75);
        
        this.adicionarLinhaDivisoria(90);
        return 95;
    }

    /**
     * Adiciona seção de detalhes do projeto
     * @param {Object} projeto - Dados do projeto
     * @param {number} yPos - Posição Y inicial
     * @returns {number} - Posição Y após a seção
     */
    adicionarDetalhesProjeto(projeto, yPos) {
        this.doc.setFontSize(16);
        this.doc.text("Detalhes do Projeto", this.margemEsquerda, yPos);
        this.doc.setFontSize(12);
        
        this.doc.text([
            `Tipo de Projeto: ${projeto.tipo}`,
            `Prazo de Entrega: ${projeto.prazo} dias`
        ], this.margemEsquerda, yPos + 10);

        // Descrição do Projeto
        this.doc.text("Descrição do Projeto:", this.margemEsquerda, yPos + 30);
        const descricaoLinhas = this.doc.splitTextToSize(projeto.descricao, this.larguraUtil);
        this.doc.text(descricaoLinhas, this.margemEsquerda, yPos + 40);
        
        return yPos + 40 + (descricaoLinhas.length * 7);
    }

    /**
     * Adiciona seção de impressão 3D
     * @param {Object} impressao3D - Dados da impressão 3D
     * @param {number} yPos - Posição Y inicial
     * @returns {number} - Posição Y após a seção
     */
    adicionarImpressao3D(impressao3D, yPos) {
        if (!impressao3D.tempo || !impressao3D.peso) {
            return yPos;
        }

        this.doc.setFontSize(16);
        this.doc.text("Impressão 3D", this.margemEsquerda, yPos + 10);
        this.doc.setFontSize(12);
        
        this.doc.text([
            `Tempo de Impressão: ${impressao3D.tempo} horas`,
            `Peso da Peça: ${impressao3D.peso} gramas`
        ], this.margemEsquerda, yPos + 25);
        
        yPos += 35;
        
        // Se há cálculo de custo disponível
        if (impressao3D.custoCalculado) {
            yPos = this.adicionarDetalhamentoCusto(impressao3D.custoCalculado, yPos);
        }

        return yPos;
    }

    /**
     * Adiciona detalhamento de custos
     * @param {Object} custo - Objeto com os custos calculados
     * @param {number} yPos - Posição Y inicial
     * @returns {number} - Posição Y após a seção
     */
    adicionarDetalhamentoCusto(custo, yPos) {
        this.doc.setFontSize(14);
        this.doc.text("Detalhamento de Custos", this.margemEsquerda, yPos + 10);
        this.doc.setFontSize(10);
        
        const custoDetalhes = [
            `Custo do Filamento: ${custo.custo_filamento}`,
            `Custo Energético: ${custo.custo_energetico}`,
            `Acessórios/Embalagem: ${custo.custo_acessorios}`,
            `Custo Fixo por Unidade: ${custo.custo_fixo_por_unidade}`,
            `Amortização: ${custo.amortizacao}`,
            `Custo de Falha: ${custo.custo_falha}`,
            `Imposto: ${custo.custo_imposto}`,
            `Taxa do Cartão: ${custo.custo_taxa_cartao}`,
            `Custo de Anúncio: ${custo.custo_anuncio}`
        ];
        
        this.doc.text(custoDetalhes, this.margemEsquerda, yPos + 25);
        yPos += 25 + (custoDetalhes.length * 5);
        
        // Destacar custo total
        this.doc.setFontSize(14);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`CUSTO TOTAL: ${custo.custo_total}`, this.margemEsquerda, yPos + 10);
        this.doc.setFont("helvetica", "normal");
        
        // Preços sugeridos
        this.doc.setFontSize(12);
        this.doc.text("Preços Sugeridos:", this.margemEsquerda, yPos + 25);
        this.doc.setFontSize(10);
        this.doc.text([
            `Preço Consumidor Final: ${custo.preco_consumidor_final}`,
            `Preço Lojista: ${custo.preco_lojista}`
        ], this.margemEsquerda, yPos + 35);
        
        return yPos + 50;
    }

    /**
     * Adiciona seção de serviços adicionais
     * @param {Array} servicosAdicionais - Lista de serviços
     * @param {number} yPos - Posição Y inicial
     * @returns {number} - Posição Y após a seção
     */
    adicionarServicosAdicionais(servicosAdicionais, yPos) {
        this.doc.setFontSize(16);
        this.doc.text("Serviços Adicionais", this.margemEsquerda, yPos + 10);
        this.doc.setFontSize(12);
        
        if (servicosAdicionais.length > 0) {
            servicosAdicionais.forEach((servico, index) => {
                this.doc.text(`• ${servico}`, this.margemEsquerda, yPos + 25 + (index * 7));
            });
            return yPos + 25 + (servicosAdicionais.length * 7);
        } else {
            this.doc.text("Nenhum serviço adicional selecionado", this.margemEsquerda, yPos + 25);
            return yPos + 35;
        }
    }

    /**
     * Adiciona rodapé do PDF
     */
    adicionarRodape() {
        this.doc.setFontSize(10);
        this.doc.text([
            "Alttab - Soluções em 3D",
            "Contato: contato@alttab.com.br",
            "www.alttab.com.br"
        ], 105, 280, { align: "center" });
    }

    /**
     * Coleta dados do formulário
     * @returns {Object} - Dados coletados
     */
    coletarDadosFormulario() {
        const dados = {
            cliente: {
                nome: document.getElementById('nomeCliente').value,
                email: document.getElementById('emailCliente').value,
                telefone: document.getElementById('telefoneCliente').value
            },
            projeto: {
                tipo: 'Impressão 3D', // Tipo padrão, já que não existe campo específico
                descricao: document.getElementById('descricaoProjeto').value,
                prazo: document.getElementById('prazoEntrega').value
            },
            servicosAdicionais: Array.from(document.querySelectorAll('input[name="servicosAdicionais"]:checked'))
                .map(checkbox => checkbox.value),
            impressao3D: {
                tempo: document.getElementById('tempo-impressao').value,
                peso: document.getElementById('peso-peca').value,
                custoCalculado: null
            }
        };

        // Calcular custo de impressão 3D se os dados estiverem preenchidos
        if (dados.impressao3D.tempo && dados.impressao3D.peso && window.calculadora3D) {
            try {
                dados.impressao3D.custoCalculado = window.calculadora3D.calcularCusto(
                    parseFloat(dados.impressao3D.tempo),
                    parseFloat(dados.impressao3D.peso)
                );
            } catch (error) {
                console.warn('Erro ao calcular custo para PDF:', error);
            }
        }

        return dados;
    }

    /**
     * Valida dados antes de gerar PDF
     * @param {Object} dados - Dados a serem validados
     * @returns {Array} - Lista de erros
     */
    validarDados(dados) {
        const erros = [];

        // Validações obrigatórias
        if (!dados.cliente.nome) erros.push('Nome do cliente é obrigatório');
        if (!dados.cliente.email) erros.push('Email do cliente é obrigatório');
        if (!dados.cliente.telefone) erros.push('Telefone do cliente é obrigatório');
        if (!dados.projeto.descricao) erros.push('Descrição do projeto é obrigatória');
        if (!dados.projeto.prazo) erros.push('Prazo de entrega é obrigatório');

        // Validação de email
        if (dados.cliente.email && !UtilsModule.validarEmail(dados.cliente.email)) {
            erros.push('Formato de email inválido');
        }

        return erros;
    }

    /**
     * Gera o orçamento em PDF
     * @param {Event} e - Evento do formulário
     */
    async gerarOrcamento(e) {
        e.preventDefault();

        try {
            console.log('Iniciando geração do PDF...');
            
            // Coletar e validar dados
            const dados = this.coletarDadosFormulario();
            const erros = this.validarDados(dados);

            if (erros.length > 0) {
                UtilsModule.mostrarNotificacao(
                    'Corrija os seguintes erros:\n' + erros.join('\n'),
                    'error'
                );
                return;
            }

            console.log('Dados coletados:', dados);

            // Verificar se jsPDF está disponível
            if (!window.jsPDF) {
                throw new Error('jsPDF não está disponível');
            }

            // Criar PDF
            this.doc = new window.jsPDF();
            
            // Adicionar seções
            await this.adicionarCabecalho();
            
            let yPos = this.adicionarDadosCliente(dados.cliente);
            yPos = this.adicionarDetalhesProjeto(dados.projeto, yPos);
            yPos = this.adicionarImpressao3D(dados.impressao3D, yPos);
            yPos = this.adicionarServicosAdicionais(dados.servicosAdicionais, yPos);
            
            this.adicionarRodape();
            
            // Salvar o PDF
            const nomeArquivo = `orcamento-${UtilsModule.sanitizarNomeArquivo(dados.cliente.nome)}.pdf`;
            this.doc.save(nomeArquivo);
            
            // Feedback visual
            UtilsModule.mostrarNotificacao('Orçamento gerado com sucesso!', 'success');
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            UtilsModule.mostrarNotificacao(
                'Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.',
                'error'
            );
        }
    }
}

// Exportar para uso global
window.PDFGenerator = PDFGenerator;
