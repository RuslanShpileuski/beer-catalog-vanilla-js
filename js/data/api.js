/*global $ajaxGet */
(function (window) {
    function PunkApi() {
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

        self.params = ['abv_gt', 'abv_lt', 'ibu_gt', 'ibu_lt', 'ebc_gt', 'ebc_lt', 'beer_name', 'yeast', 'brewed_before', 'brewed_after', 'hops', 'malt', 'food', 'ids'];
        self.basicUrl = 'https://api.punkapi.com/v2/beers/';
    };

    PunkApi.prototype.getBeers = function (params, callback) {
        var self = this;
        var beersUrl = self._buildBeersUrl(params);
        return JSON.parse(Helper.ajaxGET(beersUrl, callback));
    };

    PunkApi.prototype.getRandomBeer = function (callback) {
        var self = this;
        var randomBeerUrl = self._buildRandomBeerUrl();
        return JSON.parse(Helper.ajaxGET(randomBeerUrl, callback));
    };

    PunkApi.prototype.getBeerById = function (id, callback) {
        var self = this;
        var beerByIdUrl = self._buildBeerByIdUrl(id);
        return JSON.parse(Helper.ajaxGET(beerByIdUrl, callback));
    };

    PunkApi.prototype._buildBeersUrl = function (params) {
        var self = this;

        if (!params) {
            return self.basicUrl;
        }

        var keys = Object.keys(params);

        if (!this.params.includes(keys)) {
            return self.basicUrl;
        }

        var queryString = keys.map(function (key) {
            return key + '=' + params[key]
        }).join('&');

        var url = [self.basicUrl, '?', queryString].join('');
        return url;
    };

    PunkApi.prototype._buildBeersPerPageUrl = function (page, resultPerPage) {
        var url = [self.basicUrl, '?page=', page, '&per_page=', resultPerPage].join('');
        return url;
    };

    PunkApi.prototype._buildBeerByIdUrl = function (id) {
        if (!id) {
            throw new Error('Id is invalid ' + id);
        }
        var url = [self.basicUrl, id].join('');
        return url;
    };

    PunkApi.prototype._buildRandomBeerUrl = function () {
        var url = [self.basicUrl, 'random'].join('');
        return url;
    }

    // Export to window
    window.app = window.app || {};
    window.app.PunkApi = PunkApi;
}(window, Helper || {}));