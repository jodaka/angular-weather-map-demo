import I18N from 'i18n';

require('./header.scss');

class Header {
    constructor (i18nService) {
        this.i18n = I18N.getResources('header');

        this.selectedLang = I18N.currentLang;
        this.i18nList = I18N.getAvailableLangsList();
        this.i18nService = i18nService;

        console.log(123, this.i18nList);
    }

    changeLanguage () {
        console.log(2222, this.selectedLang);
        this.i18nService.changeLang(this.selectedLang);
    }
}
const headerTemplateUrl = require('./header.html');

module.exports = (app) => {
    require('data/i18n-service')(app);

    app.component('draewilHeader', {
        bindings: {
            tagline: '<'
        },
        templateUrl: headerTemplateUrl,
        controller: ['i18nService', Header],
        controllerAs: 'ctrl'
    });
};
