export const START_LOADING = 'my-project/LOADING/START';
export const END_LOADING = 'my-project/LOADING/END';

export default function reducer(state = true, action) {
    switch (action.type) {
        case START_LOADING: {
            return action.payload;
        }
        case END_LOADING: {
            return action.payload;
        }
        default:
            return state;
    }
}

export const startLoading = () => {
    return { type: START_LOADING, payload: true };
};

export const endLoading = () => {
    return { type: END_LOADING, payload: false };
};