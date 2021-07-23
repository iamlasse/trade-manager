const app = require('../../src/app');

describe('\'Trades\' service', () => {
  it('registered the service', () => {
    const service = app.service('trades');
    expect(service).toBeTruthy();
  });
});
