export const SELECT_ASSET = 'SELECT_ASSET';
export const LOGIN        = 'LOGIN';
export const LOGOUT       = 'LOGOUT';

export const selectAsset = (asset) => ({
  type: SELECT_ASSET,
  payload: asset,
});

// store.js (add this at the top)
export const login = () => ({ type: LOGIN });
