const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

describe('Create - activate_driver', () => {
  
  it('should create an object', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },
      inputData: {
        id: 716627,
        full_name: 'Last, First',
        code: 'AA0000',
        phone: '111-222-3333',
        pin: 12345,
        status: 1
      },
    };

    const result = await appTester(
      App.creates['update_driver'].operation.perform,
      bundle
    );

    expect(result).toHaveProperty('id');

  });
});
