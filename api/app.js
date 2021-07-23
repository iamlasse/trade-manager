const feathers = require('@feathersjs/feathers');
const socketio = require("@feathersjs/socketio");
const { populateTrades } = require("./hooks/populateTrades");
const { trades } = require('./static')

const app = feathers();
app.configure(socketio({
  pingInterval: 10000,
  pingTimeout: 50000
}));
app.listen(3030)
// A trades service that allows to create new
// and return all existing trades
class TradesService {
  constructor() {
    this.trades = [];
  }

  async find() {
    // Just return all our trades
    return this.trades;
  }

  async getForAccount(accId) {
    return this.trades.filter(t => t.accId === accId)
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the trades length since it changes whenever we add one
    const message = {
      id: this.trades.length,
      ...data
    }

    // Add new message to the list
    this.trades.push(message);

    return message;
  }
}

class AccountsService {
  constructor(app) {
    this.accounts = []
    this.app = app
  }

  async find() {
    return this.accounts
  }

  async get(id) {
    return this.accounts.find(a => a.id === id)
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the trades length since it changes whenever we add one
    const account = {
      id: this.accounts.length,
      ...data
    }

    // Add new message to the list
    this.accounts.push(account);

    return account;
  }
}

// Register the message service on the Feathers application
app.use('trades', new TradesService(app));
app.use('accounts', new AccountsService(app))

app.service('accounts').hooks({
  after: {
    get: [populateTrades],
    find: [populateTrades]
  }
})


// Log every time a new message has been created
app.service('trades').on('created', message => {
  // console.log('A new trade has been created', message);
});
app.service('accounts').on('created', acc => {
  console.log('A new account has been created', acc);
});

// A function that creates new trades and then logs
// all existing trades
const seed = async () => {

  await app.service('accounts').create({
    name: 'EEB',
    currency: 'EUR',
  })

  await app.service('accounts').create({
    name: 'Coherent',
    currency: 'USD',
  })

  for (trade of trades) {
    await app.service('trades').create(trade);
  }



  // Find all existing trades
  const accounts = await app.service('accounts').find();

  console.log('All accounts', accounts);
};

app.listen(3001)
seed()