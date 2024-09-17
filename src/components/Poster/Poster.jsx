import "./poster.scss"
import { motion } from "framer-motion";
import { posterFadeInVariants } from "../../motionUtils";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { FaChevronDown, FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import { Link } from "react-router-dom";
// Functional Component `Poster` takes movie or TV-series details as parameters
// @param result contains the details of the item
const Poster = result => {

    // Destructuring result to get item and isFavourite, and extracting movie/series details from item
    const { item, item: { title, original_name, original_title, name, genre_ids, backdrop_path }, isFavourite } = result;
    
    //sets fallBackTitle  from title,original_title, name or original name
    let fallbackTitle = title || original_title || name || original_name;

    //Using custom hook to convert genre_names from genre_ids
    const genresConverted = useGenreConversion(genre_ids);
    // Calling the useDispatch hook to get the dispatch function 
    const dispatch = useDispatch();

    // Handles the response when adding to favourite movie list
    // Adds the movie item to favorites by dispatching a Redux action
    const handleAdd = event => {
        event.stopPropagation(); // Stops the event from affecting parent elements
        dispatch(addToFavourites({ ...item, isFavourite }));
    };

    // Handles the response when removing favourite movie list
    // removes the movie item from favorites by dispatching a Redux action
    const handleRemove = event => {
        event.stopPropagation(); // Stops the event from affecting parent elements
        dispatch(removeFromFavourites({ ...item, isFavourite }));
    };

    // Handles opening the modal to display movie/TV-series details
    const handleModalOpening = () => {
        dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
    }

    // Prevents event propagation when the play action is triggered
    const handlePlayAction = event => {
        event.stopPropagation();
    };

    return (
        <motion.div
            variants={posterFadeInVariants}
            className='Poster'
            onClick={handleModalOpening}
        >
            {/* showing poster image of move/tvseries */}
            {backdrop_path ? (
                <img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
            ) : (
                <>
                    <img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
                    <div className='Poster__fallback'>
                        <span>{fallbackTitle}</span>
                    </div>
                </>
            )}
            <div className="Poster__info">
                <div className="Poster__info--iconswrp">
                    {/* Link to Play the tv-series/movie */}
                    <Link
                        className="Poster__info--icon icon--play"
                        onClick={handlePlayAction}
                        to={'/play'}
                    >
                        <FaPlay />
                    </Link>
                    {/* adding favourites and also removing from favourite list */}
                    {!isFavourite
                        ? (
                            <button className='Poster__info--icon icon--favourite' onClick={handleAdd}>
                                <FaPlus />
                            </button>
                        ): (
                            <button className='Poster__info--icon icon--favourite' onClick={handleRemove}>
                                <FaMinus />
                            </button>
                        )}
                    <button className='Poster__info--icon icon--toggleModal'>
                        <FaChevronDown onClick={handleModalOpening}/>
                    </button>
                </div>
                <div className="Poster__info--title">
                    <h3>{fallbackTitle}</h3>
                </div>
                {/* showing genere names of movie/tvseries */}
                <div className="Poster__info--genres">
                    {genresConverted && genresConverted.map(genre => (
                        <span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Poster
