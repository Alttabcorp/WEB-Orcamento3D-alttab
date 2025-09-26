(function () {
    function getBasePath() {
        const path = window.location.pathname;
        return path.substring(0, path.lastIndexOf('/') + 1);
    }

    window.PDFCore.getBasePath = getBasePath;
})();
