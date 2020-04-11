import {default as OpenStreetMapComponent} from '../../../node_modules/neo.mjs/src/component/wrapper/OpenStreetMap.mjs';

/**
 * @class Covid.view.OpenStreetMapsComponent
 * @extends Neo.component.wrapper.OpenStreetMap
 */
class OpenStreetMapsComponent extends OpenStreetMapComponent {
    static getConfig() {return {
        /**
         * @member {String} className='Covid.view.OpenStreetMapsComponent'
         * @private
         */
        className: 'Covid.view.OpenStreetMapsComponent',
        /**
         * @member {String} ntype='covid-openstreet-map'
         * @private
         */
        ntype: 'covid-openstreet-map'
    }}
}

Neo.applyClassConfig(OpenStreetMapsComponent);

export {OpenStreetMapsComponent as default};