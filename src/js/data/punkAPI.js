(function (window, $http) {
    function PunkAPI() {
        var self = this;

        /*  
            abv_gt	number	Returns all beers with ABV greater than the supplied number
            abv_lt	number	Returns all beers with ABV less than the supplied number
            ibu_gt	number	Returns all beers with IBU greater than the supplied number
            ibu_lt	number	Returns all beers with IBU less than the supplied number
            ebc_gt	number	Returns all beers with EBC greater than the supplied number
            ebc_lt	number	Returns all beers with EBC less than the supplied number
            beer_name	string	Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
            yeast	string	Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
            brewed_before	date	Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
            brewed_after	date	Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
            hops	string	Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
            malt	string	Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
            food	string	Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
            ids	string (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol 
        */

        self.validParams = ['abv_gt', 'abv_lt', 'ibu_gt', 'ibu_lt', 'ebc_gt', 'ebc_lt', 'beer_name', 'yeast', 'brewed_before', 'brewed_after', 'hops', 'malt', 'food', 'ids'];
        self.baseUrl = 'https://api.punkapi.com/v2/beers/';
    };

    PunkAPI.prototype.getBeers = function (params, callback) {
        var paramsType = typeof params;

        if (paramsType === 'function') {
            callback = params;
        }

        $http.get(this._buildBeersUrl(params), callback);
    };

    PunkAPI.prototype.getBeersPerPage = function (params, callback) {
        var url = this._buildBeersPerPageUrl(params.page, params.perPage);
        $http.get(url, callback);
    };

    PunkAPI.prototype.getRandomBeer = function (callback) {
        $http.get(this._buildRandomBeerUrl(), callback);
    };

    PunkAPI.prototype.getBeerById = function (id, callback) {
        $http.get(this._buildBeerByIdUrl(id), callback);
    };

    PunkAPI.prototype._buildBeersUrl = function (params) {
        var self = this;
        if (!params) {
            return this.baseUrl;
        }

        var keys = Object.keys(params);

        var result = keys.filter(function (item) {
            return !self.validParams.includes(item);
        });

        if (result.length > 0) {
            return this.baseUrl;
        }

        var queryString = keys.map(function (key) {
            return key + '=' + params[key]
        }).join('&');

        var url = [this.baseUrl, '?', queryString].join('');
        return url;
    };

    PunkAPI.prototype._buildBeersPerPageUrl = function (page, perPage) {
        var url = [this.baseUrl, '?page=', page, '&per_page=', perPage].join('');
        return url;
    };

    PunkAPI.prototype._buildBeerByIdUrl = function (id) {
        if (!id) {
            throw new Error('Id is invalid ' + id);
        }
        var url = [this.baseUrl, id].join('');
        return url;
    };

    PunkAPI.prototype._buildRandomBeerUrl = function () {
        var url = [this.baseUrl, 'random'].join('');
        return url;
    }

    // Export to window
    window.app = window.app || {};
    window.app.PunkAPI = PunkAPI;
}(window, HTTP || {}));