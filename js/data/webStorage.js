(function (window) {
    function WebStorage(name, callback) {
        callback = callback || function () { };

        this._storageName = name;

        if (!localStorage[name]) {
            var data = {
                beers: []
            };

            localStorage[name] = JSON.stringify(data);
        }

        callback.call(this, JSON.parse(localStorage[name]));
    };

    WebStorage.prototype.find = function (query, callback) {
        if (!callback) {
            return;
        }

        var beers = JSON.parse(localStorage[this._storageName]).beers;

        callback.call(this, beers.filter(function (todo) {
            for (var q in query) {
                if (query[q] !== todo[q]) {
                    return false;
                }
            }
            return true;
        }));
    };

    WebStorage.prototype.save = function (updateDataItem, callback, id) {
        callback = callback || function () { };

        var data = JSON.parse(localStorage[this._storageName]);
        var beers = data.beers;

        // If an ID was actually given, find the item and update each property
        if (id) {
            for (var i = 0; i < beers.length; i++) {
                if (beers[i].id === id) {
                    for (var key in updateDataItem) {
                        beers[i][key] = updateDataItem[key];
                    }
                    break;
                }
            }

            localStorage[this._storageName] = JSON.stringify(data);
            callback.call(this, JSON.parse(localStorage[this._storageName]).beers);
        } else {
            // Generate an ID
            updateDataItem.id = new Date().getTime();

            todos.push(updateDataItem);
            localStorage[this._storageName] = JSON.stringify(data);
            callback.call(this, [updateDataItem]);
        }
    };

    WebStorage.prototype.findAll = function (callback) {
        callback = callback || function () { };
        callback.call(this, JSON.parse(localStorage[this._storageName]).beers)
    };

    WebStorage.prototype.drop = function (callback) {
        localStorage[this._storageName] = JSON.stringify({ beers: [] })
        callback.call(this, JSON.parse(localStorage[this._storageName]).beers);
    };

    window.app = window.app || {};
    window.app.WebStorage = WebStorage;
}(window));