var Helper = (function () {
    var lastScrollTop = 0;
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
                        if (event.type === 'scroll') {
                            entry.handler.call(targetElement, event);
                        }
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
                    Helper.on(document, event, dispatchEvent, true);
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
        onscroll: function (callback, selector) {
            var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st > this.lastScrollTop) {
                var lastElement = Helper.qs(selector);
                if (lastElement) {
                    var lastElementOffset = lastElement.offsetTop + lastElement.clientHeight;
                    var currentPageOffset = window.pageYOffset + window.innerHeight;

                    if (currentPageOffset > lastElementOffset + 10) {
                        if (lastElement.dataset) {
                            callback({ lastBeerId: parseInt(lastElement.dataset.id, 10) });
                        }
                        else{
                            callback();
                        }
                    }
                }
            }

            this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling

        },
        isEmptyObject: function (obj) {
            return Object.keys(obj).length === 0 && obj.constructor === Object
        }
    }
}());