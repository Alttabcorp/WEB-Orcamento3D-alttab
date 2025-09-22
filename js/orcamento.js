// Inicialização do jsPDF
const { jsPDF } = window.jspdf;

document.getElementById('orcamentoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    gerarOrcamento();
});

function gerarOrcamento() {
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

    // Criar PDF
    const doc = new jsPDF();
    
    // Configurações iniciais
    doc.setFont("helvetica");
    doc.setFontSize(20);
    
    // Cabeçalho
    doc.text("Orçamento - Alttab", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Data: " + new Date().toLocaleDateString('pt-BR'), 20, 30);
    
    // Informações do Cliente
    doc.setFontSize(16);
    doc.text("Dados do Cliente", 20, 45);
    doc.setFontSize(12);
    doc.text([
        `Nome: ${dados.cliente.nome}`,
        `Email: ${dados.cliente.email}`,
        `Telefone: ${dados.cliente.telefone}`
    ], 20, 55);
    
    // Detalhes do Projeto
    doc.setFontSize(16);
    doc.text("Detalhes do Projeto", 20, 85);
    doc.setFontSize(12);
    doc.text([
        `Tipo de Projeto: ${dados.projeto.tipo}`,
        `Prazo de Entrega: ${dados.projeto.prazo} dias`,
        `\nDescrição do Projeto:`,
    ], 20, 95);
    
    // Quebrar descrição em linhas
    const descricaoLinhas = doc.splitTextToSize(dados.projeto.descricao, 170);
    doc.text(descricaoLinhas, 20, 120);
    
    // Serviços Adicionais
    let yPos = 120 + (descricaoLinhas.length * 7);
    doc.setFontSize(16);
    doc.text("Serviços Adicionais", 20, yPos);
    doc.setFontSize(12);
    dados.servicosAdicionais.forEach((servico, index) => {
        doc.text(`• ${servico}`, 20, yPos + 10 + (index * 7));
    });
    
    // Rodapé
    doc.setFontSize(10);
    doc.text([
        "Alttab - Soluções em 3D",
        "Contato: contato@alttab.com.br",
        "www.alttab.com.br"
    ], 105, 280, { align: "center" });
    
    // Salvar o PDF
    doc.save(`orcamento-${dados.cliente.nome.replace(/\s+/g, '_')}.pdf`);
}

// Formatação do campo de telefone
document.getElementById('telefoneCliente').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 7) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }
    
    e.target.value = value;
});