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

describe('authentication', () => {
  
  describe('perform', () => {

    // arrange
    let bundle = {
      authData: {
        storage_secret: process.env.STORAGE_SECRET,
        storage_key: process.env.STORAGE_KEY,
      },
    };

    describe('when a valid Storage Secret and Storage Key are supplied', () => {

      it('it returns a sessionKey', async () => {
    
        // act
        const result = await appTester(
          App.authentication.sessionConfig.perform,
          bundle
        );
  
        console.log('result',result)

        // assert
        expect(result).toHaveProperty('sessionKey');
        expect(result.sessionKey).not.toBeNull();
        expect(bundle.authData.access_token).not.toBeNull();
    
      });

    });

    describe('when a valid Storage Secret, Storage Key, and Storage Child Key are supplied', () => {

      it('it returns a sessionKey', async () => {
    
        // arrange
        bundle.authData.storage_child_key = process.env.STORAGE_CHILD_KEY

        // act
        const result = await appTester(
          App.authentication.sessionConfig.perform,
          bundle
        );
  
        console.log('result',result)
        
        // assert
        expect(result).toHaveProperty('sessionKey');
        expect(result.sessionKey).not.toBeNull();
        expect(bundle.authData.access_token).not.toBeNull();
    
      });

    });

    describe('when a invalid Storage Secret and Storage Key are supplied', () => {

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

  describe('test', () => {
  
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
