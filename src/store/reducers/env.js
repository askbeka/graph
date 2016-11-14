export const types = {
    SELECT_ENV: 'SELECT_ENV'
};

export default (state = null, {type, payload}) => (type === types.SELECT_ENV ?  payload : state);
