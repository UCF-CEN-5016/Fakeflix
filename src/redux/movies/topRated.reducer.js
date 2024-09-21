import { moviesActionTypes } from './movies.types';

/**
 * This file defines the reducer for managing the state of top-rated movies.
 * 
 * It listens to dispatched actions related to top-rated movies and updates the state accordingly.
 * The state flow works as follows:
 * 1. Actions are dispatched when an event occurs (e.g., a user requests to see top-rated movies).
 * 2. This reducer listens to those actions and updates the state based on the action type.
 * 3. The updated state is then used by components in the UI to render the new data.
 *
 * For example, when FETCH_TOP_RATED_MOVIES_SUCCESS is dispatched, 
 * the reducer updates the list of movies in the state, which is then displayed on the UI.
 *
 * The reducer handles loading states, successful fetches, errors, and pagination (loading more movies).
 */

/**
 * The initial state of the top-rated movies reducer.
 * @property {boolean} loading - Indicates if the top-rated movies are currently being fetched.
 * @property {string} error - Stores any error message when a request fails.
 * @property {Array} data - Contains the list of top-rated movies retrieved from the API.
 */
const initialState = {
    loading: false,
    error: '',
    data: []
}

/**
 * Reducer function that manages the state of top-rated movies based on the action type.
 * @param {Object} state - The current state of top-rated movies.
 * @param {Object} action - The action dispatched by Redux.
 * @param {string} action.type - The type of action being dispatched.
 * @param {any} action.payload - The data sent along with the action (e.g., movies data or error).
 * @returns {Object} The updated state of top-rated movies based on the dispatched action.
 */
const topRatedMoviesReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        // Handle the action for requesting top-rated movies. 
        // This sets `loading` to true to indicate that data is being fetched.
        case moviesActionTypes.FETCH_TOP_RATED_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }
        // Handle the success action where top-rated movies are fetched.
        // This updates the `data` array with the retrieved movies and resets `loading` and `error`.
        case moviesActionTypes.FETCH_TOP_RATED_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,
                loading: false,
                error: ''
            }
        // Handle the action for loading more movies (pagination). 
        // This appends additional movies to the existing `data` array.
        case moviesActionTypes.LOAD_MORE_TOP_RATED_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],
                loading: false,
                error: ''
            }
        // Handle the failure action when the request for top-rated movies fails.
        // This clears the `data` array and sets the error message in `error`.
        case moviesActionTypes.FETCH_TOP_RATED_MOVIES_FAILURE:
            return {
                ...state,
                data: [],
                loading: false,
                error: payload
            }
        // Return the current state by default if no action types match.
        default:
            return state;
    }
}

export default topRatedMoviesReducer;