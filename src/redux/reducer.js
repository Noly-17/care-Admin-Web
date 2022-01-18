

const initialState = {
    lat: 15.792254,
    lng: 481.345361
};

function rootReducer(state = initialState, action) {
    const newState = { ...state }
    if (action.type == 'LONGLAT') {

        console.log('LONGLAT')

    }
    return newState;
};

export default rootReducer;