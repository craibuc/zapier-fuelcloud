const perform = async (z, bundle) => {

  const options = {
    url: 'https://api.fuelcloud.com/rest/v1.0/driver',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.access_token,
    },
    params: {
      'filter[code]': bundle.inputData.Code,
    },
  };

  return z.request(options).then((response) => {
  
    const results = response.json;
    return results.data;

  });
};

module.exports = {
  key: 'find_driver',
  noun: 'Driver',
  display: {
    label: 'Find Driver',
    description: 'Find a FuelCloud driver',
    hidden: false,
  },
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'Code',
        label: 'Code',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 404124,
      fullname: 'Weidner, Jason',
      full_name: 'Weidner, Jason',
      pin: '19672',
      phone: null,
      code: 'JW9672',
      status: 0,
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
      self: 'https://api.fuelcloud.com/rest/v1.0/driver/404124',
      created: '2018-11-02 16:01:59',
      updated: '2020-11-03 14:43:42',
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
      { key: 'id' },
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
