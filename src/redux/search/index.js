// Defines the searchReducer function to be used in search fields
// Handles the state for search actions
// Takes a search action and handles Input Changes, Input Clears, Requesting Results, Indicating whether the Request Succeeded or Failed
import { searchActionTypes } from "./search.types";

// Initializes the state of the search with default values to set up searchReducer
const initialState = {
	searchResults: [],
	inputValue: '',
	error: null,
	isLoading: false
}

// Takes the initial state and a given action to determine what to return for the search state
const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		// Search Input Changes
		case searchActionTypes.CHANGE_SEARCH_INPUT_VALUE:
			return {
				...state,	// Load current values of state
				inputValue: action.payload	// Update input with action data
			}
		// Search Input Cleared
		case searchActionTypes.CLEAR_SEARCH_INPUT_VALUE:
			return {
				...state,	// Load current values of state
				inputValue: ''	// Clear input 
			}
		// Fetching Search Results
		case searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST:
			return {
				...state,	// Load current values of state
				isLoading: true	// Indicate the search is loading
			}
		// Fetch Search Success
		case searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS:
			return {
				...state,	// Load current values of state
				searchResults: [...action.payload],	// Set search results with action data
				error: false,	// Indicate lack of error
				isLoading: false	// Indicate the process has completed
			}
		// Fetch Search Failure
		case searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE:
			return {
				...state,	// Load current values of state
				searchResults: [],	// Clear results
				error: action.payload,	// Indicate the error
				isLoading: false	// Indicate the process has completed
			}
		// No action given or action is invaild
		default:
			return state
	}
}

// Exports searchReducer to be used in other parts of the codebase
export default searchReducer
