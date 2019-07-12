(function (window) {
    function BeerDetailsTemplate() {
        this.defaultTemplate =
            '<div class="inner"></div>'
            + '<div class="box">'
            + '<div class="content">'
            + '<header class="align-center">'
            + '<p>{{tagline}}</p>'
            + '<h2>{{name}}</h2>'
            + '</header>'
            + '<p>{{description}}</p>'
            + '<h3>Properties</h3>'
            + '<h3>Food Pairing</h3>'
            + '<h3>Brewing</h3>'
            + '<blockquote>{{brewers_tips}}</blockquote>'
            + '<h3>Ingredients</h3>'
            + '<h3>Method</h3>'
            + '</div>'
            + '</div>'
            + '</div>'
    };

    BeerDetailsTemplate.prototype.show = function (data) {
        data = data || {};
        var i, l;
		var view = '';

        for (i = 0, l = data.length; i < l; i++) {

            var template = this.defaultTemplate;

            template = template.replace(new RegExp('{{tagline}}', 'g'), data[i].tagline);
            template = template.replace(new RegExp('{{name}}', 'g'), data[i].name)
            template = template.replace('{{description}}', data[i].description);
            template = template.replace('{{brewers_tips}}', data[i].brewers_tips);
            view = view + template;
        }

        return view;
    }

    window.app = window.app || {};
    window.app.BeerDetailsTemplate = BeerDetailsTemplate;
}(window));