// Initializes the `price` service on path `/price`
const { Price } = require('./price.class');
const createModel = require('../../models/price.model');
const hooks = require('./price.hooks');

const prices = [
  {
    "symbol": "EURJPY",
    "current": 129.477
  },
  {
    "symbol": "GBPAUD",
    "current": 1.86149
  },
  {
    "symbol": "USDJPY",
    "current": 109.833
  },
  {
    "symbol": "USDCHF",
    "current": 0.92260
  },
  {
    "symbol": "USDCAD",
    "current": 1.27034
  },
  {
    "symbol": "EURUSD",
    "current": 1.17551
  },
  {
    "symbol": "GBPJPY",
    "current": 149.789
  }
]

async function seedPrices(app, table = 'price') {
  for (price of prices) {
    await app.service(table).create(price)
  }
}

module.exports = function (app) {
  const options = {
    Model: createModel(app, seedPrices),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/price', new Price(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('price');

  service.hooks(hooks);
};
