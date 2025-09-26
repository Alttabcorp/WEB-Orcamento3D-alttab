(function () {
    function ocultarLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (!spinner) {
            return;
        }

        setTimeout(() => {
            spinner.style.opacity = '0';
            setTimeout(() => {
                spinner.style.display = 'none';
            }, 300);
        }, 500);
    }

    window.InterfaceModule.ocultarLoadingSpinner = ocultarLoadingSpinner;
})();
