/**
 * App configuration & routing
 */
import I18N from 'i18n';
import CFG from 'cfg';

const config = ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(CFG.routerNoHash);
    const currentLang = I18N.currentLang;

    $urlRouterProvider.otherwise(`/${currentLang}/`);
    $urlRouterProvider.when(`/${currentLang}`, `/${currentLang}/`);

    $stateProvider
        .state('app', {
            url: '/:lang',
            abstract: true,
            params: {
                lang: currentLang
            }
        })
        .state('app.main', {
            url: '/',
            component: 'addressList'
        })
        .state('app.addAddress', {
            url: '/map/add',
            params: {
                params: null
            },
            component: 'addAddress'
        })
        .state('app.editAddress', {
            url: '/map/edit/:location',
            params: {
                location: null
            },
            component: 'editAddress'
        });
};

module.exports = (app) => {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);
};
