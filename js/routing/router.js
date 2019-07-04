(function (window, $help) {
    function Router() {
        //Tasks to perform when view changes
        this.scopeDestroyTasks = [];
        //Registered Routes
        this.routes = [];
        //Listener handle for window events
        this.listener = null;
        this.scopeDestroyTaskID = 0;
    }

    //Initializer function. Call this to change listening for window changes.
    Router.prototype.init = function () {
        var self = this;
        //Remove previous event listener if set
        if (this.listener !== null) {
            $help.remove('popstate', this.listener);
            this.listener = null;
        }
        //Set new listener for "popstate"
        $help.on(window, 'popstate', self.checkRoute.bind(self));

        //Call initial routing as soon as thread is available
        setTimeout(self.checkRoute.bind(self), 0);

        return this;
    };

    //Adding a route to the list
    Router.prototype.addRoute = function (name, url, callback) {
        var route = this.routes.find(function (r) {
            return r.name === name;
        });
        url = url.replace(/\//ig, '/');
        if (route === void 0) {
            this.routes.push({
                callback: callback,
                name: name.toString().toLowerCase(),
                url: url
            });
        }
        else {
            route.callback = callback;
            route.url = url;
        }
        return this;
    };

    //Adding multiple routes to list
    Router.prototype.addRoutes = function (routes) {
        var self = this;
        if (routes === void 0) {
            routes = [];
        }
        routes.forEach(function (route) {
            self.addRoute(route.name, route.url, route.callback);
        });

        return this;
    };

    //Removing a route from the list by route name
    Router.prototype.removeRoute = function (name) {
        name = name.toString().toLowerCase();
        this.routes = this.routes.filter(function (route) {
                return route.name != name;
            });
        return this;
    };

    //Check which route to activate
    Router.prototype.checkRoute = function () {
        var self = this;
        //Get hash
        var hash = window.location.hash.substr(1).replace(/\//ig, '/');
        //Default to first registered route. This should probably be your 404 page.
        var route = self.routes[0];
        //Check each route
        for (var routeIndex = 0; routeIndex < this.routes.length; routeIndex++) {
            var routeToTest = this.routes[routeIndex];
            if (routeToTest.url == hash) {
                route = routeToTest;
                break;
            }
        }
        //Run all destroy tasks
        this.scopeDestroyTasks.forEach(function (task) {
            task();
        });
        //Reset destroy task list
        this.scopeDestroyTasks = [];
        //Fire route callback
        route.callback.call(window);
    };

    //Register scope destroy tasks
    Router.prototype.onScopeDestroy = function (callback) {
        this.scopeDestroyTasks.push(callback);
        return this;
    };

    // Export to window
    window.app = window.app || {};
    window.app.Router = Router;
})(window, Helper || {});