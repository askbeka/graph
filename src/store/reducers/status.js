export const types = {
    UPDATE_STATUS: 'UPDATE_STATUS'
};

export default (state = 'idle', action) => (
    action.type === types.UPDATE_STATUS ? action.payload : state
);
