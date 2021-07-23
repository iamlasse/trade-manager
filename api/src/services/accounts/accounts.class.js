const { Service } = require('feathers-knex');

exports.Accounts = class Accounts extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'accounts'
    });

  }
};
