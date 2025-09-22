// Função para formatar telefone
function formatarTelefone(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 7) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    e.target.value = value;
}

// Função para obter o caminho base da aplicação
function getBasePath() {
    const path = window.location.pathname;
    return path.substring(0, path.lastIndexOf('/') + 1);
}

// Função para carregar imagem
function carregarImagem(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

async function gerarOrcamento(e) {
    e.preventDefault();
    let doc;

    try {
        console.log('Iniciando geração do PDF...');
        
        // Coletar dados do formulário
        const dados = {
            cliente: {
                nome: document.getElementById('nomeCliente').value,
                email: document.getElementById('emailCliente').value,
                telefone: document.getElementById('telefoneCliente').value
            },
            projeto: {
                tipo: document.getElementById('tipoProjeto').value,
                descricao: document.getElementById('descricaoProjeto').value,
                prazo: document.getElementById('prazoEntrega').value
            },
            servicosAdicionais: Array.from(document.querySelectorAll('input[name="servicosAdicionais"]:checked'))
                .map(checkbox => checkbox.value)
        };

        console.log('Dados coletados:', dados);

        // Verificar se jsPDF está disponível
        if (!window.jsPDF) {
            throw new Error('jsPDF não está disponível');
        }

        // Criar PDF
        doc = new window.jsPDF();
                // Tentar carregar o logo
        try {
            const basePath = getBasePath();
            const logoUrl = basePath + 'assets/images/logo/logo.png';
            console.log('Tentando carregar logo de:', logoUrl);
            const logo = await carregarImagem(logoUrl);
            
            // Adicionar logo
            const logoWidth = 40;
            const logoHeight = (logo.height * logoWidth) / logo.width;
            doc.addImage(logo, 'PNG', 20, 10, logoWidth, logoHeight);
        } catch (logoError) {
            console.warn('Não foi possível carregar o logo:', logoError);
            // Continua sem o logo
        }        // Configurações iniciais
        doc.setFont("helvetica");
        doc.setFontSize(20);
        
        // Cabeçalho
        doc.text("Orçamento - Alttab", 105, 40, { align: "center" });
        doc.setFontSize(12);
        doc.text("Data: " + new Date().toLocaleDateString('pt-BR'), 20, 50);
        
        // Linha divisória
        doc.setDrawColor(0, 123, 255); // Cor azul
        doc.setLineWidth(0.5);
        doc.line(20, 55, 190, 55);
        
        // Informações do Cliente
        doc.setFontSize(16);
        doc.text("Dados do Cliente", 20, 65);
        doc.setFontSize(12);
        doc.text([
            `Nome: ${dados.cliente.nome}`,
            `Email: ${dados.cliente.email}`,
            `Telefone: ${dados.cliente.telefone}`
        ], 20, 75);
        
        // Linha divisória
        doc.setDrawColor(0, 123, 255);
        doc.line(20, 90, 190, 90);
        
        // Detalhes do Projeto
        doc.setFontSize(16);
        doc.text("Detalhes do Projeto", 20, 100);
        doc.setFontSize(12);
        doc.text([
            `Tipo de Projeto: ${dados.projeto.tipo}`,
            `Prazo de Entrega: ${dados.projeto.prazo} dias`
        ], 20, 110);

        // Descrição do Projeto
        doc.text("Descrição do Projeto:", 20, 130);
        const descricaoLinhas = doc.splitTextToSize(dados.projeto.descricao, 170);
        doc.text(descricaoLinhas, 20, 140);
        
        // Calcular posição Y para Serviços Adicionais
        let yPos = 140 + (descricaoLinhas.length * 7);
        
        // Serviços Adicionais
        doc.setFontSize(16);
        doc.text("Serviços Adicionais", 20, yPos + 10);
        doc.setFontSize(12);
        
        if (dados.servicosAdicionais.length > 0) {
            dados.servicosAdicionais.forEach((servico, index) => {
                doc.text(`• ${servico}`, 20, yPos + 25 + (index * 7));
            });
        } else {
            doc.text("Nenhum serviço adicional selecionado", 20, yPos + 25);
        }
        
        // Rodapé
        doc.setFontSize(10);
        doc.text([
            "Alttab - Soluções em 3D",
            "Contato: contato@alttab.com.br",
            "www.alttab.com.br"
        ], 105, 280, { align: "center" });
        
        // Salvar o PDF
        doc.save(`orcamento-${dados.cliente.nome.replace(/\s+/g, '_')}.pdf`);
        
        // Feedback visual
        alert('Orçamento gerado com sucesso!');
        
    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
    }
}

// Event Listeners
window.addEventListener('load', function() {
    console.log('Página carregada, inicializando...');
    
    const form = document.getElementById('orcamentoForm');
    const telefone = document.getElementById('telefoneCliente');
    
    if (form) {
        console.log('Formulário encontrado, adicionando event listener...');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Formulário submetido, tentando gerar PDF...');
            try {
                await gerarOrcamento(e);
            } catch (error) {
                console.error('Erro ao gerar orçamento:', error);
                alert('Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.');
            }
        });
    } else {
        console.error('Formulário não encontrado');
    }
    
    if (telefone) {
        telefone.addEventListener('input', formatarTelefone);
    } else {
        console.error('Campo de telefone não encontrado');
    }
});