import I18N from 'i18n';
import CFG from 'cfg';

class addressListService {
    constructor ($http, $window, $rootScope, $weatherSrv) {
        this.localStorage = $window.localStorage;
        this.$http = $http;
        this.$rootScope = $rootScope;

        this.gmapsApiKey = CFG.googleMapsApiKey;
        this.weatherSrv = $weatherSrv;

        this.keyName = 'list';
        this.weatherKeyName = 'forecastTimestamp';

        this.defaultList = [{
            lat: 51.50,
            lon: -0.08429,
            id: '51.50_-0.08429',
            name: 'London'
        }];
        this.list = this.defaultList;

        // retrive saved value
        this.retrieve();

        // update weather forcast
        this.getWeather();
    }

    /**
     * Return single location by id
     * @param {String} id 
     */
    getLocationById (id) {
        for (let index = 0; index < this.list.length; index++) {
            if (this.list[index].id === id) {
                return this.list[index];
            }
        }
        return null;
    }

    resetWeather () {
        this.localStorage.removeItem(this.weatherKeyName);
        this.getWeather();
    }

    /**
     * Get weather forcast for all saved locations in the list.
     * Once forecast is updated an 'weather-updated' event is emitted
     * 
     * If we already have forecast that is fresh (30 min old), then 
     * we are going to use it.
     */
    getWeather () {
        let forecastTimestamp = this.localStorage.getItem(this.weatherKeyName);
        if (forecastTimestamp) {
            // saved forecast timestamp + 30 mins. 
            forecastTimestamp = parseInt(forecastTimestamp, 10) + 30 * 60 * 1000;
            if (forecastTimestamp > Date.now()) {
                // forecast is fresh enough
                return;
            }
        }

        const promises = [];

        this.list.forEach((location) => {
            if (location.lat && location.lon) {
                promises.push(this.getWeatherForLocation(location));
            }
        });

        Promise.all(promises).then(() => {
            // saving forecast timestamp
            this.localStorage.setItem(this.weatherKeyName, Date.now());

            this.store();

            // emiting event about new data
            this.$rootScope.$emit('weather-updated');
        });
    }

    /**
     * Removes location from list
     * @param {*} location 
     */
    deleteLocation (location) {
        this.list = this.list.filter(loc => loc.id !== location.id);
        this.store();
    }

    /**
     * Get weather forecast for a single location
     * @param {Location} location 
     */
    getWeatherForLocation (location) {
        return this.weatherSrv.getLocationWeather(location)
            .then((weatherData) => {
                location.weather = weatherData;
            })
            .catch((er) => {
                console.error(er);
            });
    }

    getList () {
        return this.list;
    }

    /**
     * Changes address
     * @param {Location} item 
     */
    editItem (item) {
        this.getWeatherForLocation(item)
            .finally(() => {
                const res = [];
                this.list.forEach((val) => {
                    res.push((val.id === item.id) ? item : val);
                });
                this.list = res;
                this.store();
                this.$rootScope.$emit('weather-updated');
            });
    }

    /**
     * Saving new location to the list.
     * Gonna load the forecast for new location.
     * 
     * @param {Location} item 
     */
    addItem (item) {
        item.id = `${item.lat}_${item.lon}`;

        this.getWeatherForLocation(item)
            .finally(() => {
                this.list.push(item);
                this.store();
                this.$rootScope.$emit('weather-updated');
            });
    }

    /**
     * Load saved list of locations from local storage
     */
    retrieve () {
        const saved = this.localStorage.getItem(this.keyName);
        if (saved) {
            try {
                this.list = JSON.parse(saved);
            } catch (e) {
                console.error(e);
                this.list = this.defaultList;
            }
        }
    }

    store () {
        this.localStorage.setItem(this.keyName, JSON.stringify(this.list));
    }

    /**
     * Perform reverse GEO request and get location address from Google
     * @param {Location} location 
     */
    getLocationAddress (location) {
        return this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lon}&key=${this.gmapsApiKey}&language=${I18N.currentLang}`)
            .then((response) => {
                if (response.data) {
                    return response.data.results[0].formatted_address;
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

module.exports = (app) => {
    require('data/weather-service')(app);
    app.service('addressListService', ['$http', '$window', '$rootScope', 'weatherService', addressListService]);
};
