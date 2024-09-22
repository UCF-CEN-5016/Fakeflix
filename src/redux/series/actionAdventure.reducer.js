/*
    this file's functionality is associated with fetching the list of action
    and adventure movies to display in a row of the FakeFlix TV Series page
    to the user.

    the file imports various series action types to identify the state of
    the fetch request and display a list of movies accordingly or, in the
    case of a failure, return the resulting error.
*/
import { seriesActionTypes } from './series.types';

// initial state before fetch request
const initialState = {
    loading: false,
    error: '',
    data: []
}

/* 
    this function handles the various states associated with fetching the list of
    action and adventure movies. it sets attributes associated with the state depending
    on the type of series action (request, success, load more success, or failure).

    this function modifies the following attributes and returns the state accordingly:
        loading: whether or not fetching the movies is still in progress
        data: either the movie list or error resulting from the request
        error: any error that happens upon failure
*/
const actionAdventureSeriesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case seriesActionTypes.FETCH_ACTIONADVENTURE_SERIES_REQUEST:
            return {
                ...state, // return state with the following modifications
                loading: true // set loading to true while making request
            }
        case seriesActionTypes.FETCH_ACTIONADVENTURE_SERIES_SUCCESS:
            return {
                ...state, // return state with the following modifications
                data: payload, // return payload list of series
                loading: false, // cease loading
                error: '' // complete without errors
            }
        case seriesActionTypes.LOAD_MORE_ACTIONADVENTURE_SERIES_SUCCESS:
            return {
                ...state, // return state with the following modifications
                data: [...state.data, ...payload], // add additional series payload to existing data
                loading: false, // cease loading
                error: '' // complete without errors
            }
        case seriesActionTypes.FETCH_ACTIONADVENTURE_SERIES_FAILURE:
            return {
                ...state, // return state with the following modifications
                data: [], // no data - unsuccessful fetch
                loading: false, // cease loading
                error: payload // set error to payload
            }
        default:
            return state; // return initial state unmodified
    }
}

export default actionAdventureSeriesReducer;