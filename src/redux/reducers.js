import { combineReducers } from 'redux';
import { SELECT_ASSET } from './actions';

const initialState = {
  selectedAsset: 'EUR/USD',
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

export default combineReducers({
  asset: assetReducer,
});
