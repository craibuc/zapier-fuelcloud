const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

describe('Search - find_drivers', () => {

  it('should get an array', async () => {
    const bundle = {
      authData: {
        sessionKey: process.env.ACCESS_TOKEN,
      },
      inputData: {
        code: 'AA0000'
      },
    };

    const results = await appTester(
      App.searches['find_driver'].operation.perform,
      bundle
    );

    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toHaveProperty('id');

  },(20*1000));

});
