import "./searchbar.scss";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeSearchInputValue,
  clearSearchInputValue,
  fetchSearchResultsAsync,
} from "../../redux/search/search.actions";
import { FiSearch } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import useOutsideClick from "../../hooks/useOutsideClick";

/**
 * Searchbar Component
 *
 * This component servers as the searchbar for users to search for
 * titles of interests within the FakeFlix database
 *
 * The component will route to the URL based on the user input into the search bar
 *
 *
 * Bar will open and collapse depending on the focus state and whether it has been toggled.
 *
 * @returns {JSX.Element}
 */
const Searchbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchInputToggle, setSearchInputToggle] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchbarRef = useRef();
  const searchInputRef = useRef();

  // Closes searchbar if open and mouse click outside of searchbar
  useOutsideClick(searchbarRef, () => {
    if (searchInputToggle) {
      setSearchInput("");
      setSearchInputToggle(false);
    }
  });

  // Opens searchbar and sets focus state
  const handleSearchInputToggle = () => {
    searchInputRef.current.focus();
    setSearchInputToggle(!searchInputToggle);
  };

  // Clears search input and returns to homepage
  const clearSearchInputToggle = () => {
    setSearchInput("");
    dispatch(clearSearchInputValue());
    history.push("/browse");
  };

  // Updates the search value state and navigates to correct URL for search results
  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
    dispatch(changeSearchInputValue(value));

    if (value.length > 0) {
      history.push(`/search?q=${value}`);
      dispatch(fetchSearchResultsAsync(value));
    } else history.push("/browse");
  };

  return (
    <div className="Searchbar" ref={searchbarRef}>
      <input
        type="text"
        placeholder="Search titles, people"
        value={searchInput}
        onChange={handleSearchInput}
        ref={searchInputRef}
        className={`Searchbar--search ${
          searchInputToggle && "Searchbar--active"
        }`}
      />
      <div className="Searchbar--toggler" onClick={handleSearchInputToggle}>
        <FiSearch size="1.5em" />
      </div>
      <div
        className={`Searchbar--clear ${
          searchInputToggle && searchInput.length && "typing"
        }`}
        onClick={clearSearchInputToggle}
      >
        <RiCloseFill />
      </div>
    </div>
  );
};

export default Searchbar;
