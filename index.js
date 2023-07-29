const authentication = require('./authentication');

const createDriverCreate = require('./creates/create_driver.js');
const updateDriverCreate = require('./creates/update_driver.js');
const findDriversSearch = require('./searches/find_driver.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  creates: {
    [createDriverCreate.key]: createDriverCreate,
    [updateDriverCreate.key]: updateDriverCreate,
  },
  searches: { [findDriversSearch.key]: findDriversSearch },
  searchOrCreates: {
    find_drivers: {
      create: 'create_driver',
      display: {
        description: 'Find a Driver in FuelCloud',
        label: 'Find or Create Driver',
      },
      key: 'find_driver',
      search: 'find_driver',
    },
  },
};
