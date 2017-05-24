import fetch from 'isomorphic-fetch';

export const CALL_API = 'CALL_API';

const callApi = async (endpoint, requestOptions) => {
  try {
    const response = await fetch(`http://localhost:3002/${endpoint}`, requestOptions);
    if(response.ok) {
      return response.json();
    } else {
      return response.json().then(error => {
        throw new Error(error.errors[0].message);
      });
    }
  } catch(err) {
    throw new Error(err);
  }
};

export default store => next => async action => {
  const callAPI = action[CALL_API];
  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  const {types, requestOptions = {}} = callAPI;
  let {endpoint} = callAPI;

  if(typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if(typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if(!types.every(type => typeof type === 'string')) {
    throw Error('Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = types;
  next({type: requestType});
  try {
    const response = await callApi(endpoint, requestOptions);
    next({type: successType, response});
  } catch(error) {
    next({type: failureType, error: error.message || 'Something bad happened!'});
  }
};
