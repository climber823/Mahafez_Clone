import { combineReducers } from 'redux';
import { SELECT_ASSET, LOGIN, LOGOUT } from './actions';

const assetInitialState = {
  selectedAsset: 'AUD/USD',
  assetInfo: {},
  prevAssetInfo: {},
};

const authInitialState = {
  isLoggedIn: false,
  userInfo: {},
  tableInfo: {},
};

const assetReducer = (state = assetInitialState, action) => {
  switch (action.type) {
    case SELECT_ASSET:
      return {
        ...state,
        selectedAsset: action.payload.asset,
        prevAssetInfo: state.assetInfo.asset == action.payload.asset ? state.assetInfo : action.payload,
        assetInfo: action.payload,
      };

    default:
      return state;
  }
};

const authReducer = (state = authInitialState, action) => {

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
