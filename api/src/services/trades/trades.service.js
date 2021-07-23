// Initializes the `Trades` service on path `/trades`
const { Trades } = require('./trades.class');
const createModel = require('../../models/trades.model');
const hooks = require('./trades.hooks');

const trades = [
  {

    "name": "L2",
    "symbol": "GBPAUD",
    "entryPrice": 1.86111,
    "size": 0.03,
    "isAsian": false,
    "type": "SELL",
    "isOpen": true,
    "accId": 1
  },
  {
    "name": "Initial",
    "symbol": "GBPAUD",
    "entryPrice": 1.85302,
    "size": 0.01,
    "isAsian": false,
    "type": "SELL",
    "isOpen": true,
    "accId": 1
  },
  {
    "name": "Init",
    "symbol": "EURJPY",
    "entryPrice": 130.803,
    "size": 0.01,
    "isAsian": true,
    "type": "BUY",
    "isOpen": false,
    "accId": 1
  },
  {
    "name": "L2",
    "symbol": "EURJPY",
    "entryPrice": 130.386,
    "size": 0.02,
    "isAsian": true,
    "type": "BUY",
    "isOpen": true,
    "accId": 1
  },
  {
    "name": "L2",
    "symbol": "USDJPY",
    "entryPrice": 109.904,
    "size": 0.02,
    "isAsian": true,
    "type": "SELL",
    "isOpen": false,
    "accId": 1
  },
  {
    "name": "L3",
    "symbol": "EURJPY",
    "entryPrice": 129.786,
    "size": 0.03,
    "isAsian": true,
    "type": "BUY",
    "isOpen": false,
    "accId": 1
  },
  {
    "name": "L4",
    "symbol": "USDJPY",
    "entryPrice": 110.21,
    "size": 0.04,
    "isAsian": true,
    "type": "SELL",
    "isOpen": false,
    "accId": 1
  },
  {
    "name": "L4",
    "symbol": "EURJPY",
    "entryPrice": 129.988,
    "size": 0.03,
    "isAsian": true,
    "type": "BUY",
    "isOpen": true,
    "accId": 1
  },

  // 1
  {
    "name": "L2",
    "symbol": "USDCHF",
    "entryPrice": 0.94156,
    "size": 0.04,
    "isAsian": false,
    "type": "BUY",
    "isOpen": true,
    accId: 2
  },
  {
    "name": "L2",
    "symbol": "USDCAD",
    "entryPrice": 1.2319,
    "size": 0.07,
    "isAsian": false,
    "type": "SELL",
    "isOpen": true,
    accId: 2
  },
  {
    "name": "Init",
    "symbol": "USDCAD",
    "entryPrice": 1.24117,
    "size": 0.07,
    "isAsian": false,
    "type": "SELL",
    "isOpen": true,
    accId: 2
  },
  {
    "name": "L3",
    "symbol": "USDCAD",
    "entryPrice": 1.25064,
    "size": 0.13,
    "isAsian": false,
    "type": "SELL",
    "isOpen": true,
    accId: 2
  },
  {
    "name": "L4",
    "symbol": "USDCAD",
    "entryPrice": 1.25738,
    "size": 0.1,
    "isAsian": false,
    "type": "SELL",
    "isOpen": true,
    accId: 2
  }
]


async function seedTrades(app, table = 'trades') {
  for (trade of trades) {
    await app.service(table).create(trade)
  }
}

module.exports = function (app) {
  const options = {
    Model: createModel(app, seedTrades),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trades', new Trades(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trades');

  service.hooks(hooks);
};
