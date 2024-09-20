import { searchActionTypes } from "./search.types";
import axios from "../../axiosInstance";
import requests from "../../requests";

// The following types are defined to use with react dispatch https://react-redux.js.org/api/hooks#usedispatch
// declared in /src/components/Searchbar/Searchbar.jsx

/**
 * Updates the query as the contents of the searchbar change
 * @param {*} inputValue 
 * @returns 
 */
export const changeSearchInputValue = inputValue => ({
	type: searchActionTypes.CHANGE_SEARCH_INPUT_VALUE,
	payload: inputValue
})

/**
 * Clears the current search
 * @returns 
 */
export const clearSearchInputValue = () => ({
	type: searchActionTypes.CLEAR_SEARCH_INPUT_VALUE
})

/**
 * Prepare a search request query to use through dispatch
 * @param {*} searchQuery dispatched query
 * @returns 
 */
export const fetchSearchResultsRequest = searchQuery => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
	payload: searchQuery
})

/**
 * prepares an object to store the results of the query if successful
 * @param {*} searchResults 
 * @returns 
 */
export const fetchSearchResultsSuccess = searchResults => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
	payload: searchResults
})

/**
 * prepares an object to handle errors if the query failed, has storage
 * for the error msg
 * @param {*} errorMessage 
 * @returns 
 */
export const fetchSearchResultsFailure = errorMessage => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE,
	payload: errorMessage
})

/**
 * Performs an async query through axios
 * @param {*} searchQuery 
 * @returns 
 */
export const fetchSearchResultsAsync = searchQuery => {
	return dispatch => {
		// initialize the search query
		dispatch(fetchSearchResultsRequest(searchQuery));
		// try and get the response of the query
		axios.get(`${requests.fetchSearchQuery}${searchQuery}`)
			.then(response => { // in success
				// capture only the results from the axios response	
				const { data: { results } } = response;
				const filteredResults = results.filter(result => result.media_type !== 'person');
				// dispatch the results
				dispatch(fetchSearchResultsSuccess(filteredResults));
			})
			.catch(err => { // in fail
				dispatch(fetchSearchResultsFailure(err.message));
			});
	}
}