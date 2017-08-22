import I18N from 'i18n';

/**
 * Basic service that loads lang JSON and stores it in localstorage
 */
class i18nService {
    constructor ($http, $state, addressListService, $window) {
        this.$http = $http;
        this.router = $state;
        this.dataSrv = addressListService;
        this.localStorage = $window.localStorage;
    }

    /**
     * Loads lang JSON and saves it into local storage
     * @param {String} lang 
     */
    changeLang (lang) {
        return this.$http({
            url: `/i18n/${lang}.json`,
            cache: true
        })
            .then((response) => {
                if (response.data) {
                    // saving new Lang
                    I18N.storage[lang] = response.data;
                    I18N.currentLang = lang;
                    this.saveStorage();

                    // weather forecast should be updated to new lang
                    this.dataSrv.resetWeather();
                    // changing URL
                    this.router.go('app.main', { lang });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    saveStorage () {
        I18N.storage.selectedLang = I18N.currentLang;
        this.localStorage.setItem('langs', JSON.stringify(I18N.storage));
    }
}

module.exports = (app) => {
    app.service('i18nService', ['$http', '$state', 'addressListService', '$window', i18nService]);
};
