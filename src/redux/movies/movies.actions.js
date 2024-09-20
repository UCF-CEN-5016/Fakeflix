import axios from "../../axiosInstance";
import { moviesActionTypes } from "./movies.types";

/* 
* This file contains creators for all of the Redux actions related to 
* fetching movies from the database. In Redux, actions describe events that occur
* in the application. Actions always have a type field, which should be a 
* string that clearly communicates what the event is; additional fields contain data
* relevant to the event. Actions are used by reducers to change the state of the application.
*/

// Action

// Action creator for action that signals that a request to fetch action movies has been sent. 
export const fetchActionMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch action movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchActionMoviesSuccess = (actionMovies, isPage) => ({
	type: isPage
		? moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS
		: moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS,
	payload: actionMovies,
});

/* 
* Action creator that signals that a request to fetch action movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchActionMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches action movies from the database.
*
* fetchUrl is the url of the endpoint for getting action movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchActionMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchActionMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const actionMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
				if (isPage) {
					dispatch(fetchActionMoviesSuccess(actionMovies, isPage));
				} else dispatch(fetchActionMoviesSuccess(actionMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchActionMoviesFailure(errorMessage));
			});
	};
};

// Adventure

// Action creator for action that signals that a request to fetch adventure movies has been sent. 
export const fetchAdventureMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch adventure movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchAdventureMoviesSuccess = (adventureMovies, isPage) => ({
	type: isPage
        ? moviesActionTypes.FETCH_ADVENTURE_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ADVENTURE_MOVIES_SUCCESS,
	payload: adventureMovies,
});

/* 
* Action creator that signals that a request to fetch adventure movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchAdventureMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ADVENTURE_MOVIES_FAILURE,
	payload: error,
});

export const fetchAdventureMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchAdventureMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const adventureMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchAdventureMoviesSuccess(adventureMovies, isPage));
                } else dispatch(fetchAdventureMoviesSuccess(adventureMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchAdventureMoviesFailure(errorMessage));
			});
	};
};

// SplashAnimation

// Action creator for action that signals that a request to fetch animation movies has been sent. 
export const fetchAnimationMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ANIMATION_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch animation movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchAnimationMoviesSuccess = (animationMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ANIMATION_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ANIMATION_MOVIES_SUCCESS,
	payload: animationMovies,
});

/* 
* Action creator that signals that a request to fetch animation movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchAnimationMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ANIMATION_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches animation movies from the database.
*
* fetchUrl is the url of the endpoint for getting animation movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchAnimationMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchAnimationMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const animationMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchAnimationMoviesSuccess(animationMovies, isPage));
                } else dispatch(fetchAnimationMoviesSuccess(animationMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchAnimationMoviesFailure(errorMessage));
			});
	};
};

// Comedy

// Action creator for action that signals that a request to fetch comedy movies has been sent. 
export const fetchComedyMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch comedy movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchComedyMoviesSuccess = (comedyMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS,
	payload: comedyMovies,
});

/* 
* Action creator that signals that a request to fetch comedy movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchComedyMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches comedy movies from the database.
*
* fetchUrl is the url of the endpoint for getting comedy movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchComedyMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchComedyMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const comedyMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchComedyMoviesSuccess(comedyMovies, isPage));
                } else dispatch(fetchComedyMoviesSuccess(comedyMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchComedyMoviesFailure(errorMessage));
			});
	};
};

// Horror

// Action creator for action that signals that a request to fetch horror movies has been sent. 
export const fetchHorrorMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_HORROR_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch horror movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchHorrorMoviesSuccess = (horrorMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_HORROR_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_HORROR_MOVIES_SUCCESS,
	payload: horrorMovies,
});

/* 
* Action creator that signals that a request to fetch horror movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchHorrorMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_HORROR_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches horror movies from the database.
*
* fetchUrl is the url of the endpoint for getting horror movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchHorrorMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchHorrorMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const horrorMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchHorrorMoviesSuccess(horrorMovies, isPage));
                } else dispatch(fetchHorrorMoviesSuccess(horrorMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchHorrorMoviesFailure(errorMessage));
			});
	};
};

// Netflix

// Action creator for action that signals that a request to fetch Netflix movies has been sent. 
export const fetchNetflixMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_NETFLIX_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch Netflix movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchNetflixMoviesSuccess = (netflixMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_NETFLIX_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_NETFLIX_MOVIES_SUCCESS,
	payload: netflixMovies,
});

/* 
* Action creator that signals that a request to fetch Netflix movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchNetflixMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_NETFLIX_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches Netflix movies from the database.
*
* fetchUrl is the url of the endpoint for getting Netflix movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchNetflixMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchNetflixMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const netflixMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchNetflixMoviesSuccess(netflixMovies, isPage));
                } else dispatch(fetchNetflixMoviesSuccess(netflixMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchNetflixMoviesFailure(errorMessage));
			});
	};
};

// Romance

// Action creator for action that signals that a request to fetch romance movies has been sent. 
export const fetchRomanceMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_ROMANCE_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch romance movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchRomanceMoviesSuccess = (romanceMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ROMANCE_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ROMANCE_MOVIES_SUCCESS,
	payload: romanceMovies,
});

/* 
* Action creator that signals that a request to fetch romance movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchRomanceMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_ROMANCE_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches romance movies from the database.
*
* fetchUrl is the url of the endpoint for getting romance movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchRomanceMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchRomanceMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const romanceMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchRomanceMoviesSuccess(romanceMovies, isPage));
                } else dispatch(fetchRomanceMoviesSuccess(romanceMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchRomanceMoviesFailure(errorMessage));
			});
	};
};

// Top Rated

// Action creator for action that signals that a request to fetch top rated movies has been sent. 
export const fetchTopRatedMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_TOP_RATED_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch top rated movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchTopRatedMoviesSuccess = (topRatedMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_TOP_RATED_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_TOP_RATED_MOVIES_SUCCESS,
	payload: topRatedMovies,
});

/* 
* Action creator that signals that a request to fetch top rated movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchTopRatedMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_TOP_RATED_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches top rated movies from the database.
*
* fetchUrl is the url of the endpoint for getting top rated movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchTopRatedMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchTopRatedMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const topRatedMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchTopRatedMoviesSuccess(topRatedMovies, isPage));
                } else dispatch(fetchTopRatedMoviesSuccess(topRatedMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchTopRatedMoviesFailure(errorMessage));
			});
	};
};

// Trending
// Action creator for action that signals that a request to fetch trending movies has been sent. 
export const fetchTrendingMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_TRENDING_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch trending movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchTrendingMoviesSuccess = (trendingMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_TRENDING_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_TRENDING_MOVIES_SUCCESS,
	payload: trendingMovies,
});

/* 
* Action creator that signals that a request to fetch trending movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchTrendingMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_TRENDING_MOVIES_FAILURE,
	payload: error,
});

export const fetchTrendingMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchTrendingMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const trendingMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchTrendingMoviesSuccess(trendingMovies, isPage));
                } else dispatch(fetchTrendingMoviesSuccess(trendingMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchTrendingMoviesFailure(errorMessage));
			});
	};
};

// Upcoming

// Action creator for action that signals that a request to fetch upcoming movies has been sent. 
export const fetchUpcomingMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_UPCOMING_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch upcoming movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchUpcomingMoviesSuccess = (upcomingMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_UPCOMING_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_UPCOMING_MOVIES_SUCCESS,
	payload: upcomingMovies,
});

/* 
* Action creator that signals that a request to fetch upcoming movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchUpcomingTrendingMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_UPCOMING_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches upcoming movies from the database.
*
* fetchUrl is the url of the endpoint for getting action upcoming data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchUpcomingMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchUpcomingMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const upcomingMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchUpcomingMoviesSuccess(upcomingMovies, isPage));
                } else dispatch(fetchUpcomingMoviesSuccess(upcomingMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchUpcomingTrendingMoviesFailure(errorMessage));
			});
	};
};

// Latest
// Action creator for action that signals that a request to fetch latest movies has been sent. 
export const fetchLatestMoviesRequest = () => ({
	type: moviesActionTypes.FETCH_LATEST_MOVIES_REQUEST,
});

/* 
* Action creator for action that signals that a request to fetch latest movies has succeeded;
* contains the fetched data and whether or not the data will be displayed as its own
* page or added to the existing data on the page current being displayed.
*/
export const fetchLatestMoviesSuccess = (latestMovies, isPage) => ({
    type: isPage
        ? moviesActionTypes.FETCH_LATEST_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_LATEST_MOVIES_SUCCESS,
	payload: latestMovies,
});

