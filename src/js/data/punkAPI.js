(function (window, $help) {
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

        $help.httpGET(this._buildBeersUrl(params), callback);
    };

    PunkAPI.prototype.getBeersPerPage = function (options, callback) {
        options = options || { page: 0, resultPerPage: 6 }
        var url = this._buildBeersPerPageUrl(options.page, options.resultPerPage);
        $help.httpGET(url, callback);
    };

    PunkAPI.prototype.getRandomBeer = function (callback) {
        $help.httpGET(this._buildRandomBeerUrl(), callback);
    };

    PunkAPI.prototype.getBeerById = function (id, callback) {
        $help.httpGET(this._buildBeerByIdUrl(id), callback);
    };

    PunkAPI.prototype._buildBeersUrl = function (params) {
        if (!params) {
            return this.baseUrl;
        }

        var keys = Object.keys(params);

        if (!this.validParams.includes(keys)) {
            return this.baseUrl;
        }

        var queryString = keys.map(function (key) {
            return key + '=' + params[key]
        }).join('&');

        var url = [this.baseUrl, '?', queryString].join('');
        return url;
    };

    PunkAPI.prototype._buildBeersPerPageUrl = function (page, resultPerPage) {
        var url = [this.baseUrl, '?page=', page, '&per_page=', resultPerPage].join('');
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
}(window, Helper || {}));