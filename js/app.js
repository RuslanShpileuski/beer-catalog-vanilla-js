(function (helper) {
    'use strict';

    function BeerCatalog(name) {
        this.webStorage = new app.WebStorage(name);
        this.punkApi = new app.PunkApi();
        this.beerModel = new app.BeerModel(this.webStorage, this.punkApi);
        this.beerListTemplate = new app.BeerListTemplate();
        this.beerListView = new app.BeerListView(this.beerListTemplate);
        this.beerController = new app.BeerController(this.beerModel, this.beerListView);
        this.router = new app.Router();
    }

    var beerCatalog = new BeerCatalog('beerCatalog');

    function setView() {
        beerCatalog.beerController.setView(document.location.hash);
    }

    function initRouter() {
        var appArea = document.body.appendChild(document.createElement("div"));

        //Add dashboard route
        beerCatalog.router.addRoute("dashboard", "", (function dashboardController() {
            //Scope specific elements
            var header = document.createElement("h1");
            header.textContent = "Dashboard";
            //Return initializer function
            return function initialize() {
                //Apply route
                appArea.appendChild(header);
                //Destroy elements on exit
                Router.onScopeDestroy(dashboardExitController);
            };
            //Unloading function
            function dashboardExitController() {
                appArea.removeChild(header);
            }
        })());

        //Add dashboard route
        beerCatalog.router.addRoute("dashboard", "", (function dashboardController() {
            //Scope specific elements
            var header = document.createElement("h1");
            header.textContent = "Dashboard";
            var links = document.createElement("ol");
            links.innerHTML = "<li><a href=\"#todo\">To-Do</a></li><li><a href=\"#calendar\">Calendar</a></li>";
            //Return initializer function
            return function initialize() {
                //Apply route
                appArea.appendChild(header);
                appArea.appendChild(links);
                //Destroy elements on exit
                beerCatalog.router.onScopeDestroy(dashboardExitController);
            };
            //Unloading function
            function dashboardExitController() {
                appArea.removeChild(header);
                appArea.removeChild(links);
            }
        })());

        //Add other routes
        beerCatalog.router.addRoutes([
            {
                name: "todo",
                url: "todo",
                callback: (function todoController() {
                    //Scope specific elements
                    var header = document.createElement("h1");
                    header.textContent = "To-do";
                    var links = document.createElement("ol");
                    links.innerHTML = "<li><a href=\"#\">Dashboard</a></li><li><a href=\"#calendar\">Calendar</a></li>";
                    //Return initializer function
                    return function initialize() {
                        //Apply route
                        appArea.appendChild(header);
                        appArea.appendChild(links);
                        //Destroy elements on exit
                        beerCatalog.router.onScopeDestroy(todoExitController);
                    };
                    //Unloading function
                    function todoExitController() {
                        appArea.removeChild(header);
                        appArea.removeChild(links);
                    }
                })()
            },
            {
                name: "calendar",
                url: "calendar",
                callback: (function calendarController() {
                    //Scope specific elements
                    var header = document.createElement("h1");
                    header.textContent = "Calendar";
                    var links = document.createElement("ol");
                    links.innerHTML = "<li><a href=\"#\">Dashboard</a></li><li><a href=\"#todo\">To-Do</a></li>";
                    //Return initializer function
                    return function initialize() {
                        //Apply route
                        appArea.appendChild(header);
                        appArea.appendChild(links);
                        //Destroy elements on exit
                        beerCatalog.router.onScopeDestroy(calendarExitController);
                    };
                    //Unloading function
                    function calendarExitController() {
                        appArea.removeChild(header);
                        appArea.removeChild(links);
                    }
                })()
            }
        ]);

        beerCatalog.router.init();
    }

    helper.on(window, 'load', setView);
    helper.on(window, 'hashchange', setView);
    helper.on(document, 'DOMContentLoaded', initRouter);

})(Helper || {});