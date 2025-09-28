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

- **Calculadora avançada**: custos automáticos a partir do tempo e peso informados
- **Composição detalhada**: agrupamento em Material & Produção, Serviços Técnicos (com markup) e Acabamento/Embalagem
- **Precificação inteligente**: preço consumidor psicológico, margem B2B ajustável e faixas escalonadas (10, 50 e 100+ unidades)
- **Exportação versátil**: cópia rápida do resumo, exibição do PDF em nova aba e download opcional via navegador
- **Interface modular**: experiência responsiva com estados salvos no navegador e validações em tempo real opcionais
- **Personalização total**: painel de configurações para markup, custos fixos, energia, acessório, impostos, taxas e anúncio
- **Relatórios profissionais**: PDF com branding ALTTAB, imagens opcionais e detalhamento completo do orçamento

## 🗂️ Estrutura do Projeto

```
WEB-Orcamento3D-alttab/
├── assets/
│   ├── css/
│   │   ├── components/      # Estilos específicos de componentes
│   │   └── style.css        # Tema principal
│   ├── icons/               # Favicons e ícones PWA
│   └── images/              # Logos e imagens utilitárias
├── js/
│   ├── app.js               # Bootstrap global (legado)
│   ├── modules/
│   │   ├── app/             # Inicialização geral da aplicação
│   │   ├── calculator/      # Núcleo de cálculo e configuração padrão
│   │   ├── calculadoraInterface/ # Camada de UI da calculadora
│   │   ├── config/          # Painel de ajustes e persistência
│   │   ├── interfaceManager/# UX geral, atalhos e validações
│   │   ├── pdf/             # Geração, seções e helpers de PDF
│   │   └── utils/           # Funções utilitárias compartilhadas
│   └── utils/               # Adaptadores públicos (ex.: formatting.js)
├── TECHNICAL_DOCS.md        # Documentação técnica complementar
├── manifest.json            # Metadados PWA
├── sw.js                    # Service worker opcional
├── index.html               # Interface principal
├── LICENSE
└── README.md
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
   - O relatório é aberto em uma nova aba (permita pop-ups do domínio)
   - Salve ou envie o PDF diretamente pelo visualizador do navegador

5. **Compartilhamento rápido**:
   - Use o botão "📋 Copiar Resultado" para gerar um resumo textual
   - Cole em conversas, e-mail ou CRM conforme necessário

## ⚙️ Configuração

### Personalização de Custos

- Clique no botão **⚙️ Configurações** na interface para abrir o painel completo.
- Ajuste preços de filamento, energia, acessórios, custos fixos, margem (markup), impostos, taxa de cartão, custo de anúncio e margem mínima do lojista.
- As alterações são salvas automaticamente no navegador (localStorage) e podem ser exportadas/importadas via JSON.

Se preferir definir novos valores padrão versionados, edite o arquivo `js/modules/calculator/core/getDefaultConfig.js`:

```javascript
return {
   preco_filamento_por_kg: 156.00,
   potencia_w: 175,
   valor_kw_h: 0.84,
   quantidade_acessorios: 1,
   custo_unidade_acessorio: 0.48,
   custo_fixo_mensal: 300.00,
   valor_maquina: 2000.00,
   vida_util_horas: 24000,
   percentual_falha: 0.10,
   markup: 3,
   percentual_imposto: 0.085,
   taxa_cartao: 0.045,
   custo_anuncio_percentual: 0.15,
   margem_minima_lojista: 1.35
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
- **Margens de Lucro**: Markup com ajuste psicológico (.90) e margem mínima B2B configurável
- **Escalonamento de Preços**: Faixas automáticas para 10, 50 e 100+ unidades com descontos progressivos

### Geração de PDF

- Utiliza a biblioteca **jsPDF**
- Layout profissional com branding ALTTAB
- Inclui todos os detalhes do orçamento
- Suporte a imagens do projeto
- Pré-visualização em nova aba (sem download automático)

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
