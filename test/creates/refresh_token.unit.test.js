const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

const nock = require('nock');

describe('Create - refresh_token', () => {

  it('should create an object', async () => {

    const bundle = {
      authData: {
        sessionKey: process.env.ACCESS_TOKEN,
      },
      inputData: {
        refreshToken: 'refresh-token',
      },
    };

    const response = {
        "access_token": "new-access-token",
        "type": "Bearer",
        "expires_in": 604800,
        "refresh_token": "new-refresh-token"
    }

    // mocks the next request that matches this url and body
    nock(`https://api.fuelcloud.com/rest/refresh-token`)
      .get(`/${ bundle.inputData.refreshToken }`)
      .reply(200, response);

    const result = await appTester(
      App.creates['refresh_token'].operation.perform,
      bundle
    );

    // console.log('result',result)

    expect(result).toHaveProperty('access_token');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('expires_in');
    expect(result).toHaveProperty('refresh_token');

  });

});
