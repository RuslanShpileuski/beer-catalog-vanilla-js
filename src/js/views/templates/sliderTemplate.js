(function (window) {
    function SliderTemplate() {
        this.defaultTemplate = '<div>'
            + '<label id="{{id}}Value">{{currentValue}}</label>'
            + '<input type="range" id="{{id}}" name="{{name}}" min="{{minValue}}" max="{{maxValue}}" value="{{currentValue}}">'
            + '<label for="{{name}}">{{name}}</label>'
            + '</div>';

        this.defaultSettings = {
            minValue: 1,
            maxValue: 100,
            currentValue: 50
        }
    };

    SliderTemplate.prototype.show = function (item) {
        item = item || {};
        var template = this.defaultTemplate;
        var view = '';

        template = template.replace(new RegExp('{{id}}', 'g'), item.id);
        template = template.replace(new RegExp('{{name}}', 'g'), item.name)
        template = template.replace('{{minValue}}', item.minValue);
        template = template.replace('{{maxValue}}', item.maxValue);
        template = template.replace(new RegExp('{{currentValue}}', 'g'), item.currentValue);
        view = view + template;
        return view;
    }

    window.app = window.app || {};
    window.app.SliderTemplate = SliderTemplate;
}(window));