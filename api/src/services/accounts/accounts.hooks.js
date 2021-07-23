const { authenticate } = require('@feathersjs/authentication').hooks;
// const { populateTrades } = require('../../hooks/populateTrades')

const populateTrades = require('../../hooks/populate-trades');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populateTrades()],
    get: [populateTrades()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
