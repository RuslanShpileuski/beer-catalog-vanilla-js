(function (window) {
    function SearchTemplate() {
        this.defaultTemplate = '<div>'
            + '<input type="text" id="{{id}}" placeholder="{{placeholder}}" maxlength="{{maxlength}}">'
            + '</div>';
        this.defaultSettings = {
            id: 'search',
            placeholder: 'Search for beers...',
            maxlength: 10
        };
    };

    SearchTemplate.prototype.show = function (item) {
        item = item || this.defaultSettings;
        var template = this.defaultTemplate;
        var view = '';
        template = template.replace('{{id}}', item.id)
        template = template.replace('{{placeholder}}', item.placeholder);
        template = template.replace('{{maxlength}}', item.maxlength);
        view = view + template;
        return view;
    }

    window.app = window.app || {};
    window.app.SearchTemplate = SearchTemplate;
}(window));