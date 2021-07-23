const users = require('./users/users.service.js');
const accounts = require('./accounts/accounts.service.js');
const trades = require('./trades/trades.service.js');
const price = require('./price/price.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(accounts);
  app.configure(trades);
  app.configure(price);
  console.log(`services configured`)
};
