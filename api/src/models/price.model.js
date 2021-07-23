// price-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app, cb = () => null) {
  const db = app.get('knexClient');
  const tableName = 'price';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id');
        table.string('symbol');
        table.float('current');
      })
        .then(() => {
          cb(app)
          console.log(`Created ${tableName} table`)
        })
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};
