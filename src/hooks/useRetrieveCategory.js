import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

/* example of url: http://localhost:3000/movies/action where 
	- slicedUrl = 'movies'
	- categoryName = 'action'
	- page = 2
*/
// returns data for movie, tvseries, or popular based on the category
export const useRetrieveCategory = (slicedUrl, categoryName, page) => {
	// set up dispatch
	const dispatch = useDispatch();
	// state to store the selected category data
	const [categoryData, setCategoryData] = useState();

	useEffect(() => {
		console.error('useEffect triggered');
		// variable to store the selected configuration array
		let selectedConfigArray = null;
		// determine which configuration array to use based on the slicedUrl
		switch (slicedUrl) {
			case "browse": // If on browse, fetch movie data
			case "movies":
				selectedConfigArray = fetchMovieDataConfig;
				break;
			case "tvseries":
				selectedConfigArray = fetchSeriesDataConfig;
				break;
			case "popular":
				selectedConfigArray = fetchPopularDataConfig;
				break;
			default:
				break;
		}
		// filter the selected configuration array to get the data for the specific category (genre)
		// example: data[0] = genre: "trending", id: 0, selector: state => state.Movies.trending,
			// thunk: (fetchUrl, isPage) => {...}, title: "Trending Now", 
			// url: "/trending/movie/week?api_key=bcb0e0a8ee3d6fc88601012e2b503228&sort_by=popularity.desc&language=en-US"
		const [data] = selectedConfigArray.filter(el => el.genre === categoryName);
		// Dispatch the thunk action to fetch data, including the page number in the URL
		dispatch(data.thunk(`${data.url}&page=${page}`));
		// Update the categoryData state with the selected data
		setCategoryData(data);
	}, [dispatch, categoryName, slicedUrl, page]) // dependencies for the useEffect hook

	// return the category data
	return categoryData;
}