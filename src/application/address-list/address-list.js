import I18N from 'i18n';

require('./address-list.scss');

class addressListController {
    constructor ($state, $scope, addressListService) {
        this.router = $state;
        this.i18n = I18N.getResources('list');
        this.dataSrv = addressListService;
        this.list = addressListService.getList();
        console.info(123, this.list);

        $scope.$on('weather-updated', () => {
            console.log('got event');
            this.list = addressListService.getList();
        });
    }

    deleteLocation (location) {
        this.dataSrv.deleteLocation(location);
        this.list = this.dataSrv.getList();
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
