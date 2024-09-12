/* This file defines a React hook, useRetrieveData, which fetches data for movies, series, or popular depending on the type passed
into it. Based off the type, it selects a corresponding configuration array from the dataConfig file and dispatches the thunk
function It uses Redux to dispatch thunks that fetch data from specified URLs and processes the data into an array of objects.
The retrieved data is stored in local state and returned by the hook for use in other components. */

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux" //Redux is a state management for javascript applications. It provides a global store where you keep the application state
import { fetchMovieDataConfig, fetchPopularDataConfig, fetchSeriesDataConfig } from "../dataConfig";

export const useRetrieveData = (type) => { //function to retrieve data. It takes a type as an argument. type should be either movies, series, or popular

    const dispatch = useDispatch() //allows for access of the dispatch function from the Redux store
    const [data, setData] = useState(null) //initalizes the data state to null. setData function will be used to update data state

    useEffect(() => { 
        let selectedConfigArray = null; //this variable will be used to store the configuration array based on the type
        switch (type) {
            case "movies": //if the type is movies, then the selectedConfigArray will be fetchMovieDataConfig.
                selectedConfigArray = fetchMovieDataConfig;
                break;
            case "series": //if the type is series, then the selectedConfigArray will be fetchSeriesDataConfig
                selectedConfigArray = fetchSeriesDataConfig;
                break;
            case "popular": //if the type is popular, then the selectedConfigArray will be fetchPopularDataConfig
                selectedConfigArray = fetchPopularDataConfig;
                break;
            default:
                break;
        }

        let isPage = true;
        const rowsData = selectedConfigArray.map(el => { //loops through the selectedConfigArray and returns a new array that is stored in rowsData
            dispatch(el.thunk(el.url, isPage)) //dispatches the thunk function with the url and boolean variabe isPage as arguments
            return { //returns an object with these properties
                id: el.id,
                title: el.title,
                genre: el.genre,
                selector: el.selector,
                isLarge: el.isLarge
            }
        })
        setData(rowsData) //sets the data state to the rowsData array

    }, [type, dispatch]) //useEffect runs when the type or dispatch changes

    return data
}
