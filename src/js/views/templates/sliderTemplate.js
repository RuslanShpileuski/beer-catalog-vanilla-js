(function (window) {
    function SliderTemplate() {
        this.defaultTemplate = '<div>'
            + '<div>{{name}}</div>'
            + '<input type="range" min="{{minValue}}" max="{{maxValue}}" value="{{currentValue}}" id="{{id}}">'
            + '</div>';

        this.defaultSettings = {
            minValue: 1,
            maxValue: 100,
            currentValue: 50
        }
    };

    SliderTemplate.prototype.show = function (item) {
        item = item || {};
        item.settings = item.settings || this.defaultSettings;
        var template = this.defaultTemplate;
        var view = '';

        template = template.replace('{{name}}', item.name)
        template = template.replace('{{id}}', item.id);
        template = template.replace('{{minValue}}', item.settings.minValue);
        template = template.replace('{{maxValue}}', item.settings.maxValue);
        template = template.replace('{{currentValue}}', item.settings.currentValue);
        view = view + template;
        return view;
    }

    window.app = window.app || {};
    window.app.SliderTemplate = SliderTemplate;
}(window));