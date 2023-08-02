const authentication = require('./authentication');

const createDriverCreate = require('./creates/create_driver.js');
const refreshTokenCreate = require('./creates/refresh_token.js');
const updateDriverCreate = require('./creates/update_driver.js');

const findDriversSearch = require('./searches/find_driver.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createDriverCreate.key]: createDriverCreate,
    [refreshTokenCreate.key]: refreshTokenCreate,
    [updateDriverCreate.key]: updateDriverCreate,
  },
  searches: { [findDriversSearch.key]: findDriversSearch },
  searchOrCreates: {
    [findDriversSearch.key]: {
      // The key must match the search
      key: findDriversSearch.key, // same as above
      create: createDriverCreate.key,
      display: {
        // The label shows up when the search-or-create checkbox is checked.
        // See https://cdn.zappy.app/5fc31d104c6bd0050c44510557b3b98f.png
        label: 'Find a Driver in FuelCloud',
        description: 'ignored',
      },
      search: findDriversSearch.key,
    },
  },
};
