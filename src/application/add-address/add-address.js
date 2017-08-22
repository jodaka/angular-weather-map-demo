import addAddressController from './add-address-controller';

const addAddressTemplateUrl = require('./add-address.html');

module.exports = (app) => {
    require('data/address-list-service')(app);
    app.component('addAddress', {
        templateUrl: addAddressTemplateUrl,
        controllerAs: 'ctrl',
        controller: ['$scope', '$state', 'addressListService', '$timeout', addAddressController]
    });
};
