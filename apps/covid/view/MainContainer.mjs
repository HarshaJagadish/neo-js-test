import GalleryContainer          from './GalleryContainer.mjs';
import HeaderContainer           from './HeaderContainer.mjs';
import HelixContainer            from './HelixContainer.mjs';
import MainContainerController   from './MainContainerController.mjs';
import {default as TabContainer} from '../../../node_modules/neo.mjs/src/tab/Container.mjs';
import TableContainer            from './country/TableContainer.mjs';
import Viewport                  from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';

/**
 * @class Covid.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {return {
        /**
         * @member {String} className='Covid.view.MainContainer'
         * @private
         */
        className: 'Covid.view.MainContainer',
        /**
         * @member {Boolean} autoMount=true
         */
        autoMount: true,
        /**
         * @member {Array} cls=['covid-viewport', 'neo-viewport']
         */
        cls: ['covid-viewport', 'neo-viewport'],
        /**
         * @member {Neo.controller.Component} controller=MainContainerController
         */
        controller: MainContainerController,
        /**
         * @member {Object} layout={ntype: 'vbox', align: 'stretch'}
         */
        layout: {ntype: 'vbox', align: 'stretch'}
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        this.items = [HeaderContainer, {
            module     : TabContainer,
            activeIndex: this.controller.getTabIndex(Neo.config.hash),
            flex       : 1,
            reference  : 'tab-container',
            style      : {margin: '10px'},

            items: [{
                module         : TableContainer,
                reference      : 'table',
                tabButtonConfig: {
                    iconCls: 'fa fa-table',
                    route  : 'mainview=table',
                    text   : 'Table'
                }
            }, {
                module         : GalleryContainer,
                tabButtonConfig: {
                    iconCls: 'fa fa-images',
                    route  : 'mainview=gallery',
                    text   : 'Gallery'
                }
            }, {
                module         : HelixContainer,
                tabButtonConfig: {
                    iconCls: 'fa fa-dna',
                    route  : 'mainview=helix',
                    text   : 'Helix'
                }
            }]
        }];
    }
}

Neo.applyClassConfig(MainContainer);

export {MainContainer as default};