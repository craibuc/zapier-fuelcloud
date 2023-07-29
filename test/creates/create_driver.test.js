const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

describe('Create - create_driver', () => {

  it('should create an object', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
      },
      inputData: {
        full_name: 'Last, First',
        code: 'AA0000',
        phone: '111-222-3333',
        pin: 98765,
        status: 0
      },
    };

    const result = await appTester(
      App.creates['create_driver'].operation.perform,
      bundle
    );

    expect(result).toHaveProperty('id');
    
  });
});
