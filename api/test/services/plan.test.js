const app = require('../../src/app');

describe('\'plan\' service', () => {
  it('registered the service', () => {
    const service = app.service('plan');
    expect(service).toBeTruthy();
  });
});
