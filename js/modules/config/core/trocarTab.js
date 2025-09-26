(function () {
    function trocarTab(instance, tabId) {
        const buttons = document.querySelectorAll('.tab-button');
        const contents = document.querySelectorAll('.tab-content');

        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        const selectedButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(`${tabId}-tab`);

        if (selectedButton) {
            selectedButton.classList.add('active');
        }

        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        if (tabId === 'importar') {
            window.ConfigModule.atualizarPreview(instance);
        }
    }

    window.ConfigModule.trocarTab = trocarTab;
})();
