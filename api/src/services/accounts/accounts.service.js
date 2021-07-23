// Initializes the `Accounts` service on path `/accounts`
const { Accounts } = require('./accounts.class');
const createModel = require('../../models/accounts.model');
const hooks = require('./accounts.hooks');


async function seedAccounts(app, table = 'accounts',) {
  const accounts = [{
    name: 'EEB',
    currency: 'EUR',
  }, {
    name: 'Coherent',
    currency: 'USD',
  }]

  for (account of accounts) {
    await app.service(table).create(account)
  }
}

module.exports = function (app) {
  const options = {
    Model: createModel(app, seedAccounts),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/accounts', new Accounts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('accounts');

  service.hooks(hooks);
};
