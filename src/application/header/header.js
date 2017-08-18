import I18N from 'i18n';

require('./header.scss');

class Header {
    constructor () {
        this.i18n = I18N.getResources('header');
        console.log(12345, this.i18n);
    }
}
const headerTemplateUrl = require('./header.html');

module.exports = (app) => {
    app.component('draewilHeader', {
        templateUrl: headerTemplateUrl,
        controller: [Header],
        controllerAs: 'ctrl'
    });
};
