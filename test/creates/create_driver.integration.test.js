const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

describe('Create - create_driver', () => {

  describe('when valid data is supplied', () => {

    it('should create an object', async () => {

      const bundle = {
        authData: {
          sessionKey: process.env.ACCESS_TOKEN,
        },
        inputData: {
          full_name: 'Last, First',
          code: 'FL1234',
          phone: '111-222-3333',
          pin: 12345,
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

});
