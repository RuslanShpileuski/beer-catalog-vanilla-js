var Helper = (function () {
    return {
        remove: function (target, type, listener, useCapture) {
            target.removeEventListener(type, listener, !!useCapture)
        },
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
                    if (entry.selector) {
                        var potentialElements = Helper.qsa(entry.selector);
                        var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

                        if (hasMatch) {
                            entry.handler.call(targetElement, event);
                        }
                    }
                });
            }

            return function (selector, event, handler) {
                if (!eventRegistry[event]) {
                    eventRegistry[event] = [];
                    Helper.on(document.documentElement, event, dispatchEvent, true);
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
            return Helper.parent(element.parentNode, tagName);
        },
        httpGET: function (url, callback) {
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