var Helper = (function () {
    return {
        on: function (target, type, callback, useCapture) {
            target.addEventListener(type, callback, !!useCapture);
        },
        qs: function (selector, scope) {
            return (scope || document).querySelector(selector);
        },
        qsa: function (selector, scope) {
            return (scope || document).querySelectorAll(selector);
        }
    }
}());