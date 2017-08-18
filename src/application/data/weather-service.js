import I18N from 'i18n';
import CFG from 'cfg';

class weatherService {
    constructor ($http) {
        this.$http = $http;
        this.prometheusApiKey = CFG.prometheusApiKey;
    }

    getLocationWeather (location, units = 'si') {
        return this.$http({
            url: `https://prometheus-api.draewil.net/${this.prometheusApiKey}/${location.lat},${location.lon}?language=${I18N.currentLang}&units=${units}`,
            cache: true
        })
            .then((response) => {
                if (response.data) {
                    return response.data.currently;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

module.exports = (app) => {
    app.service('weatherService', ['$http', weatherService]);
};
