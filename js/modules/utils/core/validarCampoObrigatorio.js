(function () {
    function validarCampoObrigatorio(valor, nomeCampo) {
        if (!valor || valor.trim() === '') {
            return `O campo ${nomeCampo} é obrigatório.`;
        }
        return null;
    }

    window.UtilsModuleCore.validarCampoObrigatorio = validarCampoObrigatorio;
})();
