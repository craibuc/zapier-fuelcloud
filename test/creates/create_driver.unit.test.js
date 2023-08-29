const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

// mocking
const nock = require('nock');

describe('Create - create_driver', () => {

  describe('when valid data is supplied', () => {

    it('should create an object', async () => {

      const bundle = {
        authData: {
          sessionKey: 'abcdefghijklmnopqrstuvwxyz',
        },
        inputData: {
          full_name: 'Last, First',
          code: 'FL1234',
          phone: '123-456-7890',
          pin: 12345,
          status: 1
        },
      };

      const response = {
        "data": [
            {
                "id": 123456,
                "fullname": "Last, first",
                "full_name": "Last, first",
                "code": "FL1234",
                "phone": "612-555-1212",
                "pin": "12345",
                "status": 1,
                "schedule": {},
                "all_tanks": true,
                "tanks": [],
                "all_vehicles": true,
                "vehicles": [],
                "self": "https://api.fuelcloud.com/rest/v1.0/driver/123456",
                "created": "2023-02-22 18:28:09",
                "updated": "2023-07-29 14:37:34",
                "limits": null,
                "accumulated": null,
                "custom_data_field": [],
                "access_groups": []
            }
        ],
        "meta": {
            "previous": null,
            "total": 1,
            "per_page": 50,
            "next": null
        }
    }

      // mocks the next request that matches this url and body
      nock(`https://api.fuelcloud.com/rest/v1.0`)
        .post('/driver')
        .reply(200, response);

      const result = await appTester(
        App.creates['create_driver'].operation.perform,
        bundle
      );
  
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('code');
      expect(result.code).toBe(bundle.inputData.code);

    });

  });

});
