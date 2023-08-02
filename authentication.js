const perform = async (z, bundle) => {

  const options = {
    url: 'https://store.zapier.com/api/records?key={{bundle.authData.storage_key}}',
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'X-Secret': bundle.authData.storage_secret
    },
  }

  return z.request(options).then((response) => {

    const results = response.json;

    const access_token = bundle.authData.storage_child_key ? results[bundle.authData.storage_key][bundle.authData.storage_child_key] : results[bundle.authData.storage_key]
    bundle.authData.access_token = access_token

    return {
      'sessionKey': access_token
    };

  });

};

const test = async (z, bundle) => {

  const options = {
    url: 'https://api.fuelcloud.com/rest/v1.0/timezones',
    method: 'GET',
    headers: {
      Authorization: bundle.authData.sessionKey,
    },
  };

  // z.console.log('options',options)

  return z.request(options).then((response) => {

    const results = response.json;
    // z.console.log('results',results)
    return results.data;

  });

};

module.exports = {
  type: 'session',
  sessionConfig: {
    perform: perform,
  },
  test: test,
  fields: [
    {
      key: 'storage_secret',
      label: 'Storage Secret',
      type: 'password',
      required: true,
      helpText: "The secret that was used when creating the 'Storage by Zapier' connection.",
      computed: false,
    },
    {
      key: 'storage_key',
      label: 'Storage Key',
      type: 'string',
      required: true,
      helpText: 'The name of the storage key that contains the Access Token.',
      computed: false,
    },
    {
      key: 'storage_child_key',
      label: 'Storage Child Key',
      type: 'string',
      required: false,
      helpText: 'The optional name of the subkey that contains the Access Token.',
      computed: false,
    },
  ],
  connectionLabel: '',
};
