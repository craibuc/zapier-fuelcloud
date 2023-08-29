const perform = async (z, bundle) => {
  console.log('***** find_driver_by_pin.perform *****')

  const getData = async (page = 1) => {

    console.log(`***** getData(${page}) *****`)

    const options = {
      url: 'https://api.fuelcloud.com/rest/v1.0/driver',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: bundle.authData.sessionKey,
      },
      params: {
        'page[number]': page,
      },
    };
  
    return z.request(options).then((response) => {

      const results = response.json;
      return results

    });

  }

  let drivers = []
  let page = 1
  let proceed = false

  // const pin_to_find = bundle.inputData.pin.toString()

  do {

    const r = await getData(page);

    // filter the drivers node
    const driver = r.data.filter( d => d.pin === bundle.inputData.pin.toString() )
    // console.log('driver',driver)

    // if there was a matching PIN
    if (driver.length > 0) {
      
      // add to array
      drivers = drivers.concat(driver);

      // exit do/while
      break;
  
    }

    // enable another loop
    proceed = r.meta.next != null ? true : false

    // increment counter
    page+=1
  
  } while (proceed);
  
  return drivers;

};

module.exports = {
  key: 'find_driver_by_pin',
  noun: 'Driver',
  display: {
    label: 'Find Driver by PIN',
    description: 'Find a FuelCloud driver by its PIN',
    hidden: false,
  },
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'PIN',
        label: 'pin',
        type: 'integer',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      id: 123456,
      fullname: 'Last, First',
      full_name: 'Last, First',
      pin: '12345',
      phone: null,
      code: 'FL2345',
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
      self: 'https://api.fuelcloud.com/rest/v1.0/driver/123456',
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
