# 🖨️ Sistema de Orçamentos 3D - ALTTAB Corp

<div align="center">

![AlttabCorp Logo](https://avatars.githubusercontent.com/u/89790306?s=96&v=4)

[![License](https://img.shields.io/github/license/Alttabcorp/WEB-Orcamento3D-alttab)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-Ready-orange)](index.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](js/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)](assets/css/)

**Sistema Oficial ALTTAB Corp para Cálculo de Orçamentos de Impressão 3D**

*Transformando Ideias em Soluções Tecnológicas - Impressão 3D Profissional*

</div>

## 🎯 Sobre o Projeto

O **Sistema de Orçamentos 3D** é uma aplicação web desenvolvida pela ALTTAB Corp para automatizar e padronizar o processo de cálculo de custos para impressão 3D. O sistema oferece uma interface intuitiva que permite calcular custos precisos baseados em tempo de impressão, peso do filamento e diversos fatores operacionais.

### 🌟 Características Principais

- **Calculadora Avançada**: Cálculo automático baseado em tempo e peso
- **Múltiplos Custos**: Filamento, energia, acessórios, custos fixos, amortização
- **Preços Sugeridos**: Valores para consumidor final e lojista
- **Geração de PDF**: Relatórios profissionais em PDF
- **Interface Moderna**: Design responsivo com identidade ALTTAB
- **Dados do Cliente**: Gerenciamento de informações de contato
- **Validação Inteligente**: Verificação automática de dados
- **Performance Otimizada**: Carregamento rápido e eficiente

## 🗂️ Estrutura do Projeto

```
WEB-Orcamento3D-alttab/
├── assets/                 # Recursos estáticos
│   ├── css/
│   │   └── style.css      # Estilos principais
│   ├── icons/             # Ícones e favicons
│   └── images/            # Imagens e logos
├── js/                    # Scripts JavaScript
│   ├── modules/           # Módulos principais
│   │   ├── calculator.js  # Lógica de cálculo
│   │   ├── config.js      # Configurações
│   │   └── *.js          # Outros módulos
│   └── utils/            # Utilitários
├── Documents/            # Documentação do projeto
├── index.html           # Interface principal
├── LICENSE             # Licença do projeto
└── README.md          # Este arquivo
```

## 🚀 Como Usar

### Pré-requisitos

- **Navegador Web Moderno**: Chrome, Firefox, Safari, Edge (versões recentes)
- **JavaScript Habilitado**: Necessário para funcionalidade completa
- **Conexão com Internet**: Para fontes externas e ícones

### Instalação e Execução

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/Alttabcorp/WEB-Orcamento3D-alttab.git
   cd WEB-Orcamento3D-alttab
   ```

2. **Abra o Sistema**:
   - Abra o arquivo `index.html` em seu navegador
   - Ou use um servidor local (recomendado):
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

3. **Acesse a Aplicação**:
   - Diretamente: `file:///caminho/para/index.html`
   - Servidor local: `http://localhost:8000`

### Uso do Sistema

1. **Calculadora de Impressão 3D**:
   - Insira o tempo de impressão (em horas)
   - Informe o peso da peça (em gramas)
   - Clique em "Calcular Custo"

2. **Dados do Cliente** (opcional):
   - Nome completo
   - E-mail
   - Telefone

3. **Detalhes do Projeto**:
   - Descrição detalhada
   - Prazo de entrega
   - Imagem do projeto (opcional)

4. **Geração do Orçamento**:
   - Clique em "Gerar Orçamento PDF"
   - O sistema criará um relatório completo

## ⚙️ Configuração

### Personalização de Custos

Os custos podem ser ajustados no arquivo `js/modules/config.js`:

```javascript
const CONFIG = {
    custos: {
        filamento: 0.08,        // R$ por grama
        energia: 0.65,          // R$ por kWh
        acessorios: 2.50,       // R$ fixo
        // ... outros custos
    },
    precos: {
        margemConsumidor: 3.0,  // Multiplicador
        margemLojista: 2.0      // Multiplicador
    }
};
```

### Personalização Visual

- **Cores**: Edite variáveis CSS em `assets/css/style.css`
- **Logo**: Substitua arquivos em `assets/images/logo/`
- **Ícones**: Atualize arquivos em `assets/icons/`

## 🔧 Funcionalidades Técnicas

### Cálculos Implementados

- **Custo do Filamento**: Baseado no peso e preço por grama
- **Custo Energético**: Calculado por tempo de impressão
- **Custos Fixos**: Amortização de equipamentos e instalações
- **Impostos e Taxas**: Percentuais sobre o valor total
- **Margens de Lucro**: Diferenciadas por tipo de cliente

### Geração de PDF

- Utiliza a biblioteca **jsPDF**
- Layout profissional com branding ALTTAB
- Inclui todos os detalhes do orçamento
- Suporte a imagens do projeto

### Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: 768px e 480px para diferentes telas
- **Flexbox/Grid**: Layout moderno e adaptável

## 📱 Compatibilidade

### Navegadores Suportados

| Navegador | Versão Mínima | Status |
|-----------|---------------|--------|
| Chrome    | 80+           | ✅ Totalmente Suportado |
| Firefox   | 75+           | ✅ Totalmente Suportado |
| Safari    | 13+           | ✅ Totalmente Suportado |
| Edge      | 80+           | ✅ Totalmente Suportado |

### Dispositivos

- **Desktop**: Windows, macOS, Linux
- **Tablet**: iPad, Android tablets
- **Mobile**: iOS, Android

## 🛠️ Desenvolvimento

### Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **PDF**: jsPDF 2.5.1
- **Ícones**: Font Awesome 6.4.0
- **Fontes**: Montserrat (Google Fonts)

### Estrutura de Arquivos JavaScript

```
js/
├── app.js                    # Arquivo principal
├── modules/
│   ├── calculator.js         # Lógica de cálculos
│   ├── config.js            # Configurações do sistema
│   ├── pdfGenerator.js      # Geração de relatórios
│   ├── calculadoraInterface.js # Interface da calculadora
│   └── interfaceManager.js   # Gerenciamento geral
└── utils/
    └── formatting.js        # Funções de formatação
```

### Padrões de Código

- **ES6+ Features**: Arrow functions, const/let, template literals
- **Modularização**: Separação por responsabilidades
- **Nomenclatura**: CamelCase para JavaScript, kebab-case para CSS
- **Comentários**: Documentação inline para funções complexas

## 📋 Roadmap

### Versão Atual (v1.0)
- ✅ Calculadora básica de custos
- ✅ Geração de PDF
- ✅ Interface responsiva
- ✅ Branding ALTTAB

### Próximas Versões
- 🔄 **v1.1**: Histórico de orçamentos
- 🔄 **v1.2**: Múltiplos materiais de impressão
- 🔄 **v1.3**: Integração com API de preços
- 🔄 **v1.4**: Dashboard administrativo
- 🔄 **v2.0**: Sistema multi-usuário

## 🤝 Contribuição

1. **Fork** do repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### Guidelines de Contribuição

- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use commits descritivos e em português

## 🐛 Relatório de Bugs

Encontrou um problema? Abra uma **issue** incluindo:

- **Descrição detalhada** do problema
- **Passos para reproduzir**
- **Comportamento esperado** vs **comportamento atual**
- **Screenshots** (se aplicável)
- **Informações do ambiente** (navegador, SO, etc.)

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato e Suporte

### ALTTAB Corp - Equipe de Desenvolvimento

- **Email**: alttabcorp@gmail.com
- **Telefone**: (83) 9 9332-2427
- **Localização**: Cajazeiras, PB
- **Website**: [alttabcorp.com.br](https://www.alttabcorp.com.br)

### Redes Sociais

- **LinkedIn**: [@alttab-corp](https://www.linkedin.com/company/alttab-corp)
- **Instagram**: [@alttabcorp](https://www.instagram.com/alttabcorp)
- **Facebook**: [@alttabcorp](https://www.facebook.com/alttabcorp)
- **Twitter**: [@AlttabeSports](https://x.com/AlttabeSports)

### Links Úteis

- **Documentação Técnica**: [TECHNICAL_DOCS.md](TECHNICAL_DOCS.md)
- **Repositório GitHub**: [WEB-Orcamento3D-alttab](https://github.com/Alttabcorp/WEB-Orcamento3D-alttab)
- **Issues**: [GitHub Issues](https://github.com/Alttabcorp/WEB-Orcamento3D-alttab/issues)

---

<div align="center">

**Desenvolvendo soluções tecnológicas inovadoras para transformar ideias em resultados concretos**

**Made with ❤️ by ALTTAB Corp**

[⭐ Star no GitHub](https://github.com/Alttabcorp/WEB-Orcamento3D-alttab) • [🐛 Reportar Bug](https://github.com/Alttabcorp/WEB-Orcamento3D-alttab/issues) • [💡 Sugerir Feature](https://github.com/Alttabcorp/WEB-Orcamento3D-alttab/issues)

</div>
