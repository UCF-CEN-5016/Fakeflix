import './detailModal.scss'
import { useRef } from 'react';
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"
import { staggerOne, modalOverlayVariants, modalVariants, modalFadeInUpVariants } from "../../motionUtils";
import { hideModalDetail } from "../../redux/modal/modal.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectModalContent, selectModalState } from "../../redux/modal/modal.selectors";
import { BASE_IMG_URL, FALLBACK_IMG_URL } from "../../requests";
import { VscChromeClose } from "react-icons/vsc";
import { capitalizeFirstLetter, dateToYearOnly } from "../../utils";
import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { addToFavourites, removeFromFavourites } from "../../redux/favourites/favourites.actions";
import useOutsideClick from "../../hooks/useOutsideClick";

/*
	A Modal component that displays details of the selected movie or series.

	This component (Detail Modal) serves as a card that displays information related to a selected movie or show, including information
	such as a show overview, title, release data, genre, and more. It also maintains a play button which would play the series or video if 
	there was one, but rather it plays the FakeFlix logo instead as this is a demo and not an actual streaming service like Netflix.

	Returns: A JSX.element that serves as the detail modal component within the page.
*/

const DetailModal = () => {
	/* 
		Section for redux functions such as dispatch and selectors for factors such as if the modal is open or not,
		what content should be in the modal, and what function will be used to close or hide the modal.
	*/
	const dispatch = useDispatch();
	const modalClosed = useSelector(selectModalState);
	const modalContent = useSelector(selectModalContent);

	const handleModalClose = () => dispatch(hideModalDetail());	

	/*
		Section for distributing/adjusting/handling modal details and content. This includes organizing all the data 
		from modalContent into easily distinguishable and accessable components, organizing the list of genres, defining if the content is
		for adults, and formatting the airing date.
	*/
	const { overview, fallbackTitle, backdrop_path, release_date, first_air_date, vote_average, original_language, adult, genresConverted, isFavourite } = modalContent;
	const joinedGenres = genresConverted ? genresConverted.join(', ') : "Not available";	
	const maturityRating = adult === undefined ? "Not available" : adult ? "Suitable for adults only" : "Suitable for all ages";
	const reducedDate = release_date ? dateToYearOnly(release_date) : first_air_date ? dateToYearOnly(first_air_date) : "Not Available";
	const modalRef = useRef();

	// Section which primarily refers to major functions that occur on a button click or action related to the detail modal.

	// HandleAdd is called when the user selects to favorite a show or movie. 
	const handleAdd = (event) => {	
		event.stopPropagation();
		dispatch(addToFavourites({ ...modalContent, isFavourite }));	// Calls a function from favourites.actions which adds the selected item to a favorites list.
	}

	// HandleRemove is called when the user selects to unfavorite a show or movie. 
	const handleRemove = (event) => {	
		event.stopPropagation();
		dispatch(removeFromFavourites({ ...modalContent, isFavourite }));	// Calls a function from favourites.actions which removes the selected item from the favorites list.
		if (!modalClosed) handleModalClose();	// Closes the modal afterwards (if it was not already closed.)
	}

	// HandlePlayAnimation closes the modal and plays the FakeFlix animation upon pressing the play button (as there are no movies/series to actually play).
	const handlePlayAnimation = event => {
		event.stopPropagation();
		handleModalClose();
	};
	
	// Uses a custom hook within the program that closes the modal when clicked outside the bounds.	
	useOutsideClick(modalRef, () => {	
		if (!modalClosed) handleModalClose();
	});

	return (
		<AnimatePresence exitBeforeEnter>
			{!modalClosed && (
				<>
					<motion.div
						variants={modalOverlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						key="modalOverlay"
						className={`Modal__overlay ${modalClosed && 'Modal__invisible'}`}
					>
						<motion.div
							key="modal"
							variants={modalVariants}
							ref={modalRef}
							className={`Modal__wrp ${modalClosed && 'Modal__invisible'}`}
						>
							<motion.button
								className="Modal__closebtn"
								onClick={handleModalClose}
							>
								<VscChromeClose />
							</motion.button>
							<div className="Modal__image--wrp">
								<div className="Modal__image--shadow" />
								<img
									className="Modal__image--img"
									src={backdrop_path ? `${BASE_IMG_URL}/${backdrop_path}` : FALLBACK_IMG_URL}
									alt={fallbackTitle}
								/>
								<div className="Modal__image--buttonswrp">
									<Link
										className="Modal__image--button"
										onClick={handlePlayAnimation}
										to={'/play'}
									>
										<FaPlay />
										<span>Play</span>
									</Link>
									{!isFavourite
										? (
											<button className='Modal__image--button-circular' onClick={handleAdd}>
												<FaPlus />
											</button>
										): (
											<button className='Modal__image--button-circular' onClick={handleRemove}>
												<FaMinus />
											</button>
										)}
								</div>
							</div>
							<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit" className="Modal__info--wrp">
								<motion.h3 variants={modalFadeInUpVariants} className="Modal__info--title">{fallbackTitle}</motion.h3>
								<motion.p variants={modalFadeInUpVariants} className="Modal__info--description">{overview}</motion.p>
								<motion.hr variants={modalFadeInUpVariants} className="Modal__info--line"/>
								<motion.h4 variants={modalFadeInUpVariants} className="Modal__info--otherTitle">Info on <b>{fallbackTitle}</b></motion.h4>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Genres: </span>
									<span className="Modal__info--row-description">{joinedGenres}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>
										{release_date ? "Release date: " : "First air date: "}
									</span>
									<span className="Modal__info--row-description">{reducedDate}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Average vote: </span>
									<span className="Modal__info--row-description">{vote_average || "Not available"}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Original language: </span>
									<span className="Modal__info--row-description">{capitalizeFirstLetter(original_language)}</span>
								</motion.div>
								<motion.div variants={modalFadeInUpVariants} className="Modal__info--row">
									<span className='Modal__info--row-label'>Age classification: </span>
									<span className="Modal__info--row-description">{maturityRating}</span>
								</motion.div>
							</motion.div>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

export default DetailModal
