const zapier = require('zapier-platform-core');
const App = require('../../index');
const appTester = zapier.createAppTester(App);

zapier.tools.env.inject();

// mocking
const nock = require('nock');

describe('Search - find_driver_by_pin', () => {

  const page0 = {
    "data": [
        {
            "id": 123456,
            "fullname": "Last, first",
            "full_name": "Last, first",
            "code": "FL1111",
            "phone": "111-222-3333",
            "pin": "11111",
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
        },
    ],
    "meta": {
        "previous": null,
        "total": 2,
        "per_page": 1,
        "next": "https://api.fuelcloud.com/rest/v1.0/driver?page[number]=2"
    }
  }

  const page1 = {
    "data": [
        {
          "id": 234567,
          "fullname": "Doe, John",
          "full_name": "Doe, John",
          "code": "JD2222",
          "phone": "222-333-4444",
          "pin": "12222",
          "status": 1,
          "schedule": {},
          "all_tanks": true,
          "tanks": [],
          "all_vehicles": true,
          "vehicles": [],
          "self": "https://api.fuelcloud.com/rest/v1.0/driver/234567",
          "created": "2023-02-22 18:28:09",
          "updated": "2023-07-29 14:37:34",
          "limits": null,
          "accumulated": null,
          "custom_data_field": [],
          "access_groups": []
      }
    ],
    "meta": {
        "previous": "https://api.fuelcloud.com/rest/v1.0/driver?page[number]=1",
        "total": 2,
        "per_page": 1,
        "next": null
    }
  }

  beforeEach(() => {

    // mocks the next request that matches this url and body
    nock(`https://api.fuelcloud.com/rest/v1.0`)
      .get('/driver?page[number]=1')
      .reply(200, page0);

    // mocks the next request that matches this url and body
    nock(`https://api.fuelcloud.com/rest/v1.0`)
      .get('/driver?page[number]=2')
      .reply(200, page1);

  });

  describe('when a valid PIN is supplied', () => {

    it('returns an array that contains a single driver', async () => {

      const bundle = {
        authData: {
          sessionKey: 'abcdeefghijklmnopqrstuvwxyz',
        },
        inputData: {
          pin: 12222
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
  
    });

  });

  describe('when an invalid PIN is supplied', () => {

    it('returns an empty array', async () => {

      const bundle = {
        authData: {
          sessionKey: 'abcdeefghijklmnopqrstuvwxyz',
        },
        inputData: {
          pin: 12345
        },
      };

      const results = await appTester(
        App.searches['find_driver_by_pin'].operation.perform,
        bundle
      );
  
      expect(results.length).toBe(0)

    })

  });

});
