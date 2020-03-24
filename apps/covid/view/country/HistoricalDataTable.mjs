import Container      from '../../../../node_modules/neo.mjs/src/table/Container.mjs';
import HistoricalData from '../../store/HistoricalData.mjs';

/**
 * @class Covid.view.country.HistoricalDataTable
 * @extends Neo.table.Container
 */
class HistoricalDataTable extends Container {
    static getConfig() {return {
        /**
         * @member {String} className='Covid.view.country.HistoricalDataTable'
         * @private
         */
        className: 'Covid.view.country.HistoricalDataTable',
        /**
         * @member {Array} cls=['covid-country-table', 'neo-table-container']
         */
        cls: ['covid-country-table', 'neo-table-container'],
        /**
         * @member {Boolean} createRandomData=false
         */
        createRandomData: false, // testing config
        /**
         * @member {Neo.data.Store} store=HistoricalData
         */
        store: HistoricalData,

        columns: [{
            dataField: 'date',
            text     : 'Date',
            renderer : function(value) {
                return new Intl.DateTimeFormat('default', {
                    day  : 'numeric',
                    month: 'numeric',
                    year : 'numeric'
                }).format(new Date(value));
            }
        }, {
            align    : 'right',
            dataField: 'cases',
            text     : 'Cases'
        }, {
            align    : 'right',
            dataField: 'recovered',
            text     : 'Recovered',
            renderer : function(value) {
                return `<span style="color:green;">${value}</span>`;
            }
        }, {
            align    : 'right',
            dataField: 'deaths',
            text     : 'Deaths',
            renderer : function(value) {
                return `<span style="color:red;">${value}</span>`;
            }
        }]
    }}
}

Neo.applyClassConfig(HistoricalDataTable);

export {HistoricalDataTable as default};