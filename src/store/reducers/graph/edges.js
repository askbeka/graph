export const types = {
    UPDATE_EDGE: 'UPDATE_EDGE',
    REMOVE_EDGE: 'REMOVE_EDGE',
    ADD_EDGE: 'ADD_EDGE'
};

export default (state = [], action) => {
    switch(action.type) {
        case types.ADD_EDGE:
            return state.push(action.payload);
        case types.UPDATE_EDGE: {
            return state.map(node => node.id === action.payload.id ? action.payload : node);
        }
        case types.REMOVE_EDGE:
            return state.filter(node => node.id !== action.payload);
        default:
            return state;
    }
};
