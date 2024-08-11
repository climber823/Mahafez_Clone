import { combineReducers } from 'redux';
import { SELECT_ASSET, LOGIN, LOGOUT } from './actions';

const initialState = {
  selectedAsset: 'AUD/USD',
  isLoggedIn: true,
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
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};


export default combineReducers({
  asset: assetReducer,
  auth: authReducer,
});
