import addAddressController from './add-address-controller';

require('./add-address.scss');

class editAddressController extends addAddressController {
    constructor ($scope, $state, addressListService, $timeout) {
        super($scope, $state, addressListService, $timeout);

        this.marker = addressListService.getLocationById($state.params.location);
        this.marker.active = true;

        this.mapCenter = {
            lat: this.marker.lat,
            lon: this.marker.lon,
            zoom: 12
        };
    }

    /**
     * Saving new address and return to list screen
     */
    save () {
        delete this.marker.weather;
        this.dataSrv.editItem(this.marker);
        this.router.go('app.main');
    }

    /**
     * Basically just return to list
     */
    cancel () {
        this.router.go('app.main');
    }
}

const addAddressTemplateUrl = require('./add-address.html');

module.exports = (app) => {
    require('data/address-list-service')(app);

    app.component('editAddress', {
        templateUrl: addAddressTemplateUrl,
        controllerAs: 'ctrl',
        controller: ['$scope', '$state', 'addressListService', '$timeout', editAddressController]
    });
};
