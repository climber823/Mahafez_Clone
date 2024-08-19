export const SELECT_ASSET = 'SELECT_ASSET';
export const LOGIN        = 'LOGIN';
export const LOGOUT       = 'LOGOUT';

export const selectAsset = (data) => {
  return {
    type: SELECT_ASSET,
    payload: data,
  }
};

// store.js (add this at the top)
// export const login = () => ({ type: LOGIN });
export const login = (user, tableInfo) => {
  return { 
    type: LOGIN ,
    payload: {
      user,
      tableInfo,
    }
  }
}

// store.js (add this at the top)
export const logout = () => ({ type: LOGOUT });

