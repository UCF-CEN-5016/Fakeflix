/*
    This file creates a reducer function named 'animationSeriesReducer' that changes the state of the data for the animation series.
    It imports 'seriesActionTypes' from './series.types', creates a construct for the initial state, and then cycles through the different cases to fetch data.
*/

import { seriesActionTypes } from './series.types';

/* 
This construct creates a variable holding the initial state of the reducer.
    loading: A boolean that determines whether data is being gathered
    error: A string that stores error messages if needed
    data: An array that holds the gathered data
*/
const initialState = {
    loading: false,
    error: '',
    data: []
}

/*
This is a reducer function that takes:
    - A variable 'state' that defaults to 'initialState' 
    - An object with a 'type' and 'payload' property
It then uses these to determine the new state based on the type and payload
*/
const animationSeriesReducer = (state = initialState, {type, payload}) => {
    // This determines what happened based on the received 'type' variable from the previous line
    switch (type) {
            /*
            When the type signifies that a fetch is being made, this case will:
                - Set the loading variable to true
            */
        case seriesActionTypes.FETCH_ANIMATION_SERIES_REQUEST:
            return {
                ...state,
                loading: true
            }
            /* 
            If a fetch is successful, this case will:
                - Update the data variable with the obtained data
                - Set the loading variable to false
                - Get rid of error messages if there are any
            */
        case seriesActionTypes.FETCH_ANIMATION_SERIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
            /*
            If there are more than one animation series, this case will:
                - Add the newly obtained data to the existing data
                - Set the loading variable to false
                - Get rid of error messages if there are any
            */
        case seriesActionTypes.LOAD_MORE_ANIMATION_SERIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
            /*
            If there is some failure when fetching the data, this case will:
                - Reset any data in the variable
                - Set the loading variable to false
                - Add an error message with the obtained payload variable
            */
        case seriesActionTypes.FETCH_ANIMATION_SERIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        // This default case returns the current state without modifying it
        default:
            return state;
    }
}

// This line exports the function above as the default export
export default animationSeriesReducer;
