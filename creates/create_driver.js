const perform = async (z, bundle) => {

  const options = {
    url: 'https://api.fuelcloud.com/rest/v1.0/driver',
    method: 'POST',
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
    },
  };

  return z.request(options).then((response) => {

    const results = response.json;
    return results.data[0];

  });

};

module.exports = {
  key: 'create_driver',
  noun: 'Driver',
  display: {
    label: 'Create Driver',
    description: 'Creates a driver.',
    hidden: false,
  },
  operation: {
    inputFields: [
      {
        key: 'full_name',
        label: 'Full Name',
        type: 'string',
        required: true,
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
    ],
    sample: {
      id: 675108,
      fullname: 'Craig B',
      full_name: 'Craig B',
      pin: '12345',
      phone: '612-555-1212',
      code: 'cb2215',
      status: 1,
      schedule: {
        mon: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
        tue: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
        wed: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
        thu: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
        fri: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
        sat: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
        sun: {
          start_hour: '',
          start_min: '',
          start_meridiem: 'am',
          end_hour: '',
          end_min: '00',
          end_meridiem: 'am',
          status: 1,
          all: 1,
        },
      },
      all_tanks: true,
      tanks: [],
      all_vehicles: true,
      vehicles: [],
      self: 'https://api.fuelcloud.com/rest/v1.0/driver/675108',
      created: '2023-02-20 16:13:09',
      updated: '2023-02-20 16:13:09',
      limits: null,
      accumulated: null,
      custom_data_field: [
        { id: 4, label: null, value: null },
        { id: 5, label: null, value: null },
        { id: 6, label: null, value: null },
        { id: 7, label: null, value: null },
      ],
      access_groups: [],
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
    perform: perform,
  },
};
