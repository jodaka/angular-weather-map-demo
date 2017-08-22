import CFG from 'cfg';
import angular from 'angular';

let storage = {
    en: require('../public/i18n/en.json')
};

class I18nProvider {
    constructor () {
        this.state = {
            list: CFG.langs.list,
            currentLang: CFG.langs.default
        };

        const savedJSON = window.localStorage.getItem('langs');
        if (savedJSON) {
            try {
                const saved = JSON.parse(savedJSON);
                if (saved.selectedLang) {
                    this.currentLang = saved.selectedLang;
                }
                storage = saved;
            } catch (e) {
                console.warn(e);
            }
        }

        this.storage = storage;
    }

    getResources (key) {
        if (storage.hasOwnProperty(this.state.currentLang)) {
            if (key && storage[this.state.currentLang][key]) {
                return angular.copy(storage[this.state.currentLang][key]);
            }
            return angular.copy(storage[this.state.currentLang]);
        }
    }

    /**
     * @return {array} list of available langs
     */
    getAvailableLangsList () {
        return this.state.list;
    }

    /**
     * @return {string} current lang
     */
    get currentLang () {
        return this.state.currentLang;
    }

    /**
     * @param {string} lang
     */
    set currentLang (lang) {
        this.state.currentLang = lang;
    }
}

export default new I18nProvider();
