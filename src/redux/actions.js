export const SELECT_ASSET = 'SELECT_ASSET';

export const selectAsset = (asset) => ({
  type: SELECT_ASSET,
  payload: asset,
});
