import I18N from 'i18n';

require('./add-address.scss');
// we need OpenLayers to perform coordinates transformation
const ol = require('openlayers');

export default class addAddressController {
    constructor ($scope, $state, addressListService, $timeout) {
        this.router = $state;
        this.i18n = I18N.getResources('add');
        this.dataSrv = addressListService;

        this.marker = {
            active: false
        };

        this.mapCenter = {
            lat: 48.2494,
            lon: 9.6970,
            zoom: 4
        };

        this.map = {
            events: {
                map: ['singleclick']
            },
            interactions: {
                mouseWheelZoom: true
            },
            controls: {
                zoom: {
                    active: true
                }
            }
        };

        /**
         * Click on the map return coordinates in metric
         * we need to convert them our projection coordinates
         * and save marker lat/lon
         * 
         * Upon receiving coordinates we ask Google GEO for 
         * text address of the marker. Optional thing, but nice to have
         */
        $scope.$on('openlayers.map.singleclick', (event, data) => {
            $timeout(() => {
                // converting from metric
                const p = ol.proj.transform([data.coord[0], data.coord[1]], data.projection, this.mapCenter.projection);
                this.marker.lat = p[1];
                this.marker.lon = p[0];
                this.marker.active = true;

                // reverse geo address request
                this.dataSrv.getLocationAddress(this.marker)
                    .then((address) => {
                        this.marker.address = address;
                        this.marker.name = address;
                    });
            });
        });
    }

    /**
     * Saving new address and return to list screen
     */
    save () {
        if (this.marker.active) {
            this.dataSrv.addItem(this.marker);
            this.router.go('app.main');
        }
    }

    /**
     * Basically just return to list
     */
    cancel () {
        this.router.go('app.main');
    }
}
