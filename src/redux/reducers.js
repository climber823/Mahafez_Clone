import { combineReducers } from 'redux';
import { SELECT_ASSET, LOGIN, LOGOUT } from './actions';

const initialState = {
  selectedAsset: 'AUD/USD',
  isLoggedIn: false,
  userInfo: {},
  tableInfo: {},
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ASSET:
      return {
        ...state,
        selectedAsset: action.payload,
      };

    default:
      return state;
  }
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN:
      console.log(action.payload)
      return { 
        ...state, 
        isLoggedIn: true,
        userInfo: action.payload.user,
        tableInfo: action.payload.tableInfo,
      };
    case LOGOUT:
      return { 
        ...state, 
        isLoggedIn: false,
        userInfo: {},
        tableInfo: {},
      };
    default:
      return state;
  }
};


export default combineReducers({
  asset: assetReducer,
  auth: authReducer,
});
