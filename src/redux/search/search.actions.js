import { searchActionTypes } from "./search.types";
import axios from "../../axiosInstance";
import requests from "../../requests";

/*
	This file contains the different actions and states of the search bar
	
	These actions are dispatched by the search bar component (/src/components/Searchbar/Searchbar.jsx)
	and are handled by the search reducer (/src/redux/search/index.js)
*/

/**
 * Change the search input value
 * @param {String} inputValue
 */
export const changeSearchInputValue = inputValue => ({
	type: searchActionTypes.CHANGE_SEARCH_INPUT_VALUE,
	payload: inputValue
})

/** Clear the search bar */ 
export const clearSearchInputValue = () => ({
	type: searchActionTypes.CLEAR_SEARCH_INPUT_VALUE
})

/**
 * Started request to fetch search results
 * @param {String} searchQuery
 */
export const fetchSearchResultsRequest = searchQuery => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_REQUEST,
	payload: searchQuery
})

/**
 * Results returned successfully
 * @param {String} searchResults
 */
export const fetchSearchResultsSuccess = searchResults => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_SUCCESS,
	payload: searchResults
})

/**
 * There was an error fetching results
 * @param {String} errorMessage
 */
export const fetchSearchResultsFailure = errorMessage => ({
	type: searchActionTypes.FETCH_SEARCH_RESULTS_FAILURE,
	payload: errorMessage
})

/**
 * Fetch search results asynchronously
 * @param {String} searchQuery
 */
export const fetchSearchResultsAsync = searchQuery => {
	return dispatch => {
		
		// Dispatch the request action
		dispatch(fetchSearchResultsRequest(searchQuery));
		
		// Await search results
		axios.get(`${requests.fetchSearchQuery}${searchQuery}`)
			
			// If successful, filter out people from the results and dispatch the success action
			.then(response => {
				const { data: { results } } = response;
				const filteredResults = results.filter(result => result.media_type !== 'person');
				dispatch(fetchSearchResultsSuccess(filteredResults));
			})

			// If an error occurred, dispatch the failure action
			.catch(err => {
				dispatch(fetchSearchResultsFailure(err.message));
			});
	}
}