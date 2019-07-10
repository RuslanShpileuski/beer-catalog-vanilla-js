(function (window) {
    'use strict';

    function SliderModel(dataStorage) {
        this.dataStorage = dataStorage;
    }

    SliderModel.prototype.read = function (query, callback) {
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

    // Export to window
    window.app = window.app || {};
    window.app.SliderModel = SliderModel;
})(window);