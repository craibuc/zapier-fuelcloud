const perform = async (z, bundle) => {

    const options = {
      url: `https://api.fuelcloud.com/rest/refresh-token/${bundle.inputData.refreshToken}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: bundle.authData.sessionKey,
      },
    };
  
    return z.request(options).then((response) => {
  
      const results = response.json;
      return results;
  
    });

  };
  
  module.exports = {
    key: 'refresh_token',
    noun: 'Token',
    display: {
      label: 'Refresh Token',
      description: 'Retrieve a new access and refresh token.',
      hidden: false,
    },
    operation: {
      perform: perform,
      inputFields: [],
      sample: {
        access_token: "new-access-token",
        type: "Bearer",
        expires_in: 604800,
        refresh_token: "new-refresh-token"
      },
      outputFields: [
        { key: 'access_token', type: 'string' },
        { key: 'type', type: 'string' },
        { key: 'expires_in', type: 'integer' },
        { key: 'refresh_token', type: 'string' },
      ],
    },
  };
  