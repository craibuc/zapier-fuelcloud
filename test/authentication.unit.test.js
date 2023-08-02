/*
.Example
npm test -- authentication

run the tests in this file.

.Example
nvm exec v18 npm test -- authentication

run the tests in this file using nvm (node version manager)
*/

const zapier = require('zapier-platform-core');
const App = require('../index');
const appTester = zapier.createAppTester(App);

// load .env
zapier.tools.env.inject();

// mocking
const nock = require('nock');

describe('authentication', () => {
  
  describe('perform', () => {

    describe('when a valid Storage Secret and Storage Key are supplied', () => {

      // arrange
      let bundle = {
        authData: {
          storage_secret: 'STORAGE_SECRET',
          storage_key: 'StorageKey',
        },
      };

      const response = {
        StorageKey: 'Storage Value'
      }

      // mocks the next request that matches this url and body
      nock(`https://store.zapier.com/api`)
        .get(`/records?key=${bundle.authData.storage_key}`)
        .reply(200, response);

      it('it returns a sessionKey', async () => {
    
        // act
        const result = await appTester(
          App.authentication.sessionConfig.perform,
          bundle
        );
  
        console.log('result',result)
        console.log('access_token',bundle.authData.access_token)
        
        // assert
        expect(result).toHaveProperty('sessionKey');
        expect(bundle.authData.access_token).not.toBeNull();
    
      });

    });

    describe('when a valid Storage Secret, Storage Key, and Storage Child Key are supplied', () => {

      // arrange
      let bundle = {
        authData: {
          storage_secret: 'STORAGE_SECRET',
          storage_key: 'StorageKey',
          storage_child_key: 'StorageChildKey'
        },
      };
      
      const response = {
        StorageKey: {
          StorageChildKey: 'Storage Value'
        }
      }

      // mocks the next request that matches this url and body
      nock(`https://store.zapier.com/api`)
        .get(`/records?key=${bundle.authData.storage_key}`)
        .reply(200, response);

      it('it returns a sessionKey', async () => {
    
        // act
        const result = await appTester(
          App.authentication.sessionConfig.perform,
          bundle
        );
  
        console.log('result',result)
        console.log('access_token',bundle.authData.access_token)

        // assert
        expect(result).toHaveProperty('sessionKey');
        expect(result.sessionKey).not.toBeNull();

        expect(bundle.authData.access_token).not.toBeNull();
    
      });

    });

    describe.skip('when a invalid Storage Secret and Storage Key are supplied', () => {

      it('throws an error', async () => {

        // arrange
        bundle = {
          authData: {
            storage_secret: 'Invalid Secret',
            storage_key: 'Invalid Key',
          }
        };
      
        // act/assert
        await expect(appTester(
            App.authentication.sessionConfig.perform,
            bundle
        )).rejects.toThrow();

      });
  
    });

  });

  describe.skip('test', () => {
  
    // arrange
    let bundle = {
      authData: {
        sessionKey: process.env.ACCESS_TOKEN,
      },
    };

    describe('when the Access Token is valid', () => {

      it('returns a list of timezones', async () => {
    
        // act
        const results = await appTester(
          App.authentication.test,
          bundle
        );
  
        // assert
        expect(results.length).toBeGreaterThan(0)
    
      });
  
    });

    describe('when the Access Token is invalid', () => {

      it('throws an error', async () => {

        // arrange
        bundle = {
          authData: {
            access_token: 'Invalid Token',
          }
        };
      
        // act/assert
        await expect(appTester(
            App.authentication.test,
            bundle
        )).rejects.toThrow();

      });
  
    });

  });

});
