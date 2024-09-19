

/*
This is the search bar component. It's purpose is to allow users to type in a search request in the input box, and to send the data to be displayed by the search page.
It can be hidden and expanded by clicking a magnifying glass icon. It also provides a small x button that will clear the current input when clicked.
When an input is entered, it will automatically send users to the search page to begin providing search results.
*/


import "./searchbar.scss"
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeSearchInputValue, clearSearchInputValue, fetchSearchResultsAsync } from "../../redux/search/search.actions";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";

const Searchbar = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [searchInputToggle, setSearchInputToggle] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const searchbarRef = useRef();
    const searchInputRef = useRef();

    //This is called when the user clicks outside the searchbar component. It will clear the search and hide the search bar input.
    useOutsideClick(searchbarRef, () => {
        if (searchInputToggle) {
            setSearchInput("");
            setSearchInputToggle(false);
        }
    });

    /*This function toggles the searchInputToggle value between true and false when it is called. 
    When searchInputToggle is True, the search bar is visible and focus is shifted into the input. When it is false, the search bar is hidden.
    It will also shift focus onto the searchbar input so that typing can began immediately.*/
    const handleSearchInputToggle = () => {
        searchInputRef.current.focus();
        setSearchInputToggle(!searchInputToggle);
    };

    // This function clears the input and returns to the main browsing page.
    const clearSearchInputToggle = () => {
        setSearchInput("");
        //Runs code at /src/redux/search.actions.js. This will clear the input data for the search page.
        dispatch(clearSearchInputValue());
        history.push("/browse");
    };

    // This function is called when characters are added or removed to the search bar input. It saves the input and sends it to the search page to show results.
    const handleSearchInput = event => {
        const { value } = event.target;
        setSearchInput(value);
        //Runs code at /src/redux/search.actions.js. This will set the input data for the search page without triggering an update.
        dispatch(changeSearchInputValue(value));

        //If there is any search input, go to search page and run a search. If the search input is empty, go to main browsing page.
        if (value.length > 0) {
            //Goes to the search page with value (the search input) as a parameter
            history.push(`/search?q=${value}`);
            //Runs code at /src/redux/search.actions.js. This will tell the search page to retrieve and interpret the input data.
            dispatch(fetchSearchResultsAsync(value));
        } else history.push("/browse");
    };

    return (
        <div className="Searchbar" ref={searchbarRef}>
            {/*This component is the text and input portion of the search bar. It takes in keyboard input and runs the handleSearchInput function each time a character is added or removed from the input.
            It will only appear when searchInputToggle is true, otherwise it will be hidden.*/ }
            <input
                type="text"
                placeholder="Search titles, people"
                value={searchInput}
                onChange={handleSearchInput}
                ref={searchInputRef}
                className={`Searchbar--search ${searchInputToggle && "Searchbar--active"}`}
            />
            {/*This component appears as a magnifying glass. When clicked this will open the search bar by flipping the value of searchInputToggle. 
            It will also set the focus to the input component. When pressed again, it will close the search bar.*/}
            <div
                className="Searchbar--toggler"
                onClick={handleSearchInputToggle}
            >
                <FiSearch size="1.5em" />
            </div>
            {/*This component appears as an X when the search bar is open and there is some input. When clicked this will clear the current input in the search bar.*/}
            <div
                className={`Searchbar--clear ${searchInputToggle && searchInput.length && "typing"}`}
                onClick={clearSearchInputToggle}
            >
                <RiCloseFill />
            </div>
        </div>
    )
}

export default Searchbar
