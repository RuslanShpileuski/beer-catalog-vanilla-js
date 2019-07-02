(function (window) {
    'use strict';

    function Model(dataStorage, punkApi) {
        this.dataStorage = dataStorage;
        this.punkApi = punkApi;
    }

    Model.prototype.read = function (query, callback) {
        var queryType = typeof query;
        callback = callback || function () { };

        if (queryType === 'function') {
            callback = query;
            return this.dataStorage.findAll(callback);
        } else if (queryType === 'string' || queryType === 'number') {
            query = parseInt(query, 10);
            this.dataStorage.find({ id: query }, callback);
        } else {
            this.dataStorage.find(query, callback);
        }
    };

    Model.prototype.remove = function (id, callback) {
        this.dataStorage.remove(id, callback);
    };

    Model.prototype.removeAll = function (callback) {
        this.dataStorage.removeAll(callback);
    };

    Model.prototype.getCount = function (callback) {
        var beers = {
            starred: 0,
            total: 0
        };

        this.dataStorage.findAll(function (data) {
            data.forEach(function (beer) {
                if (beer.starred) {
                    beers.starred++;
                }
                beers.total++;
            });
        });

        callback(beers);
    };

    // Export to window
    window.app = window.app || {};
    window.app.Model = Model;
})(window);