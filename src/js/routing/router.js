/*
    Taken from https://stackoverflow.com/questions/54231533/how-to-create-a-vanilla-js-routing-for-spa
    Additional https://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url
*/
var Router = {
    routes: [],
    mode: null,
    root: '/',
    config: function (options) {
        this.mode = options && options.mode && options.mode == 'history'
            && !!(history.replaceState) ? 'history' : 'hash';
        this.root = options && options.root ? '/' + this.clearSlashes(options.root) + '/' : '/';
        return this;
    },
    getFragment: function () {
        var fragment = '';
        if (this.mode === 'history') {
            fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\\?(.*)$/, '');
            fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.clearSlashes(fragment);
    },
    clearSlashes: function (path) {
        return path.toString().replace(/\/$/, '').replace(/^\\/, '');
    },
    add: function (re, handler) {
        if (typeof re == 'function') {
            handler = re;
            re = '';
        }
        this.routes.push({ re: re, handler: handler });
        return this;
    },
    remove: function (param) {
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.re.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    flush: function () {
        this.routes = [];
        this.mode = null;
        this.root = '/';
        return this;
    },
    check: function (hash) {
        var hash = hash || this.getFragment();
        var keys, match, routeParams, regex;
        for (var i = 0, max = this.routes.length; i < max; i++) {
            routeParams = {}
            keys = this.routes[i].re.match(/:([^\/]+)/g);
            regex = this.routes[i].re.replace(/:([^\/]+)/g, "([^\/]*)");
            match = hash.match(new RegExp(regex));
            if (match) {
                match.shift();
                match.forEach(function (value, i) {
                    routeParams[keys[i].replace(":", "")] = value;
                });
                this.routes[i].handler.call({}, routeParams);
                return this;
            }
        }
        return this;
    },
    listen: function () {
        var self = this;
        var current = this.root;
        var fn = function () {
            if (current !== self.getFragment()) {
                current = self.getFragment();
                self.check(current);
            }
        }
        clearInterval(this.interval);
        this.interval = setInterval(fn, 50);
        return this;
    },
    navigate: function (path) {
        path = path ? path : '';
        if (this.mode === 'history') {
            history.pushState(null, null, this.root + this.clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    }
}