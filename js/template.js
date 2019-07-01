(function (window) {
    function Template(){
        this.defaultTemplate
		=	'<li data-id="{{id}}" class="{{starred}}">'
		+		'<div class="view">'
		+			'<label>{{title}}</label>'
		+			'<button class="destroy"></button>'
		+		'</div>'
		+	'</li>';
    };

    Template.prototype.show = function (data) {
		var i, l;
		var view = '';

		for (i = 0, l = data.length; i < l; i++) {
			var template = this.defaultTemplate;
			var completed = '';

			if (data[i].starred) {
				starred = 'starred';
			}

			template = template.replace('{{id}}', data[i].id);
			template = template.replace('{{title}}', data[i].title);
			template = template.replace('{{starred}}', completed);

			view = view + template;
		}

		return view;
	};

    Template.prototype.itemCounter = function (starredBeers) {
		var plural = starredBeers === 1 ? '' : 's';

		return '<strong>' + starredBeers + '</strong> item' + plural + ' starred';
	};

    window.app = window.app || {};
    window.app.Template = Template;
}(window));