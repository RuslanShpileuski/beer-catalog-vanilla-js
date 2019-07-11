(function (window) {
    'use strict';

    function SearchModel() {
    }

    SearchModel.prototype.read = function (query, callback) {
    };

    // Export to window
    window.app = window.app || {};
    window.app.SearchModel = SearchModel;
})(window);