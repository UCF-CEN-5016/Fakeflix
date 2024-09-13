import "./banner.scss";
import React from "react";
import { motion } from "framer-motion";
import { staggerOne, bannerFadeInLoadSectionVariants, bannerFadeInVariants, bannerFadeInUpVariants } from "../../motionUtils";
import { BASE_IMG_URL } from "../../requests";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { randomize, truncate } from "../../utils";
import { Link } from "react-router-dom";
import SkeletonBanner from "../SkeletonBanner/SkeletonBanner";
import { useDispatch, useSelector } from "react-redux";
import { showModalDetail } from "../../redux/modal/modal.actions";
import { selectTrendingMovies, selectNetflixMovies } from "../../redux/movies/movies.selectors";
import { selectNetflixSeries } from "../../redux/series/series.selectors";

/**
 * A Banner component that displays a highlighted content on a page. This is the large preview of a movie or tv show displayed at the top of the home page, for example.
 * 
 * @component
 * @param {Object} props - The component accepts a single prop: type
 * @param {string} props.type - The type of highlighted content to use. The value can be "movies" or "series" to indicate trending movies and netflix series, respectively. Any other value will default to netflix movies.
 * @returns {JSX.Element} The rendered Banner component
 * 
 * @example
 * <Banner type='movies' />
 */
const Banner = ({ type }) => {
	let selector;
	switch (type) {
		case "movies":
			selector = selectTrendingMovies;
			break;
		case "series":
			selector = selectNetflixSeries;
			break;
		default:
			selector = selectNetflixMovies;
			break;
	}

	const myData = useSelector(selector);
	const { loading, error, data: results } = myData;
	const finalData = results[randomize(results)];
	const fallbackTitle = finalData?.title || finalData?.name || finalData?.original_name;
	const description = truncate(finalData?.overview, 150);
	const dispatch = useDispatch();

  // A handler function for clicking the play button.
  // This calls the stopPropagation() method to prevent the click event from propagating up the node tree.
  // There is no logic for playing videos since FakeFlix is not intended to do so.
	const handlePlayAnimation = event => {
		event.stopPropagation();
	};

	const handleModalOpening = () => {
		dispatch(showModalDetail({ ...finalData, fallbackTitle }));
	}

	return (
		<>
			<motion.section
				variants={bannerFadeInLoadSectionVariants}
				initial='initial'
				animate='animate'
				exit='exit'
				className="Banner__loadsection"
			>
				{loading && <SkeletonBanner />}
				{error && <div className="errored">Oops, an error occurred.</div>}
			</motion.section>

			{!loading && finalData && (
				<motion.header
					variants={bannerFadeInVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					className="Banner"
					style={{backgroundImage: `url(${BASE_IMG_URL}/${finalData?.backdrop_path})`}}
				>
					<motion.div
						className="Banner__content"
						variants={staggerOne}
						initial='initial'
						animate='animate'
						exit='exit'
					>
						<motion.h1 variants={bannerFadeInUpVariants} className="Banner__content--title">{fallbackTitle}</motion.h1>
						<motion.div variants={bannerFadeInUpVariants} className="Banner__buttons">
							<Link
								className="Banner__button"
								onClick={handlePlayAnimation}
								to={"/play"}
							>
								<FaPlay />
								<span>Play</span>
							</Link>
							<button
								className="Banner__button"
								onClick={handleModalOpening}
							>
								<BiInfoCircle size="1.5em" />
								<span>More info</span>
							</button>
						</motion.div>
						<motion.p variants={bannerFadeInUpVariants} className="Banner__content--description">{description}</motion.p>
					</motion.div>
					<div className="Banner__panel" />
					<div className="Banner__bottom-shadow" />
				</motion.header>
			)}
		</>
	)
}

export default React.memo(Banner);