const { Service } = require('feathers-knex');

exports.Trades = class Trades extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'trades'
    });
  }
};
