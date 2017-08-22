import I18N from 'i18n';

require('./address-list.scss');

class addressListController {
    constructor ($state, $scope, addressListService) {
        this.router = $state;
        this.i18n = I18N.getResources('list');
        this.dataSrv = addressListService;
        this.list = addressListService.getList();

        $scope.$on('weather-updated', () => {
            this.list = addressListService.getList();
        });
    }

    deleteLocation (location) {
        this.dataSrv.deleteLocation(location);
        this.list = this.dataSrv.getList();
    }

    editLocation (location) {
        this.router.go('app.editAddress', { location: location.id });
    }

    gotoAddAddress () {
        this.router.go('app.addAddress');
    }
}

const addressListTemplateUrl = require('./address-list.html');

module.exports = (app) => {
    require('data/address-list-service')(app);

    app.component('addressList', {
        templateUrl: addressListTemplateUrl,
        controllerAs: 'ctrl',
        controller: ['$state', '$scope', 'addressListService', addressListController]
    });

    app.filter('location', () =>
        location => `${parseFloat(location.lat).toPrecision(4)}, ${parseFloat(location.lon).toPrecision(4)}`
    );
};
