/* eslint-disable no-console */

// Accounts-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app, cb = () => null) {
  const db = app.get('knexClient');
  const tableName = 'accounts';
  db.schema.hasTable(tableName).then(exists => {
    db.schema.dropTable(tableName)
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name');
        table.string('currency');
      })
        .then(() => {
          console.log(`Created ${tableName} table`)
          cb(app, tableName)
        })
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};
