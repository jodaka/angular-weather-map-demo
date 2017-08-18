import CFG from 'cfg';
import angular from 'angular';

const storage = {
    en: require('../public/i18n/en.json')
};

class I18nProvider {
    constructor () {
        this.state = {
            list: CFG.langs.list,
            currentLang: CFG.langs.default
        };

        if (this.state.list.indexOf(CFG.langs.default) < 0) {
            this.state.list.unshift(CFG.langs.default);
        }
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

    // /**
    //  * @return {object} current i18n resources
    //  */
    // getResources (key) {
    //     if (typeof key !== 'undefined' && this.res.hasOwnProperty(key)) {
    //         if (this.res.hasOwnProperty('misc')) {
    //             this.res[key].misc = this.res.misc;
    //         }
    //         return this.res[key];
    //     }
    //     return this.res;
    // }

    // /**
    //  * Method that loads i18n JSON from API and then parses compound keys
    //  * @return {promise}
    //  */
    // loadLang (lang = this.state.currentLang) {
    //     const cacheKey = `obe-i18n-cache-${lang}`;

    //     if (this.state.currentLang === lang && this.res !== null) {
    //         return;
    //     }

    //     if (this.state.list.indexOf(lang) < 0 && lang !== CFG.langs.default) {
    //         throw new Error(`Language ${lang} isn't available. List of available languages${this.state.list.join(', ')}`);
    //     }

    //     const resolver = (data) => {
    //         this.res = data;
    //         this.state.cache[lang] = data;
    //         window.sessionStorage.setItem('lang', lang);
    //         window.localStorage.setItem(cacheKey, JSON.stringify(data));
    //         this.currentLang = lang;
    //     };

    //     if (!this.state.cache[lang]) {
    //         const lsCache = window.localStorage.getItem(cacheKey);

    //         if (lsCache !== null) {
    //             resolver(JSON.parse(lsCache));
    //         } else {
    //             console.info('trying to load JSON for ', lang);

    //             // getJSON(`${this.state.path}/${lang}?filter=${filter}`)
    //             //     .then(I18nProvider.formatResponse)
    //             //     .then(resolver)
    //             //     .catch(e => console.error(e));
    //         }
    //     } else {
    //         this.res = this.state.cache[lang];
    //         this.currentLang = lang;
    //     }
    // }
}

export default new I18nProvider();
