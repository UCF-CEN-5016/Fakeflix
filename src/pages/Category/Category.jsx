// Main Functionality: This file creates a page to display all movies within a given category.
// These pages are created when a user clicks "Show All" next to a category title. 

import "./category.scss"
import Poster from "../../components/Poster/Poster";
import SkeletonPage from "../../components/SkeletonPage/SkeletonPage";
import SkeletonPoster from "../../components/SkeletonPoster/SkeletonPoster";
import { motion } from "framer-motion";
import { staggerHalf } from "../../motionUtils";
import { useState } from "react";
import { useRetrieveCategory } from "../../hooks/useRetrieveCategory";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useLazyLoad from "../../hooks/useLazyLoad";

//  Function creates a page to display all movies for a certain category
const Category = ({ match }) => {
    const [page, setPage] = useState(2);
    const { url } = match;
    const slicedUrl = url.split("/");
    const { categoryName } = useParams();
    const categoryData = useRetrieveCategory(slicedUrl[1], categoryName, page); // Finds category name on the specfic page the user was on
    const preventUndefinedSelector = () => undefined;
    const selector = categoryData ? categoryData.selector : preventUndefinedSelector;
    const selectedGenre = useSelector(selector);
    const handleLoadMore = () => setPage(page => page + 1);
    const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);

    return (
        <div className="Category">
            {categoryData ? (
                <>
                    {/*Category name displayed above all the movies*/}
                    <h2 className="Category__title">{categoryData.title}</h2> 

                    {/* Organizes movies in a grid format */}
                    <motion.div
                        className="Category__wrp"
                        variants={staggerHalf}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* For all the data/movies in the selectedGenre.data array, create a poster for each movie */}
                        {selectedGenre.data && selectedGenre.data.length > 0
                            && selectedGenre.data.map(result => (
                                <Poster
                                    key={result.id}
                                    item={result}
                                    {...result}
                                />
                            ))
                        }
                        
                        {/* When the data is loading, display the category title and an empty SkeletonPoster */}
                        {selectedGenre.loading && <div className='Category__subtitle'><SkeletonPoster /></div>}

                        {/* If an error occurs, display the category title and "Oops, an error occurred."*/}
                        {selectedGenre.error && <div className='Category__subtitle'>Oops, an error occurred.</div>}

                        
                        <div className={`Category__endPage ${isIntersecting ? 'intersected' : null}`} ref={endPageRef} />
                    </motion.div>
                </>
            ) : <SkeletonPage />}
        </div>
    )
}

export default Category
