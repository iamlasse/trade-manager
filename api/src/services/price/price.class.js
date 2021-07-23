const { Service } = require('feathers-knex');

exports.Price = class Price extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'price'
    });
  }
};
