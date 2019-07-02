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
        },
        live: (function () {
            var eventRegistry = {};

            function dispatchEvent(event) {
                var targetElement = event.target;

                eventRegistry[event.type].forEach(function (entry) {
                    var potentialElements = window.qsa(entry.selector);
                    var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

                    if (hasMatch) {
                        entry.handler.call(targetElement, event);
                    }
                });
            }

            return function (selector, event, handler) {
                if (!eventRegistry[event]) {
                    eventRegistry[event] = [];
                    on(document.documentElement, event, dispatchEvent, true);
                }

                eventRegistry[event].push({
                    selector: selector,
                    handler: handler
                });
            };
        }()),
        parent: function (element, tagName) {
            if (!element.parentNode) {
                return;
            }
            if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
                return element.parentNode;
            }
            return parent(element.parentNode, tagName);
        },
        ajaxGET: function (url, callback) {
            var xhr = new XMLHttpRequest();
            if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200)
                    callback(xhr.responseText);
            }
            xhr.open("GET", url, true);
            xhr.send(null);
        }
    }
}());