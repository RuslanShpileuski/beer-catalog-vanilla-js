(function (window) {
    'use strict';

    function BeerModel(webStorage, punkAPI) {
        this.webStorage = webStorage;
        this.punkAPI = punkAPI;
    }

    BeerModel.prototype.readBeers = function (query, callback) {
        var queryType = typeof query;
        callback = callback || function () { };

        if (queryType === 'function') {
            callback = query;
            return this.punkAPI.getBeers(callback);
        } else if (queryType === 'string' || queryType === 'number') {
            query = parseInt(query, 10);
            this.punkAPI.getBeerById(query, callback);
        } else if (queryType === 'object') {
            this.punkAPI.getBeersPerPage(query, callback);
        }
    }

    BeerModel.prototype.read = function (query, callback) {
        var queryType = typeof query;
        callback = callback || function () { };

        if (queryType === 'function') {
            callback = query;
            return this.webStorage.findAll(callback);
        } else if (queryType === 'string' || queryType === 'number') {
            query = parseInt(query, 10);
            this.webStorage.find({ id: query }, callback);
        } else {
            this.webStorage.find(query, callback);
        }
    };

    BeerModel.prototype.remove = function (id, callback) {
        this.webStorage.remove(id, callback);
    };

    BeerModel.prototype.removeAll = function (callback) {
        this.webStorage.removeAll(callback);
    };

    BeerModel.prototype.getCount = function (callback) {
        var beers = {
            favorite: 0,
            total: 0
        };

        this.webStorage.findAll(function (data) {
            data.forEach(function (beer) {
                if (beer.favorite) {
                    beers.favorite++;
                }
                beers.total++;
            });
        });

        callback(beers);
    };

    // Export to window
    window.app = window.app || {};
    window.app.BeerModel = BeerModel;
})(window);