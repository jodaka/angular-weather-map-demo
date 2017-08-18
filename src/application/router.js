/**
 * App configuration & routing
 */
import I18N from 'i18n';
import CFG from 'cfg';

const config = ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $locationProvider.html5Mode(CFG.routerNoHash);
    const currentLang = I18N.currentLang;

    console.info('current lang ', currentLang);

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
            url: '/add-address',
            params: {
                params: null
            },
            component: 'addAddress'
        });
};

module.exports = (app) => {
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', config]);
};
