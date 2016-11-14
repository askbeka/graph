export const types = {
    UPDATE_NODE: 'UPDATE_NODE',
    REMOVE_NODE: 'REMOVE_NODE',
    ADD_NODE: 'ADD_NODE'
};

export default (state = [], action) => {
    switch(action.type) {
        case types.ADD_NODE:
            return state.push(action.payload);
        case types.UPDATE_NODE: {
            return state.map(node => node.id === action.payload.id ? action.payload : node);
        }
        case types.REMOVE_NODE:
            return state.filter(node => node.id !== action.payload);
        default:
            return state;
    }
};

