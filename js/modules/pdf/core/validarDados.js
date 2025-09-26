(function () {
    function validarDados(dados) {
        const erros = [];

        if (!dados.cliente.nome) erros.push('Nome do cliente é obrigatório');
        if (!dados.cliente.email) erros.push('Email do cliente é obrigatório');
        if (!dados.cliente.telefone) erros.push('Telefone do cliente é obrigatório');
        if (!dados.projeto.descricao) erros.push('Descrição do projeto é obrigatória');
        if (!dados.projeto.prazo) erros.push('Prazo de entrega é obrigatório');

        if (dados.cliente.email && !UtilsModule.validarEmail(dados.cliente.email)) {
            erros.push('Formato de email inválido');
        }

        if (dados.projeto.imagem) {
            const arquivo = dados.projeto.imagem;
            if (arquivo.size > 5 * 1024 * 1024) {
                erros.push('A imagem deve ter no máximo 5MB');
            }
            if (!arquivo.type.startsWith('image/')) {
                erros.push('Apenas arquivos de imagem são aceitos');
            }
        }

        return erros;
    }

    window.PDFCore.validarDados = validarDados;
})();