/* 
* Action creator that signals that a request to fetch latest movies has failed;
* contains data related to the error that caused the failure.
*/
export const fetchLatestTrendingMoviesFailure = error => ({
	type: moviesActionTypes.FETCH_LATEST_MOVIES_FAILURE,
	payload: error,
});

/*
* Asynchronous action creator for action that fetches latest movies from the database.
*
* fetchUrl is the url of the endpoint for getting latest movie data.
* 
* isPage is to determine if the data will be shown on a new page or an
* existing one.
*/
export const fetchLatestMoviesAsync = (fetchUrl, isPage) => {
	return dispatch => {
		dispatch(fetchLatestMoviesRequest());
		// Send GET request to the fetchUrl
		axios
			.get(fetchUrl)
			.then(res => {
				/*
				* The data provided by the endpoint doesn't include 
				* the field for whether the user has favorited a title,
				* so it's added here.
				*/
				const latestMovies = res.data.results.map(el => ({
					...el,
					isFavourite: false,
				}));
                if (isPage) {
                    dispatch(fetchLatestMoviesSuccess(latestMovies, isPage));
                } else dispatch(fetchLatestMoviesSuccess(latestMovies));
			})
			.catch(error => {
				const errorMessage = error.message;
				dispatch(fetchLatestTrendingMoviesFailure(errorMessage));
			});
	};
};
