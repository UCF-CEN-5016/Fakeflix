import "./search.scss"
import Poster from "../../components/Poster/Poster";
import { motion } from "framer-motion";
import { staggerHalf } from "../../motionUtils";
import { useSelector } from "react-redux";
import { selectSearchInputValue } from "../../redux/search/search.selectors";

/**
 * Search Page
 * 
 * After user inputs a title they want to search render a separate page.
 * 
 * If title exist display results with an animation, map through all the results
 * and render each one as a component.
 * 
 * If the title doesn't exist display a message across the page.
 *
 * @returns {JSX.Element}
 */

const Search = searchResults => {
	const { results } = searchResults;
	const selectInputValue = useSelector(selectSearchInputValue);

	return (
		<div className="Search">
			{/* Render the users input search title if there are results */}
			{results && results.length > 0 && (
				<h2 className="Search__title">Search results for: {selectInputValue}</h2>
			)}
			<motion.div
				className="Search__wrp"
				variants={staggerHalf}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{/* Map through the results and render each one as a Poster component */}
				{results && results.length > 0
					? results.map(result => (
						<Poster
							key={result.id}
							item={result}
							{...result}
						/>)
					)
					: (
						// If no results exist display message
						<h2 className="Search__title">
							Sorry, we searched everywhere but we did not found any movie or tv-show with that title.
						</h2>
					)
				}
			</motion.div>
		</div>
	);
}

export default Search
