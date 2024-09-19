/*
The overall purpose of the file is to source and house information from current movie demographics
in order to replicate the home user interface of Netflix. This includes information about trending movies, 
search inquiries, popular animation and action films, and much more.Without this file, Fakeflix would still
have a similar user interface comparable to Netflix, however, much of the info cards would be either void 
or be without any substantial data. 
*/

import { getOneMonthAgoReleaseDate } from "./utils";

export const GITHUB_BASE_URL = "https://github.com/Th3Wall";
export const GITHUB_AVATAR_URL = "https://avatars.githubusercontent.com/u/25078541?v=4";
const GITHUB_ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix";
export const LANG = "en-US";
export const REGION = "US";
export const BASE_IMG_URL = "https://image.tmdb.org/t/p/original";
export const FALLBACK_IMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_readme.png`;
export const LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_logo.png`;
export const MOBILE_LOGO_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_favicon_192.png`;
export const PROFILE_PIC_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_profilepic.png`;
export const SIGNIN_BGIMG_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_auth_bg.jpg`;
export const TADUM_SOUND_URL = `${GITHUB_ASSETS_BASE_URL}/Fakeflix_TaDum.mp3`;
const ONEMONTHAGO = getOneMonthAgoReleaseDate();
const { REACT_APP_API_KEY } = process.env;

const requests = {

	/*
 	This declarative function/constant establishes queries for the various pages embedded inside FakeFlix.
  	With the use of API calls, "requests" is able to pull in data from across the internet and its local API key.
   	This data would soon be displayed across the webpage. This also aids in code legibility; without this constant, 
    	the declarations across this repository would be replaced with complex URLs, providing much more of a need for 
     	developer comments. 
 	*/
	
	fetchSearchQuery: `/search/multi?api_key=${REACT_APP_API_KEY}&language=${LANG}&query=`,
	fetchTrendingAll: `/trending/all/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchReleasedMoviesByOneMonth: `/discover/movie?api_key=${REACT_APP_API_KEY}&primary_release_date.gte=${ONEMONTHAGO}&sort_by=popularity.desc&language=${LANG}`,
    
	/*
 	Movies: Houses fetched data via API calls about trending movie genres, such Action, Horror, and Romance. The
  		information for each of these films will be presented in the layout designed in the components folder
  	*/
	fetchTrendingMovies: `/trending/movie/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchUpcomingMovies: `/movie/upcoming?api_key=${REACT_APP_API_KEY}&language=${LANG}`,
	fetchTopRated: `/movie/top_rated?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&region=${REGION}`,
	fetchActionMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=28&sort_by=popularity.desc&language=${LANG}`,
	fetchAdventureMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=12&sort_by=popularity.desc&language=${LANG}`,
	fetchComedyMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	fetchHorrorMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=27&sort_by=popularity.desc&language=${LANG}`,
	fetchRomanceMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10749&sort_by=popularity.desc&language=${LANG}`,
	fetchWarMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=10752&sort_by=popularity.desc&language=${LANG}`,
	fetchAnimationMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	discoverMovies: `/discover/movie?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
    
	/* 
 	Series: Houses fetched data via API calls about trending serial genres, such Documentaries, Crime, and Comedy. The
  		information for each of these films will be presented in the layout designed in the components folder.
  	*/
	
	discoverSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchTrendingSeries: `/trending/tv/week?api_key=${REACT_APP_API_KEY}&sort_by=popularity.desc&language=${LANG}`,
	fetchNetflixOriginals: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_networks=213&sort_by=popularity.desc&language=${LANG}`,
	fetchActionAdventureSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10759&sort_by=popularity.desc&language=${LANG}`,
	fetchAnimationSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&language=${LANG}`,
	fetchComedySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&language=${LANG}`,
	fetchCrimeSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=80&sort_by=popularity.desc&language=${LANG}`,
	fetchDocumentarySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=99&sort_by=popularity.desc&language=${LANG}`,
	fetchFamilySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10751&sort_by=popularity.desc&language=${LANG}`,
	fetchKidsSeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10762&sort_by=popularity.desc&language=${LANG}`,
	fetchSciFiFantasySeries: `/discover/tv?api_key=${REACT_APP_API_KEY}&with_genres=10765&sort_by=popularity.desc&language=${LANG}`,
};

export default requests;
