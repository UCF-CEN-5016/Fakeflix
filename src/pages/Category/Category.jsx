/**
*List of imports that range from React hooks and css styling guides that will be used to create the Category page in FakeFlix
*These import also help with the rendering of the webpage as well as the logic behind the Category page
*/
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

/**
*Below is a constant variable defined as "Category". This variable doesn't define a constant value, but instead is a constant reference to a value.
*This means that if we have a constant array of Category, we can change the elements or properties of that array.
*Within the block scope of Category, we have more constant variables that either manage the state, logic, or interaction of the Category page.   
*/

const Category = ({ match }) => {             // match is a property of Category to show how a URL matches with a route definition 
    const [page, setPage] = useState(2);      // useState is meant to keep track of the application's state and in this case starts at page 2 
    const { url } = match;                    // match property is used on an entered URL to split data from the URL using slicedUrl array
    const slicedUrl = url.split("/");
    const { categoryName } = useParams();
    const categoryData = useRetrieveCategory(slicedUrl[1], categoryName, page);         //Using the name extracted from the react hook useParams(), categoryName, page, and slicedUrl[1] are passed to create categoryData with the useRetrieveCategory hook  
    const preventUndefinedSelector = () => undefined;                                   //This function is meant to catch exceptions where categoryData comes back as undefined/null and prevents the Redux store from being accessed early and cuasing errors  
    const selector = categoryData ? categoryData.selector : preventUndefinedSelector;   //Decides whether to use preventUndefinedSelector or not based on if categoryData is available to use   
    const selectedGenre = useSelector(selector);                                        //Selector hook finds the result of the Redux store's state to save the genre into the constant selectedGenre  
    const handleLoadMore = () => setPage(page => page + 1);                             //setPage hook increments the page by 1 when adding new data
    const [endPageRef, isIntersecting] = useLazyLoad(handleLoadMore);                   //This constant checks to see if the end of a page is reached with the endPageRef reference and isIntersecting boolean and the handleLoadMore function is called when true

    return (                                                                            //The Return statement displays the data provided in the Category constant with the styling from the category.scss file that was imported 
        <div className="Category">
            {categoryData ? (                                                           //Only renders the page if categoryData was successfuly fetched, if not a skeleton page is loaded as shown with <SkeletonPage /> at the end of the file  
                <>
                    <h2 className="Category__title">{categoryData.title}</h2>           //Displays the category title

                    <motion.div                                                         //Using the framer-motion library, the motion container allows for animations and styling
                        className="Category__wrp"                                       //Styles the Category page
                        variants={staggerHalf}                                          //Controls animation properties and behaviors
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {selectedGenre.data && selectedGenre.data.length > 0            //Contains array of category specific data to rendered on the poster component
                            && selectedGenre.data.map(result => (                       //map function iterates over the array in selectedGenre.data.map and makes a component for each item
                                <Poster
                                    key={result.id}
                                    item={result}
                                    {...result}
                                />
                            ))
                        }
                        {selectedGenre.loading && <div className='Category__subtitle'><SkeletonPoster /></div>}                 //Displays a skeleton poster while the render is loading the actual content of the page when true
                        {selectedGenre.error && <div className='Category__subtitle'>Oops, an error occurred.</div>}             //When true, an error message is displyed on the page when it can't retireve data
                        <div className={`Category__endPage ${isIntersecting ? 'intersected' : null}`} ref={endPageRef} />       //Detects when the user scrolls to the bottom of the page to load more data
                    </motion.div>
                </>
            ) : <SkeletonPage />}                                                                                               //Placeholder component for when the page is loading or when categoryData returns false
        </div>
    )
}

export default Category                                                                                                         //Makes part of the Category file available to use in other files or modules and is the default item that can be referenced without using its exact name
