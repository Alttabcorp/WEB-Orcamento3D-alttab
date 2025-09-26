(function () {
    function removerModalComHandler(modal, handler) {
        modal.remove();
        document.removeEventListener('keydown', handler);
    }

    function mostrarAjuda() {
        const ajudaHTML = `
        <div class="ajuda-modal">
            <div class="ajuda-content">
                <button type="button" class="btn-close-modal">&times;</button>
                <h3>🆘 Guia de Uso - Sistema Alttab 3D</h3>
                <div class="ajuda-secoes">
                    <div class="ajuda-secao">
                        <h4>1. 🖨️ Calculadora de Impressão 3D</h4>
                        <p>• <strong>Tempo de Impressão:</strong> Insira o tempo em horas (ex: 4.5 para 4h30min)</p>
                        <p>• <strong>Peso da Peça:</strong> Peso do filamento necessário em gramas</p>
                        <p>• <strong>Cálculo Automático:</strong> Os valores são calculados automaticamente conforme você digita</p>
                        <p>• <strong>Detalhes:</strong> Clique em "Ver Detalhes" para visualizar o breakdown completo dos custos</p>
                    </div>
                    <div class="ajuda-secao">
                        <h4>2. 👤 Dados do Cliente</h4>
                        <p>• <strong>Campos Opcionais:</strong> Todos os campos podem ser preenchidos posteriormente</p>
                        <p>• <strong>Formatação Automática:</strong> O telefone é formatado automaticamente</p>
                        <p>• <strong>Validação:</strong> Email é validado automaticamente</p>
                    </div>
                    <div class="ajuda-secao">
                        <h4>3. 📋 Detalhes do Projeto</h4>
                        <p>• <strong>Descrição:</strong> Descreva o projeto detalhadamente</p>
                        <p>• <strong>Imagem:</strong> Adicione uma imagem do projeto (opcional)</p>
                        <p>• <strong>Prazo:</strong> Defina o prazo de entrega em dias úteis</p>
                    </div>
                    <div class="ajuda-secao">
                        <h4>4. ⚙️ Configurações Avançadas</h4>
                        <p>• <strong>Custos:</strong> Configure preços de filamento, energia, impostos, etc.</p>
                        <p>• <strong>Máquina:</strong> Ajuste potência, valor e vida útil da impressora</p>
                        <p>• <strong>Import/Export:</strong> Salve e carregue configurações</p>
                    </div>
                </div>
                <div class="ajuda-atalhos">
                    <h4>⌨️ Atalhos de Teclado</h4>
                    <div class="atalhos-grid">
                        <div class="atalho-item">
                            <kbd>F1</kbd>
                            <span>Abrir esta ajuda</span>
                        </div>
                        <div class="atalho-item">
                            <kbd>Ctrl + Enter</kbd>
                            <span>Gerar PDF do orçamento</span>
                        </div>
                        <div class="atalho-item">
                            <kbd>Ctrl + S</kbd>
                            <span>Abrir configurações</span>
                        </div>
                        <div class="atalho-item">
                            <kbd>Esc</kbd>
                            <span>Fechar modal de ajuda</span>
                        </div>
                    </div>
                </div>
                <div class="ajuda-dicas">
                    <h4>💡 Dicas Importantes</h4>
                    <ul>
                        <li>O sistema salva automaticamente suas configurações no navegador</li>
                        <li>Você pode trabalhar offline após o primeiro carregamento</li>
                        <li>O cálculo inclui automaticamente impostos, taxas de cartão e custos de anúncio</li>
                        <li>Use a função "Copiar Resultado" para compartilhar cálculos rapidamente</li>
                    </ul>
                </div>
                <div class="ajuda-actions">
                    <button type="button" class="btn btn-primary btn-fechar-ajuda">✅ Entendi</button>
                    <button type="button" class="btn btn-secondary btn-config-ajuda">⚙️ Ir para Configurações</button>
                </div>
            </div>
        </div>
        `;

        document.querySelectorAll('.ajuda-modal').forEach(modal => modal.remove());

        document.body.insertAdjacentHTML('beforeend', ajudaHTML);

        const modal = document.querySelector('.ajuda-modal');
        if (!modal) {
            return;
        }

        const escHandler = (e) => {
            if (e.key === 'Escape') {
                removerModalComHandler(modal, escHandler);
            }
        };

        document.addEventListener('keydown', escHandler);

        const btnX = modal.querySelector('.btn-close-modal');
        btnX?.addEventListener('click', () => removerModalComHandler(modal, escHandler));

        const btnFechar = modal.querySelector('.btn-fechar-ajuda');
        btnFechar?.addEventListener('click', () => removerModalComHandler(modal, escHandler));

        const btnConfig = modal.querySelector('.btn-config-ajuda');
        btnConfig?.addEventListener('click', () => {
            removerModalComHandler(modal, escHandler);
            document.getElementById('btn-configuracoes')?.click();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                removerModalComHandler(modal, escHandler);
            }
        });
    }

    window.InterfaceModule.mostrarAjuda = mostrarAjuda;
})();
