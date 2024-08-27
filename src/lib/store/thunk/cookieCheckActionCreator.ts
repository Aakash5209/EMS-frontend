import Interceptor from "../axios/axios";


const initialState = {
  data: null,
  loading: false,
  error: null,
};


// Generic API utility function
export const apiRequest = (method, url, data = null) => {
  console.log(method, url, data);
  return Interceptor({
    method,
    url,
    data
  });
};


export const requestAction = (type) => () => ({
  type,
});

export const successAction = (type) => (data) => ({
  type,
  payload: data,
});

export const failureAction = (type) => (error) => ({
  type,
  payload: error,
});



export const createCookieCheckAPIThunk = (requestType, successType, failureType) => {
  return (method, url, data = null) => {
    return (dispatch) => {
      const request = requestAction(requestType);
      const success = successAction(successType);
      const failure = failureAction(failureType);

      dispatch(request());

      return apiRequest(method, url, data)
        .then((response) => {
          dispatch(success(response.data));
        })
        .catch((error) => {
          dispatch(failure(error.message));
        });
    };
  };
}



export const cookieCheckreq = 'cookieCheckreq';
export const cookieChecksuccess = 'cookieChecksuccess';
export const cookieCheckfail = 'cookieCheckfail';


const cookieCheckApiReducerRedux = (state = initialState, action) => {
  switch (action.type) {
    case cookieCheckreq:
      return {
        ...state,
        loading: true,
        error: null
      };

    case cookieChecksuccess:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case cookieCheckfail:
      return {
        ...state,
        loading: false,
        error: action.payload
      };


    default:
      return state;
  }
};

export default cookieCheckApiReducerRedux;
