(function(helper){
    'use strict';

    function BeerCatalog(name){
        this.dataStorage = new app.DataStorage(name);
        this.model = new app.Model(this.dataStorage);
        this.template = new app.Template();
        this.view = new app.View(this.template);
        this.controller = new app.Controller(this.model, this.view);
    }

    var beerCatalog = new BeerCatalog('beerCatalog');

    function setView(){
        beerCatalog.controller.setView(document.location.hash);
    }

    helper.on(window, 'load', setView);
    helper.on(window, 'hashchange', setView);
})(Helper || {});