export const types = {
    SELECT_ITEM: 'SELECT_ITEM'
};

export default (state = null, {type, payload}) => (type === types.SELECT_ITEM ?  payload : state);
