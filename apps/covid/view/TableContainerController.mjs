import {default as ComponentController} from '../../../node_modules/neo.mjs/src/controller/Component.mjs';

/**
 * @class Covid.view.TableContainerController
 * @extends Neo.controller.Component
 */
class TableContainerController extends ComponentController {
    static getConfig() {return {
        /**
         * @member {String} className='Covid.view.TableContainerController'
         * @private
         */
        className: 'Covid.view.TableContainerController',
        /**
         * @member {String} apiBaseUrl='https://corona.lmao.ninja/'
         */
        apiBaseUrl: 'https://corona.lmao.ninja/',
        /**
         * @member {String} apiHistoricalDataEndpoint='historical'
         */
        apiHistoricalDataEndpoint: 'v2/historical/',
        /**
         * @member {Object} selectedRecord=null
         */
        selectedRecord: null,
        /**
         * @member {Neo.table.Container|null} table_=null
         * @private
         */
        table_: null
    }}

    /**
     *
     */
    onConstructed() {
        super.onConstructed();

        const me = this;

        me.view.on('countrySelect', me.onTableSelect, me);
    }

    /**
     *
     * @param {Object} data
     */
    addStoreItems(data) {
        const me        = this,
              timeline  = data && data.timeline,
              dataArray = [],
              map       = {},
              record    = me.selectedRecord;

        if (timeline) {
            Object.entries(timeline.cases).forEach(([key, value]) => {
                map[key] = {date: new Date(key).toISOString(), cases: value};
            });

            Object.entries(timeline.deaths).forEach(([key, value]) => {
                if (map.hasOwnProperty(key)) {
                    map[key].deaths = value;
                } else {
                    map[key] = {date: new Date(key).toISOString(), deaths: value};
                }
            });

            if (timeline.hasOwnProperty('recovered')) {
                Object.entries(timeline.recovered).forEach(([key, value]) => {
                    if (map.hasOwnProperty(key)) {
                        map[key].recovered = value;
                    } else {
                        map[key] = {date: new Date(key).toISOString(), recovered: value};
                    }
                });
            }

            Object.entries(map).forEach(([key, value]) => {
                dataArray.push(value);
            });

            me.getReference('historical-data-table').store.data = dataArray;

            if (record) {
                dataArray.push({
                    cases : record.cases,
                    date  : new Date().getTime(),
                    deaths: record.deaths
                });
            }

            Neo.main.DomAccess.updateChartData({
                data: dataArray,
                id  : me.getReference('line-chart').id
            });
        }
    }

    /**
     * Triggered when accessing the table config
     * @param {Neo.table.Container|null} value
     * @private
     */
    beforeGetTabley(value) {
        if (!value) {
            this._table = value = this.getReference('table');
        }

        return value;
    }

    /**
     *
     * @param {String} countryName
     */
    loadHistoricalData(countryName) {
        const me      = this,
              apiPath = me.apiBaseUrl + me.apiHistoricalDataEndpoint + countryName;

        fetch(apiPath)
            .then(response => response.json())
            .then(data => me.addStoreItems(data))
            .catch(err => console.log('Can’t access ' + apiPath, err));
    }

    /**
     * {Object} data
     */
    on420pxButtonClick(data) {
        this.getReference('controls-panel').width = 420;
    }

    /**
     * {Object} data
     */
    on800pxButtonClick(data) {
        this.getReference('controls-panel').width = 800;
    }

    /**
     * {Object} data
     */
    onCollapseButtonClick(data) {
        const panel  = this.getReference('controls-panel'),
              expand = panel.width === 40;

        panel.width = expand ? this.view.historyPanelWidth : 40;

        data.component.text = expand ? 'X' : '+';
    }

    /**
     * {Object} data
     * {Object} data.record
     */
    onTableSelect(data) {
        const me     = this,
              record = data.record;

        me.selectedRecord = {...record};
        me.loadHistoricalData(record.country);

        me.getReference('historical-data-label').html = 'Historical Data (' + record.country + ')';
    }
}

Neo.applyClassConfig(TableContainerController);

export {TableContainerController as default};