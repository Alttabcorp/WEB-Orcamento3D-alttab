(function () {
    function formatarTelefone(event) {
        const target = event?.target;
        if (!target) {
            return;
        }

        let value = target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 7) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        }

        target.value = value;
    }

    window.UtilsModuleCore.formatarTelefone = formatarTelefone;
})();
