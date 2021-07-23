/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app, cb = () => null) {
  const db = app.get('knexClient');
  const tableName = 'users';

  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('name')
        table.string('email').unique();
        table.string('password');


      })
        .then(() => console.log(`Created ${tableName} table`))
        .then(() => cb(app))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });

  return db;
};
