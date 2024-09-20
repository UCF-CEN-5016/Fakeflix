import { seriesActionTypes } from './series.types';

// This file defines a Redux reducer called `kidsSeriesReducer` that handles the state management
// for kids' series in the Fakeflix application. 
// 
// The reducer manages the following states:
// - `loading`: indicates whether data is currently being fetched.
// - `error`: stores error messages, if any occur during data fetching.
// - `data`: an array that holds the kids' series data.
//
// It responds to the following action types from `seriesActionTypes`:
// 1. `FETCH_KIDS_SERIES_REQUEST`: Sets `loading` to true when a request is initiated.
// 2. `FETCH_KIDS_SERIES_SUCCESS`: Updates the `data` with the fetched kids' series and stops loading.
// 3. `LOAD_MORE_KIDS_SERIES_SUCCESS`: Appends more kids' series to the existing data array.
// 4. `FETCH_KIDS_SERIES_FAILURE`: Clears the `data`, sets `loading` to false, and stores the error message.
//
// The reducer returns a new state based on the action dispatched or the initial state by default.

const initialState = {
    loading: false,
    error: '',
    data: []
}

const kidsSeriesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case seriesActionTypes.FETCH_KIDS_SERIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case seriesActionTypes.FETCH_KIDS_SERIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        case seriesActionTypes.LOAD_MORE_KIDS_SERIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        case seriesActionTypes.FETCH_KIDS_SERIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default kidsSeriesReducer;