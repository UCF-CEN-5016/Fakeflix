import "./navbar.scss";
import { useState, useRef } from "react";
import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";
import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../motionUtils";
import { LOGO_URL, MOBILE_LOGO_URL, PROFILE_PIC_URL } from "../../requests";
import { FaCaretDown } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/auth/auth.selectors";
import { signOutStart } from "../../redux/auth/auth.actions";


/** 
 * Navbar is a component for navigating between pages on FakeFlix. 
 * It includes links to different sections, a search bar, and the user profile with sign-out functionality.
*/

const Navbar = () => {
	const { width } = useViewport();
	const isScrolled = useScroll(70);
	//way to keep state of the dropdown navbar menu if its on or off
	const [genresNav, setGenresNav] = useState(false);

	//way to keep state of the dropdown signout menu if its on or off
	const [profileNav, setProfileNav] = useState(false);
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();


	//if discover dropdown menu is displayed and you click out side of it  will close
	useOutsideClick(genresNavRef, () => {
		if (genresNav) setGenresNav(false);
	});
	//if profile modal is displayed and you click out side of it the modal will close
	useOutsideClick(profileNavRef, () => {
		if (profileNav) setProfileNav(false);
	});

	return (
		<>
		{/*motion.nav fades in the nav bar for effect*/}
			<motion.nav
				className={`Navbar ${isScrolled && "Navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
			{/* Clicking the logo routes to the home page ("/"). 
   				 The logo image is responsive: it shows LOGO_URL for screens ≥ 600px, 
   				 and MOBILE_LOGO_URL for smaller screens. */}

				<Link to="/">
					<img className="Navbar__logo" src={width >= 600 ? LOGO_URL : MOBILE_LOGO_URL} alt="" />
				</Link>

			{/* Navbar links are displayed inline for screens ≥ 1024px.
    		On smaller screens, the links appear in a dropdown under "Discover". */}

		

				{width >= 1024 ? (
					<ul className="Navbar__primarynav Navbar__navlinks">
						<li className="Navbar__navlinks--link">
							{/*
							Nav Link is used to navigate to a specific url for this one it is for the /browse route

							when route selected the font weight of that route in navbar becomes heavier
							when hovvered over the route in navbar goes greyish
							other wise its normal style with white and lighter font wieght
							*/}
							<NavLink to="/browse" activeClassName="activeNavLink">
								Home
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							{/* Routes to the TV Page Found in src/pages/TVSeries/TVSeries.jsx*/}
							<NavLink to="/tvseries" activeClassName="activeNavLink">
								TV Series
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							{/* Routes to the Movies Found in src/pages/Movies/Movies.jsx*/}
							<NavLink to="/movies" activeClassName="activeNavLink">
								Movies
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							{/* Routes to the New & Popular Page Found in src/pages/Popular/Popular.jsx*/}
							<NavLink to="/popular" activeClassName="activeNavLink">
								New & Popular
							</NavLink>
						</li>
						<li className="Navbar__navlinks--link">
							{/* Routes to the MyList Page Found in src/pages/MyList/MyList.jsx*/}
							<NavLink to="/mylist" activeClassName="activeNavLink">
								My list
							</NavLink>
						</li>
					</ul>
				) : (
					<div
						className={`Navbar__primarynav Navbar__navlinks ${isScrolled && "Navbar__primarynav--scrolled"}`}
						onClick={() => setGenresNav(!genresNav)}
					>
						<span className="Navbar__navlinks--link">Discover</span>

						{/* Will toggle the drop menu for the nav bar*/}
						<FaCaretDown className="Navbar__primarynav--toggler Navbar__primarynav--caret" />
						<div
							className={`Navbar__primarynav--content ${genresNav ? "active" : ""}`}
						>
							{/*
							This is the same logic as for the 1024 width nav its jusr styled here in drop down menu instead
							If Active Display dropdown if not dont
							*/}
							
							{genresNav && (
								<ul
									className="Navbar__primarynav--content-wrp"
									ref={genresNavRef}
								>
									<li className="Navbar__navlinks--link">
										<NavLink to="/browse" activeClassName="activeNavLink">
											Home
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/tvseries" activeClassName="activeNavLink">
											TV Series
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/movies" activeClassName="activeNavLink">
											Movies
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/popular" activeClassName="activeNavLink">
											New & Popular
										</NavLink>
									</li>
									<li className="Navbar__navlinks--link">
										<NavLink to="/mylist" activeClassName="activeNavLink">
											My list
										</NavLink>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
				<div className="Navbar__secondarynav">
					
					<div className="Navbar__navitem">
						{/* Searchbar component for handling searches shows a magnifying glass icon*/}
						<Searchbar />
					</div>
					<div className="Navbar__navitem">

						{/* Toggle dropdown for user profile, with sign-out functionality. */}

						<div
							className={`Navbar__navprofile ${profileNav && "active"}`}
							onClick={() => {
								
								setProfileNav(!profileNav)
								}}
						>
							{/*Loads the fakeflix avatar for user*/}
							<img
								className="Navbar__navprofile--avatar Navbar__navprofile--toggler"
								src={currentUser && currentUser.photoURL ? currentUser.photoURL : PROFILE_PIC_URL}
								alt="Profile Picture"
							/>
							<FaCaretDown className="Navbar__navprofile--toggler Navbar__navprofile--caret" />
							<div className={`Navbar__navprofile--content ${profileNav ? "active" : ""}`}>
								{/*If profileNav active display mini modal that allows user to signout*/}
								{profileNav && (
									<ul
										className="Navbar__navprofile--content-wrp"
										ref={profileNavRef}
									>
										{/*Signs out curretn user*/}
										{currentUser && (
											<li
												className="Navbar__navlinks--link"
												onClick={() => dispatch(signOutStart())}
											>
												Sign Out
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
};

export default Navbar;
