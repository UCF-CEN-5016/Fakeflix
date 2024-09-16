import "./rowPoster.scss";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import { FaPlus, FaMinus, FaPlay, FaChevronDown } from "react-icons/fa";
import useGenreConversion from "../../hooks/useGenreConversion";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { Link } from "react-router-dom";


/*
This file was designed to handle the individual postings asssigned to a row. 
It appears on: Home, TV Series, Movies, New & Popular, and My List when you have favorites. 
It is NOT used for presenting search results. 
*/

//This function takes in "result" which contains all of the information to make one of the small windows in a row
	//It then returns the object to make said windows
const RowPoster = result => {
	//These are all of the elements that a post can have. You can see these attributes when you hover over a post. 
		// Item therefore represents 1 post, the content of which will not change. 
	const { item, item: { title, original_name, original_title, name, genre_ids, poster_path, backdrop_path }, isLarge, isFavourite } = result;

	//Fall back title can be any of these if available
	let fallbackTitle = title || original_title || name || original_name;

	//This function takes a list of id's and returns a list of corresponding names 
	const genresConverted = useGenreConversion(genre_ids);

	//Setup a hook to use a dispatch in the future 
		//Interacts with the Reduxs store
	const dispatch = useDispatch();


	//This is a function that takes some event as input. It will essentially manage clicking the + sign on the UI to add something to our favorites. 
	const handleAdd = event => {
		//After taking the event, we call stop Propagation which prevents the event from bubbling up to parent objects 
		event.stopPropagation();
		//We then dispatch the action to the redux store to update the application state 
			//...item unpacks our whole object and forms a new object before sending, and we update isFavorite accordinly.  
		dispatch(addToFavourites({ ...item, isFavourite }));
	};

	//A function that takes an event as input to remove something from our favorites. 
	const handleRemove = event => {
		//After taking the event, we call stop Propagation which prevents the event from bubbling up to parent objects 
		event.stopPropagation();
		//We then dispatch the action to the redux store to update the application state 
			//...item unpacks our whole object and forms a new object before sending, and we update isFavorite accordinly.
		dispatch(removeFromFavourites({ ...item, isFavourite }));
	};


	//A modal is simply the larger window you get after clicking on a RowPoster. This handles opening that and passing the information
	const handleModalOpening = () => {
		//Updates state via Redux store
		dispatch(showModalDetail({ ...item, fallbackTitle, genresConverted, isFavourite }));
	}


	//Function that takes in some event (the play button being pressed) 
	const handlePlayAction = event => {
		//Stops event from going to parent objects
		event.stopPropagation();

	};

	return (
		<div
			//Dynamically sets the class name based on isLarge 
				//Some of the rows are larger than others 
			className={`Row__poster ${isLarge && "Row__poster--big"}`}

			//Waits for a click to handles the larger modal window opening  
			onClick={handleModalOpening}
		>
			{isLarge ? (
				//When is large is true, we then check to make sure poster_path is a valid value (i.e. not null or empty or undefined)
				poster_path ? (
					//If its valid, get the image at the specified URL or alternatively use our fallback title 
					<img src={`${BASE_IMG_URL}/${poster_path}`} alt={fallbackTitle} />
					//Otherwise set it to empty string
				) : ""
				//If the row poster is not large, we check to see if backdrop_path is a valid value 
			) : backdrop_path ? (
				//Its valid, so get the image at the specified URL or use the fallback title if that fails. 
				<img src={`${BASE_IMG_URL}/${backdrop_path}`} alt={fallbackTitle} />
			) : (
					//Its not valid, so set our image to the fall back option
				<>
					<img src={FALLBACK_IMG_URL} alt={fallbackTitle} />
					<div className="Row__poster__fallback">
						<span>{fallbackTitle}</span>
					</div>
				</>
			)}
			{/*Big or small, each row poster will also have a row poster info class. This is what shows when you hover over an option*/}
			<div className="Row__poster-info">

				{/*Within the poster info, we also have icons for users to take actions (play, add to favs, etc.)*/}
				<div className="Row__poster-info--iconswrp">
					<Link
						//This is for our play button, we see on click it calls handlePlayAction
						className="Row__poster-info--icon icon--play"
						onClick={handlePlayAction}
						//Route to this URL on click 
						to={'/play'}
					>
						{/*Denote our icon*/}
						<FaPlay />
					</Link>
					{!isFavourite
						? (
							//If this post is not already in our favorites, than when they click the button we add it 
							<button className='Row__poster-info--icon icon--favourite' onClick={handleAdd}>
								<FaPlus />
							</button>
						): (
							//If this post is already in our favorites and they click the button we remove it 
							<button className='Row__poster-info--icon icon--favourite' onClick={handleRemove}>
								<FaMinus />
							</button>
						)}
					{/*All of our row posts have a toggle button (the small arrow) that brings up the modal that contains a bigger window with more information about the show*/}
					<button className='Row__poster-info--icon icon--toggleModal'>
						<FaChevronDown onClick={handleModalOpening}/>
					</button>
				</div>
				{/*This just holds the title of the show*/}
				<div className="Row__poster-info--title">
					<h3>{fallbackTitle}</h3>
				</div>
				{/*Another class to list all of the genres of the post */}
				<div className="Row__poster-info--genres">
					{/*Here we just feed the ids into our converter function to get the corresponding names */}
					{genresConverted && genresConverted.map(genre => (
						<span key={`Genre--id_${genre}`} className="genre-title">{genre}</span>
					))}
				</div>
			</div>
		</div>
	);
};

//Make our component available to import in other files
export default RowPoster;