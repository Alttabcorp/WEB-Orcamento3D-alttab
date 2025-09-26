(function () {
    const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validarEmail(email) {
        return REGEX_EMAIL.test(email);
    }

    window.UtilsModuleCore.validarEmail = validarEmail;
})();
