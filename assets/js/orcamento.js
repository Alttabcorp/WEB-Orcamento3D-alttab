/**
 * Arquivo legado - mantido para compatibilidade
 * A aplicação agora é gerenciada pelo AppManager
 */

console.warn('⚠️  O arquivo orcamento.js é legado. Use o AppManager para funcionalidades completas.');

// Redirecionar para o novo sistema se disponível
if (window.appManager && !window.appManager.inicializada) {
    console.log('📦 Inicializando via AppManager...');
} else {
    console.log('✅ AppManager já inicializado');
}

// Fallback básico se o novo sistema não estiver disponível
window.addEventListener('load', function() {
    // Verificar se o novo sistema está funcionando
    setTimeout(() => {
        if (!window.appManager?.inicializada) {
            console.error('❌ Sistema principal não carregou. Implementando fallback...');
            
            // Implementar funcionalidades básicas como fallback
            const form = document.getElementById('orcamentoForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Sistema em modo básico. Recarregue a página para funcionalidade completa.');
                });
            }
        }
    }, 2000);
});