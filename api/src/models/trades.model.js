/* eslint-disable no-console */

const { default: knex } = require("knex");

// Trades-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app, cb = () => null) {
  const db = app.get('knexClient');
  const tableName = 'trades';
  db.schema.hasTable(tableName).then(exists => {
    db.schema.dropTable(tableName)
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.integer('accId');
        table.integer('tradeId');
        table.string('name').defaultTo('L1');
        table.string('symbol');
        table.float('entryPrice')
        table.enu('type', ['BUY', 'SELL'])
        table.float('size')
        table.boolean('isAsian')
        table.boolean('isOpen')
        table.timestamp('createdAt').defaultTo(Date.now())

      })
        .then(() => {
          console.log(`Created ${tableName} table`)
          cb(app)
        })
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};
