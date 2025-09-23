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
        this.margemSuperior = 20;
        this.margemInferior = 30;
        this.alturaUtil = 267; // Altura útil da página A4 (297mm - margens)
        this.yAtual = 20; // Posição Y atual
        this.logoCarregado = null; // Cache do logo
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
     * Carrega imagem de arquivo selecionado
     * @param {File} arquivo - Arquivo de imagem
     * @returns {Promise<HTMLImageElement>} - Imagem carregada
     */
    carregarImagemArquivo(arquivo) {
        return new Promise((resolve, reject) => {
            if (!arquivo) {
                reject(new Error('Nenhum arquivo fornecido'));
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(arquivo);
        });
    }

    /**
     * Carrega o logo uma única vez e mantém em cache
     * @returns {Promise<HTMLImageElement|null>} - Logo carregado ou null
     */
    async carregarLogoEmpresa() {
        // Se já temos o logo carregado, retornar ele
        if (this.logoCarregado) {
            console.log('Logo já estava carregado (cache)');
            return this.logoCarregado;
        }

        try {
            const basePath = this.getBasePath();
            const logoUrl = basePath + 'assets/images/logo/logo.png';
            console.log('Carregando logo de:', logoUrl);
            
            const logo = await this.carregarImagem(logoUrl);
            
            // Salvar no cache para próximas utilizações
            this.logoCarregado = logo;
            console.log('Logo carregado e salvo no cache com dimensões:', logo.width, 'x', logo.height);
            
            return logo;
        } catch (error) {
            console.warn('Erro ao carregar logo:', error);
            return null;
        }
    }

    /**
     * Adiciona cabeçalho moderno e profissional do PDF
     */
    async adicionarCabecalho() {
        this.yAtual = this.margemSuperior;
        
        // Fundo sutil para o cabeçalho
        this.doc.setFillColor(248, 249, 250); // Cinza muito claro
        this.doc.rect(this.margemEsquerda - 5, this.yAtual - 5, this.larguraUtil + 10, 50, 'F');
        
                        // Tentar carregar o logo
        console.log('Adicionando logo no cabeçalho...');
        const logo = await this.carregarLogoEmpresa();
        if (logo) {
            console.log('Logo carregado com sucesso no cabeçalho');
            const logoWidth = 35;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            this.doc.addImage(logo, 'PNG', this.margemEsquerda, this.yAtual, logoWidth, logoHeight);
        } else {
            console.log('Usando fallback no cabeçalho');
            // Usar fallback visual robusto
            this.adicionarLogoOuFallback(this.margemEsquerda, this.yAtual, 30, 'cabecalho');
        }

        // Título principal
        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(24);
        this.doc.setTextColor(0, 123, 255); // Azul da marca
        this.doc.text("PROPOSTA COMERCIAL", 105, this.yAtual + 20, { align: "center" });
        
        // Subtítulo
        this.doc.setFontSize(14);
        this.doc.setTextColor(108, 117, 125); // Cinza
        this.doc.setFont("helvetica", "normal");
        this.doc.text("Impressão 3D Personalizada", 105, this.yAtual + 28, { align: "center" });
        
        // Informações do orçamento em caixas
        this.doc.setFontSize(10);
        this.doc.setTextColor(73, 80, 87); // Cinza escuro
        
        const dataAtual = UtilsModule.formatarData();
        const dataVencimento = this.calcularDataVencimento();
        
        // Caixa para data de emissão
        this.doc.setDrawColor(0, 123, 255);
        this.doc.setLineWidth(0.5);
        this.doc.rect(this.margemEsquerda, this.yAtual + 35, 70, 8);
        this.doc.text(`Emitido em: ${dataAtual}`, this.margemEsquerda + 2, this.yAtual + 40);
        
        // Caixa para validade
        this.doc.rect(this.margemDireita - 70, this.yAtual + 35, 70, 8);
        this.doc.text(`Válido até: ${dataVencimento}`, this.margemDireita - 68, this.yAtual + 40);
        
        // Linha divisória elegante
        this.yAtual += 50;
        this.doc.setDrawColor(0, 123, 255);
        this.doc.setLineWidth(1.5);
        this.doc.line(this.margemEsquerda, this.yAtual, this.margemDireita, this.yAtual);
        
        // Resetar cores
        this.doc.setTextColor(0, 0, 0);
        this.doc.setDrawColor(0, 0, 0);
        
        this.yAtual += 10;
    }

    /**
     * Adiciona cabeçalho simplificado para páginas subsequentes
     */
    async adicionarCabecalhoSimples() {
        this.yAtual = this.margemSuperior;
        
        // Fundo sutil para o cabeçalho
        this.doc.setFillColor(248, 249, 250); // Cinza muito claro
        this.doc.rect(this.margemEsquerda - 5, this.yAtual - 5, this.larguraUtil + 10, 30, 'F');
        
        // Logo da empresa
        const logo = await this.carregarLogoEmpresa();
        if (logo) {
            const logoWidth = 25; // Logo menor nas páginas subsequentes
            const logoHeight = (logo.height * logoWidth) / logo.width;
            this.doc.addImage(logo, 'PNG', this.margemEsquerda, this.yAtual, logoWidth, logoHeight);
        } else {
            this.adicionarLogoOuFallback(this.margemEsquerda, this.yAtual, 20, 'cabecalho');
        }

        // Nome da empresa
        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(14);
        this.doc.setTextColor(0, 123, 255);
        this.doc.text("ALTTAB", this.margemEsquerda + 30, this.yAtual + 8);
        
        // Subtítulo
        this.doc.setFontSize(10);
        this.doc.setTextColor(108, 117, 125);
        this.doc.setFont("helvetica", "normal");
        this.doc.text("Proposta Comercial", this.margemEsquerda + 30, this.yAtual + 16);
        
        // Número da página
        const numeroPagina = this.doc.internal.getNumberOfPages();
        this.doc.setFontSize(10);
        this.doc.setTextColor(73, 80, 87);
        this.doc.text(`Página ${numeroPagina}`, this.margemDireita - 25, this.yAtual + 12);
        
        // Linha divisória
        this.yAtual += 25;
        this.doc.setDrawColor(0, 123, 255);
        this.doc.setLineWidth(1);
        this.doc.line(this.margemEsquerda, this.yAtual, this.margemDireita, this.yAtual);
        
        // Resetar cores
        this.doc.setTextColor(0, 0, 0);
        this.doc.setDrawColor(0, 0, 0);
        
        this.yAtual += 10;
    }

    /**
     * Adiciona linha divisória elegante
     * @param {number} y - Posição Y da linha
     * @param {string} estilo - Estilo da linha ('padrao', 'grossa', 'pontilhada')
     */
    adicionarLinhaDivisoria(y, estilo = 'padrao') {
        this.doc.setDrawColor(0, 123, 255);
        
        switch (estilo) {
            case 'grossa':
                this.doc.setLineWidth(1.5);
                break;
            case 'pontilhada':
                this.doc.setLineWidth(0.5);
                this.doc.setLineDashPattern([2, 2], 0);
                break;
            default:
                this.doc.setLineWidth(0.8);
        }
        
        this.doc.line(this.margemEsquerda, y, this.margemDireita, y);
        
        // Resetar estilo
        this.doc.setLineDashPattern([], 0);
        this.doc.setDrawColor(0, 0, 0);
    }

    /**
     * Adiciona seção de dados do cliente
     * @param {Object} cliente - Dados do cliente
     * @returns {number} - Posição Y após a seção
     */
    async adicionarDadosCliente(cliente) {
        // Verificar se precisa de nova página
        this.yAtual = await this.verificarQuebraPagina(40);
        
        this.doc.setFontSize(16);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Dados do Cliente", this.margemEsquerda, this.yAtual);
        this.doc.setFont("helvetica", "normal");
        this.doc.setFontSize(12);
        
        this.yAtual += 10;
        
        this.doc.text([
            `Nome: ${cliente.nome}`,
            `Email: ${cliente.email}`,
            `Telefone: ${cliente.telefone}`
        ], this.margemEsquerda, this.yAtual);
        
        this.yAtual += 25;
        this.adicionarLinhaDivisoria(this.yAtual, 'pontilhada');
        this.yAtual += 10;
        
        return this.yAtual;
    }

    /**
     * Adiciona seção de detalhes do projeto
     * @param {Object} projeto - Dados do projeto
     * @param {number} yPos - Posição Y inicial (ignorado, usa yAtual)
     * @returns {number} - Posição Y após a seção
     */
    async adicionarDetalhesProjeto(projeto, yPos) {
        // Verificar se precisa de nova página
        this.yAtual = await this.verificarQuebraPagina(60);
        
        this.doc.setFontSize(16);
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Especificações do Projeto", this.margemEsquerda, this.yAtual);
        this.doc.setFont("helvetica", "normal");
        this.doc.setFontSize(12);
        
        this.yAtual += 15;
        
        this.doc.text([
            `Categoria: ${projeto.tipo}`,
            `Prazo de entrega: ${projeto.prazo} dias úteis`
        ], this.margemEsquerda, this.yAtual);

        this.yAtual += 25;

        // Descrição do Projeto
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Descrição detalhada:", this.margemEsquerda, this.yAtual);
        this.doc.setFont("helvetica", "normal");
        this.yAtual += 10;
        
        const descricaoLinhas = this.doc.splitTextToSize(projeto.descricao, this.larguraUtil);
        this.doc.text(descricaoLinhas, this.margemEsquerda, this.yAtual);
        
        this.yAtual += (descricaoLinhas.length * 7) + 15;

        // Adicionar imagem do projeto se disponível
        if (projeto.imagem) {
            try {
                const img = await this.carregarImagemArquivo(projeto.imagem);
                this.yAtual = this.adicionarImagemProjeto(img, this.yAtual);
            } catch (error) {
                console.warn('Erro ao carregar imagem do projeto:', error);
            }
        }
        
        return this.yAtual;
    }

    /**
     * Adiciona imagem do projeto ao PDF
     * @param {HTMLImageElement} img - Imagem carregada
     * @param {number} yPos - Posição Y inicial (ignorado, usa yAtual)
     * @returns {number} - Posição Y após a imagem
     */
    async adicionarImagemProjeto(img, yPos) {
        // Calcular dimensões da imagem mantendo proporção
        const maxWidth = 120; // Largura máxima em mm
        const maxHeight = 80; // Altura máxima em mm
        
        let imgWidth = maxWidth;
        let imgHeight = (img.height * maxWidth) / img.width;
        
        // Se a altura calculada for maior que o máximo, ajustar pela altura
        if (imgHeight > maxHeight) {
            imgHeight = maxHeight;
            imgWidth = (img.width * maxHeight) / img.height;
        }
        
        // Verificar se a imagem cabe na página atual
        const espacoNecessario = imgHeight + 30; // Espaço para imagem + margem
        this.yAtual = await this.verificarQuebraPagina(espacoNecessario);
        
        this.doc.setFont("helvetica", "bold");
        this.doc.setFontSize(12);
        this.doc.text("Imagem de referência:", this.margemEsquerda, this.yAtual);
        
        this.yAtual += 10;
        
        // Centralizar a imagem horizontalmente
        const xPos = this.margemEsquerda + (this.larguraUtil - imgWidth) / 2;
        
        try {
            // Adicionar a imagem ao PDF
            this.doc.addImage(img, 'JPEG', xPos, this.yAtual, imgWidth, imgHeight);
            
            // Adicionar borda sutil ao redor da imagem
            this.doc.setDrawColor(200, 200, 200);
            this.doc.setLineWidth(0.2);
            this.doc.rect(xPos, this.yAtual, imgWidth, imgHeight);
            
        } catch (error) {
            console.warn('Erro ao adicionar imagem ao PDF:', error);
            // Em caso de erro, adicionar texto indicativo
            this.doc.setFont("helvetica", "italic");
            this.doc.setFontSize(10);
            this.doc.text("(Imagem não pôde ser carregada)", this.margemEsquerda, this.yAtual + 20);
            this.yAtual += 30;
            return this.yAtual;
        }
        
        this.yAtual += imgHeight + 15; // Espaço após a imagem
        return this.yAtual;
    }

    /**
     * Adiciona seção de impressão 3D (simplificada para cliente)
     * @param {Object} impressao3D - Dados da impressão 3D
     * @param {number} yPos - Posição Y inicial (ignorado, usa yAtual)
     * @returns {number} - Posição Y após a seção
     */
    async adicionarImpressao3D(impressao3D, yPos) {
        if (!impressao3D.tempo || !impressao3D.peso) {
            return this.yAtual;
        }

        // Verificar se precisa de nova página
        this.yAtual = await this.verificarQuebraPagina(50);

        this.doc.setFontSize(16);
        this.doc.text("Detalhes da Impressão", this.margemEsquerda, this.yAtual);
        this.doc.setFontSize(12);
        
        this.yAtual += 15;
        
        // Apenas informações relevantes para o cliente
        this.doc.text([
            `Tempo estimado de produção: ${impressao3D.tempo} horas`,
            `Especificações: Peça de ${impressao3D.peso}g em material PLA`
        ], this.margemEsquerda, this.yAtual);
        
        this.yAtual += 25;
        
        // Se há cálculo de custo disponível, mostrar apenas o resumo
        if (impressao3D.custoCalculado) {
            this.yAtual = await this.adicionarResumoFinanceiro(impressao3D.custoCalculado, this.yAtual);
        }

        return this.yAtual;
    }

    /**
     * Adiciona resumo financeiro simplificado para o cliente
     * @param {Object} custo - Objeto com os custos calculados
     * @param {number} yPos - Posição Y inicial (ignorado, usa yAtual)
     * @returns {number} - Posição Y após a seção
     */
    async adicionarResumoFinanceiro(custo, yPos) {
        // Verificar se precisa de nova página
        this.yAtual = await this.verificarQuebraPagina(70);
        
        this.doc.setFontSize(16);
        this.doc.text("Resumo Financeiro", this.margemEsquerda, this.yAtual);
        
        this.yAtual += 10;
        
        // Linha divisória
        this.adicionarLinhaDivisoria(this.yAtual, 'grossa');
        
        this.yAtual += 10;
        this.doc.setFontSize(12);
        
        // Apenas os custos principais que interessam ao cliente
        const resumoItens = [
            `Material e Produção: ${custo.custo_filamento}`,
            `Serviços Técnicos: ${custo.custo_fixo_por_unidade}`,
            `Acabamento/Embalagem: ${custo.custo_acessorios}`
        ];
        
        this.doc.text(resumoItens, this.margemEsquerda, this.yAtual);
        this.yAtual += (resumoItens.length * 7) + 10;
        
        // Linha divisória antes do total
        this.adicionarLinhaDivisoria(this.yAtual);
        
        this.yAtual += 10;
        
        // Destacar valor final
        this.doc.setFontSize(18);
        this.doc.setFont("helvetica", "bold");
        this.doc.text(`VALOR TOTAL: ${custo.custo_total}`, this.margemEsquerda, this.yAtual);
        this.doc.setFont("helvetica", "normal");
        
        this.yAtual += 15;
        
        // Valor para o consumidor (se diferente)
        if (custo.preco_consumidor && custo.preco_consumidor !== custo.custo_total) {
            this.doc.setFontSize(14);
            this.doc.text(`Valor promocional: ${custo.preco_consumidor}`, this.margemEsquerda, this.yAtual);
            this.yAtual += 15;
        }
        
        return this.yAtual;
    }

    /**
     * Adiciona seção de serviços inclusos/adicionais
     * @param {Array} servicosAdicionais - Lista de serviços
     * @param {number} yPos - Posição Y inicial (ignorado, usa yAtual)
     * @returns {number} - Posição Y após a seção
     */
    async adicionarServicosAdicionais(servicosAdicionais, yPos) {
        // Verificar se precisa de nova página
        this.yAtual = await this.verificarQuebraPagina(60);
        
        this.doc.setFontSize(16);
        this.doc.text("Serviços Inclusos", this.margemEsquerda, this.yAtual);
        this.doc.setFontSize(12);
        
        this.yAtual += 15;
        
        // Serviços padrão sempre inclusos
        const servicosInclusos = [
            "✓ Modelagem 3D personalizada",
            "✓ Impressão em material PLA de alta qualidade", 
            "✓ Acabamento e limpeza da peça",
            "✓ Embalagem segura para transporte"
        ];
        
        servicosInclusos.forEach((servico, index) => {
            this.doc.text(servico, this.margemEsquerda, this.yAtual + (index * 7));
        });
        
        this.yAtual += (servicosInclusos.length * 7) + 15;
        
        // Serviços adicionais selecionados (se houver)
        if (servicosAdicionais.length > 0) {
            // Verificar se precisa de nova página para os serviços extras
            this.yAtual = await this.verificarQuebraPagina(30);
            
            this.doc.setFontSize(14);
            this.doc.text("Serviços Extras Solicitados:", this.margemEsquerda, this.yAtual);
            this.doc.setFontSize(12);
            
            this.yAtual += 10;
            
            servicosAdicionais.forEach((servico, index) => {
                this.doc.text(`+ ${servico}`, this.margemEsquerda, this.yAtual + (index * 7));
            });
            this.yAtual += (servicosAdicionais.length * 7) + 15;
        }
        
        return this.yAtual;
    }

    /**
     * Adiciona rodapé profissional e moderno do PDF
     */
    async adicionarRodape() {
        // Posição fixa no final da página atual
        const rodapeY = 265; 
        
        // Fundo sutil para o rodapé
        this.doc.setFillColor(248, 249, 250); // Cinza muito claro
        this.doc.rect(this.margemEsquerda - 5, rodapeY - 10, this.larguraUtil + 10, 40, 'F');
        
        // Linha divisória superior elegante
        this.doc.setDrawColor(0, 123, 255);
        this.doc.setLineWidth(1);
        this.doc.line(this.margemEsquerda, rodapeY - 5, this.margemDireita, rodapeY - 5);
        
        // Tentar carregar logo real no rodapé
        console.log('Adicionando logo no rodapé...');
        try {
            const logo = await this.carregarLogoEmpresa();
            
            if (logo) {
                console.log('Logo carregado com sucesso no rodapé');
                const logoWidth = 18;
                const logoHeight = (logo.height * logoWidth) / logo.width;
                this.doc.addImage(logo, 'PNG', this.margemEsquerda, rodapeY - 2, logoWidth, logoHeight);
                
            } else {
                console.log('Usando fallback no rodapé');
                // Usar fallback visual se não conseguir carregar
                this.adicionarLogoOuFallback(this.margemEsquerda, rodapeY - 3, 16, 'rodape');
                
                // Nome da empresa alinhado com fallback
                this.doc.setFontSize(14);
                this.doc.setFont("helvetica", "bold");
                this.doc.setTextColor(0, 123, 255);
                this.doc.text("ALTTAB", this.margemEsquerda + 20, rodapeY + 5);
            }
            
        } catch (logoError) {
            console.warn('Erro no rodapé:', logoError);
            // Usar fallback visual se não conseguir carregar
            this.adicionarLogoOuFallback(this.margemEsquerda, rodapeY - 3, 16, 'rodape');
            
            // Nome da empresa alinhado com fallback
            this.doc.setFontSize(14);
            this.doc.setFont("helvetica", "bold");
            this.doc.setTextColor(0, 123, 255);
            this.doc.text("ALTTAB", this.margemEsquerda + 20, rodapeY + 5);
        }
        
        this.doc.setFontSize(10);
        this.doc.setFont("helvetica", "normal");
        this.doc.setTextColor(108, 117, 125); // Cinza
        this.doc.text("Impressão 3D Profissional", this.margemEsquerda + 45, rodapeY + 5);
        
        // Informações de contato em colunas
        this.doc.setFontSize(9);
        this.doc.setTextColor(73, 80, 87); // Cinza escuro
        
        // Coluna 1 - Contato
        const col1X = this.margemEsquerda;
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Contato:", col1X, rodapeY + 15);
        this.doc.setFont("helvetica", "normal");
        this.doc.text("alttab@gmail.com", col1X, rodapeY + 20);
        this.doc.text("WhatsApp: (83) 99332-2427", col1X, rodapeY + 25);
        
        // Coluna 2 - Localização e Web
        const col2X = this.margemEsquerda + 85;
        this.doc.setFont("helvetica", "bold");
        this.doc.text("Informações:", col2X, rodapeY + 15);
        this.doc.setFont("helvetica", "normal");
        this.doc.text("www.alttabcorp.com.br", col2X, rodapeY + 20);
        this.doc.text("Cajazeiras, PB - Brasil", col2X, rodapeY + 25);

        // Linha de validade e garantia
        this.doc.setFontSize(8);
        this.doc.setTextColor(108, 117, 125);
        this.doc.setFont("helvetica", "italic");
        
        const avisos = [
            "✓ Orçamento válido por 30 dias a partir da data de emissão",
            "✓ Garantia de qualidade em todos os nossos produtos e serviços",
            "✓ Preços sujeitos a alteração sem aviso prévio"
        ];
        
        avisos.forEach((aviso, index) => {
            this.doc.text(aviso, this.margemEsquerda, rodapeY + 35 + (index * 4));
        });
        
        // Número da página (sempre mostrar)
        const paginaAtual = this.doc.internal.getNumberOfPages();
        this.doc.setFontSize(8);
        this.doc.setTextColor(173, 181, 189);
        this.doc.text(`Página ${paginaAtual}`, this.margemDireita - 30, rodapeY + 45);
        
        // Resetar cores para o padrão
        this.doc.setTextColor(0, 0, 0);
        this.doc.setDrawColor(0, 0, 0);
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
                prazo: document.getElementById('prazoEntrega').value,
                imagem: null // Para armazenar a imagem do projeto
            },
            servicosAdicionais: Array.from(document.querySelectorAll('input[name="servicosAdicionais"]:checked'))
                .map(checkbox => checkbox.value),
            impressao3D: {
                tempo: document.getElementById('tempo-impressao').value,
                peso: document.getElementById('peso-peca').value,
                custoCalculado: null
            }
        };

        // Capturar imagem do projeto se houver
        const inputImagem = document.getElementById('imagemProjeto');
        if (inputImagem && inputImagem.files && inputImagem.files[0]) {
            dados.projeto.imagem = inputImagem.files[0];
        }

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

        // Validação da imagem (se fornecida)
        if (dados.projeto.imagem) {
            const arquivo = dados.projeto.imagem;
            
            // Verificar tamanho (máximo 5MB)
            if (arquivo.size > 5 * 1024 * 1024) {
                erros.push('A imagem deve ter no máximo 5MB');
            }
            
            // Verificar tipo de arquivo
            if (!arquivo.type.startsWith('image/')) {
                erros.push('Apenas arquivos de imagem são aceitos');
            }
        }

        return erros;
    }

    /**
     * Calcula a data de vencimento do orçamento (30 dias)
     */
    calcularDataVencimento() {
        const hoje = new Date();
        const vencimento = new Date(hoje.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 dias
        return vencimento.toLocaleDateString('pt-BR');
    }

    /**
     * Verifica se precisa de nova página e adiciona se necessário
     * @param {number} espacoNecessario - Espaço em mm necessário
     * @returns {number} - Nova posição Y
     */
    async verificarQuebraPagina(espacoNecessario = 30) {
        const espacoRestante = this.alturaUtil - this.yAtual;
        
        if (espacoRestante < espacoNecessario) {
            // Adicionar rodapé na página atual antes de criar nova página
            await this.adicionarRodape();
            
            // Criar nova página
            this.doc.addPage();
            
            // Adicionar cabeçalho na nova página
            await this.adicionarCabecalhoSimples();
            
            return this.yAtual;
        }
        
        return this.yAtual;
    }

    /**
     * Atualiza a posição Y atual
     * @param {number} novaY - Nova posição Y
     */
    atualizarPosicaoY(novaY) {
        this.yAtual = novaY;
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
            this.yAtual = this.margemSuperior; // Resetar posição Y
            
            // Adicionar seções
            await this.adicionarCabecalho();
            
            await this.adicionarDadosCliente(dados.cliente);
            await this.adicionarDetalhesProjeto(dados.projeto, this.yAtual);
            await this.adicionarImpressao3D(dados.impressao3D, this.yAtual);
            await this.adicionarServicosAdicionais(dados.servicosAdicionais, this.yAtual);
            
            // Adicionar rodapé final
            await this.adicionarRodape();
            
            // Atualizar numeração das páginas
            this.atualizarNumeracaoPaginas();
            
            // Salvar o PDF
            const nomeArquivo = `orcamento-${UtilsModule.sanitizarNomeArquivo(dados.cliente.nome)}.pdf`;
            this.doc.save(nomeArquivo);
            
            // Feedback visual customizado
            let mensagem = 'Orçamento gerado com sucesso!';
            if (dados.projeto.imagem) {
                mensagem = 'Orçamento com imagem gerado com sucesso!';
            }
            UtilsModule.mostrarNotificacao(mensagem, 'success');
            
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            UtilsModule.mostrarNotificacao(
                'Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.',
                'error'
            );
        }
    }

    /**
     * Atualiza numeração das páginas após finalizar o documento
     */
    atualizarNumeracaoPaginas() {
        const totalPaginas = this.doc.internal.getNumberOfPages();
        
        // Percorrer todas as páginas para atualizar a numeração
        for (let i = 1; i <= totalPaginas; i++) {
            this.doc.setPage(i);
            
            // Limpar área onde está o número da página (sobrescrever)
            this.doc.setFillColor(248, 249, 250);
            this.doc.rect(this.margemDireita - 35, 305, 30, 10, 'F');
            
            // Adicionar numeração atualizada
            this.doc.setFontSize(8);
            this.doc.setTextColor(173, 181, 189);
            this.doc.text(`Página ${i} de ${totalPaginas}`, this.margemDireita - 30, 310);
        }
    }

    /**
     * Adiciona logo da empresa ou fallback visual
     * @param {number} x - Posição X
     * @param {number} y - Posição Y
     * @param {number} size - Tamanho do logo
     * @param {string} tipo - 'cabecalho' ou 'rodape'
     */
    adicionarLogoOuFallback(x, y, size, tipo = 'cabecalho') {
        // Criar um círculo azul como fallback
        this.doc.setFillColor(0, 123, 255);
        const raio = size / 2;
        this.doc.circle(x + raio, y + raio, raio, 'F');
        
        // Adicionar letra "A" no centro
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(tipo === 'cabecalho' ? 12 : 8);
        this.doc.setFont("helvetica", "bold");
        
        // Centralizar o texto no círculo
        const textX = x + raio - 2;
        const textY = y + raio + 3;
        this.doc.text("A", textX, textY);
        
        // Resetar cor do texto
        this.doc.setTextColor(0, 0, 0);
    }
}

// Exportar para uso global
window.PDFGenerator = PDFGenerator;
