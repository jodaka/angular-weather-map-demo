import I18N from 'i18n';

require('./header.scss');

class Header {
    constructor () {
        this.i18n = I18N.getResources('header');
    }
}
const headerTemplateUrl = require('./header.html');

module.exports = (app) => {
    app.component('draewilHeader', {
        bindings: {
            tagline: '<'
        },
        templateUrl: headerTemplateUrl,
        controller: [Header],
        controllerAs: 'ctrl'
    });
};
