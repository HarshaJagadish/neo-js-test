import {default as Container}     from '../../../node_modules/neo.mjs/src/container/Base.mjs';
import HistoricalDataTable        from './country/HistoricalDataTable.mjs';
import Panel                      from '../../../node_modules/neo.mjs/src/container/Panel.mjs';
import Table                      from './country/Table.mjs';
import TableContainerController   from './TableContainerController.mjs';

/**
 * @class Covid.view.TableContainer
 * @extends Neo.container.Base
 */
class TableContainer extends Container {
    static getConfig() {return {
        /**
         * @member {String} className='Covid.view.TableContainer'
         * @private
         */
        className: 'Covid.view.TableContainer',
        /**
         * @member {Boolean} autoMount=true
         */
        autoMount: true,
        /**
         * @member {Neo.controller.Component|null} controller=TableContainerController
         */
        controller: TableContainerController,
        /**
         * @member {Number} historyPanelWidth=420
         * @private
         */
        historyPanelWidth: 420,
        /**
         * @member {Neo.table.Container|null} table=null
         */
        table: null,
        /**
         * @member {Object|null} tableConfig=null
         */
        tableConfig: null,
        /**
         * @member {Object|null} layout={ntype: 'hbox', align: 'stretch'}
         */
        layout: {ntype: 'hbox', align: 'stretch'},
        /**
         * @member {Object[]|null} items
         */
        items: [{
            ntype : 'container',
            flex  : 1,
            layout: 'fit',
            items : []
        }, {
            module   : Panel,
            cls      : ['neo-configuration-panel', 'neo-panel', 'neo-container'],
            layout   : {ntype: 'vbox', align: 'stretch'},
            reference: 'controls-panel',
            style    : {backgroundColor: '#2b2b2b'},
            width    : '@config:historyPanelWidth',

            containerConfig: {
                flex : null,
                style: {overflowY: 'scroll'}
            },

            headers: [{
                dock: 'top',
                items: [{
                    ntype  : 'button',
                    handler: 'onCollapseButtonClick',
                    text   : 'X'
                }, {
                    ntype    : 'label',
                    reference: 'historical-data-label',
                    text     : 'Historical Data'
                }]
            }],

            items: []
        }]
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        const me = this;

        me.historicalDataTable = Neo.create({
            module   : HistoricalDataTable,
            reference: 'historical-data-table',
            ...me.historicalDataTableConfig || {}
        });

        me.items[1].items.push(me.historicalDataTable);

        me.table = Neo.create({
            module   : Table,
            reference: 'table',
            ...me.tableConfig || {}
        });

        me.items[0].items.push(me.table);
    }

    /**
     *
     */
    destroy(...args) {
        this.table = null;
        super.destroy(...args);
    }
}

Neo.applyClassConfig(TableContainer);

export {TableContainer as default};