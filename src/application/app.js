import angular from 'angular';
import '../styles/styles.scss';

// angular deps
const app = angular.module('draewil', [
    'ui.router',
    'ngSanitize',
    'openlayers-directive'
]);

require('./router')(app);

// components
require('./header/header')(app);
require('./add-address/add-address')(app);
require('./add-address/edit-address')(app);
require('./address-list/address-list')(app);

// debug info 
app.config(['$compileProvider', ($compileProvider) => {
    $compileProvider.debugInfoEnabled(true);
}]);

const rootNode = document.getElementById('draewil');
angular.bootstrap(rootNode, ['draewil'], {
    strictDi: true
});

export default app;
