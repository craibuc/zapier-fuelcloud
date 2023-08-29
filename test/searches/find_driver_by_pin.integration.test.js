const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

describe('Search - find_driver_by_pin', () => {

  it('should get an array', async () => {

    const bundle = {
      authData: {
        sessionKey: process.env.ACCESS_TOKEN,
      },
      inputData: {
        pin: 18262
      },
    };

    const results = await appTester(
      App.searches['find_driver_by_pin'].operation.perform,
      bundle
    );

    expect(results.length).toBe(1)
    expect(results[0]).toHaveProperty('id');
    expect(results[0]).toHaveProperty('pin');
    expect(results[0].pin).toBe(bundle.inputData.pin.toString());

  },(120 * 1000));
});
