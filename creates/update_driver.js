const perform = async (z, bundle) => {

  const options = {
    url: `https://api.fuelcloud.com/rest/v1.0/driver/${bundle.inputData.id}`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.sessionKey,
    },
    body: {
      full_name: bundle.inputData.full_name,
      code: bundle.inputData.code,
      phone: bundle.inputData.phone,
      pin: bundle.inputData.pin,
      status: bundle.inputData.status,
    },
  };

  return z.request(options).then((response) => {

    const results = response.json;
    return results.data[0];

  });
};

module.exports = {
  key: 'update_driver',
  noun: 'Driver',
  display: {
    label: 'Update Driver',
    description: 'Updates a driver.',
    hidden: false,
  },
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'id',
        label: 'Driver Id',
        type: 'integer',
        helpText:
          'The auto-increment, primary-key assigned to the driver record by FuelCloud.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'full_name',
        label: 'Full Name',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'code',
        label: 'Code',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'phone',
        label: 'Phone',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'pin',
        label: 'PIN',
        type: 'integer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'integer',
        default: 'Enabled',
        helpText: 'Enabled or disabled.',
        choices: [
          { sample: '0', value: '0', label: 'Disabled' },
          { sample: '1', value: '1', label: 'Enabled' },
        ],
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 675108,
      full_name: 'Craig B',
      pin: '12345',
      phone: '612-555-1212',
      code: 'cb2215',
      status: 0,
      all_tanks: true,
      all_vehicles: true,
      created: '2023-02-20 16:13:09',
      updated: '2023-02-20 16:21:05',
    },
    outputFields: [
      { key: 'id', type: 'integer' },
      { key: 'full_name' },
      { key: 'pin', type: 'integer' },
      { key: 'phone' },
      { key: 'code' },
      { key: 'status', type: 'integer' },
      { key: 'all_tanks', type: 'boolean' },
      { key: 'all_vehicles', type: 'boolean' },
      { key: 'created', type: 'datetime' },
      { key: 'updated', type: 'datetime' },
    ],
  },
};
