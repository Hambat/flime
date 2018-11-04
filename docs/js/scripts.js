document.addEventListener('DOMContentLoaded', function () {
    function getClassName(name) {
        return document.getElementsByClassName(name)[0];
    }

    const cookiesBox = getClassName('cookies-box');

    const cookiesBoxClose = getClassName('cookies-box__close');

    cookiesBoxClose.onclick = function () {
        cookiesBox.style.display = 'none';
    }
});