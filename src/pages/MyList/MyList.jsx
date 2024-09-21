import "./myList.scss"
import Poster from "../../components/Poster/Poster";
import Credits from "../../components/Credits/Credits";
import { motion } from "framer-motion";
import { staggerHalf, defaultPageFadeInVariants } from "../../motionUtils";
import { useSelector } from "react-redux"
import { selectFavouritesList } from "../../redux/favourites/favourites.selectors"

// a component that renders the list of favourites of the user
const MyList = () => {
    // useSelector hook is used to extract the favorite list from the redux store 
    // selectFavouritesList is an imported selector function that returns the favorites list
    const favs = useSelector(selectFavouritesList);

    return (
        <motion.div //wrapper div that uses fade in animation
            className="MyList"
            variants={defaultPageFadeInVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {favs && favs.length > 0 && (
                <h2 className="MyList__title">My List</h2> //title if favorite list is not empty 
            )}
            <motion.div  //wrapper div that uses stagger animation
                className="MyList__wrp"
                variants={staggerHalf}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {favs && favs.length > 0  //renders the list of favorites (if exists and not empty)
                    ? favs.map(result => (
                        <Poster //displays a poster component for each favorite item
                            key={result.id}
                            item={result}
                            {...result}
                        />
                    ))
                    : ( // a message for the user if their favorite list is empty
                        <h2 className="MyList__title">
                            Sorry, you don&apos;t have a favourite movie or tv-show yet.
                        </h2>
                    )
                }
            </motion.div>
            <Credits />
        </motion.div>
    )
}

export default MyList