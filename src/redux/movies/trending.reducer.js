import { moviesActionTypes } from './movies.types';

/**
 * This file contains the reducer for managing a state. This case being, trending movies in the application.
 * It handles tasks such as: fetching, success, failure, and loading of trending movies.
 * This reducer listens for specific action types dispatched in order to update the application's state accordingly.
 */



/**
 * Initial state of trending movies.
 * @property {boolean} loading - This indicates whether the trending movies are being fetched or not.
 * @property {string} error - This stores the error message incase the fetch fails.
 * @property {Array} data - This stores the list of trending movies.
 */
const initialState = {
    loading: false,
    error: '',
    data: []
}

/**
 * Reducer function to handle trending movies' state.
 * It listens for various action types to update the state of trending movies.
 *
 * @param {Object} state - The current state of trending movies.
 * @param {Object} action - The action object containing the type and payload.
 * @param {string} action.type - The type of the action dispatched.
 * @param {Object} action.payload - The data associated with the action.
 * @returns {Object} The updated state based on the action type.
 */
const trendingMoviesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // When a request to fetch trending movies is made, set loading to true
        case moviesActionTypes.FETCH_TRENDING_MOVIES_REQUEST:
            return {
                ...state,
                loading: true
            }

        // When fetching trending movies is successful, update the state with the new data
        case moviesActionTypes.FETCH_TRENDING_MOVIES_SUCCESS:
            return {
                ...state,
                data: payload,  // Payload contains the list of trending movies
                loading: false,
                error: ''       // Clear any previous errors
            }

        // When more trending movies are loaded, append them to the existing data
        case moviesActionTypes.LOAD_MORE_TRENDING_MOVIES_SUCCESS:
            return {
                ...state,
                data: [...state.data, ...payload],  // Concatenate old and new movie data
                loading: false,
                error: ''
            }

        // If fetching trending movies fails, set the error message and reset the data
        case moviesActionTypes.FETCH_TRENDING_MOVIES_FAILURE:
            return {
                ...state,
                data: [],      // Clear the data in case of failure
                loading: false,
                error: payload // Payload contains the error message
            }

        // Default case returns the current state if no action type matches
        default:
            return state;
    }
}

export default trendingMoviesReducer;