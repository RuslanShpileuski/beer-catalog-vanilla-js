(function (window) {
    'use strict';

    function SliderModel(dataStorage) {
        this.dataStorage = dataStorage;
    }

    SliderModel.prototype.read = function (query, callback) {
    };

    // Export to window
    window.app = window.app || {};
    window.app.SliderModel = SliderModel;
})(window);