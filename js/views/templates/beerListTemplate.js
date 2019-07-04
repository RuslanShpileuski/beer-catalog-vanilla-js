(function (window) {
	function BeerListTemplate() {
		this.defaultTemplate
			= '<li data-id="{{id}}">'
			+ '<div class="view">'
			+ '<label>{{title}}</label>'
			+ '<label>{{tagline}}</label>'
			+ '<button class="details">open</button>'
			+ '<button class="favorite">{{favorite}}</button>'
			+ '</div>'
			+ '</li>';
	};

	BeerListTemplate.prototype.show = function (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var favorite = '';

			if (data[i].favorite) {
				favorite = 'favorite';
			} else {
				favorite = 'remove favorite'
			}

			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', data[i].title);
			template = template.replace('{{favorite}}', favorite);

			view = view + template;
		}

		return view;
	};

	BeerListTemplate.prototype.itemCounter = function (favoriteCount) {
		var plural = favoriteCount === 1 ? '' : 's';

		return '<strong>' + favoriteCount + '</strong> item' + plural + ' favorite';
	};

	window.app = window.app || {};
	window.app.BeerListTemplate = BeerListTemplate;
}(window));