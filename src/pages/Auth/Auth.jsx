import "./auth.scss";
import { useState } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerOne, authFadeInUpVariants, modalVariants, authPageFadeInVariants } from "../../motionUtils";
import { LOGO_URL, SIGNIN_BGIMG_URL } from "../../requests.js";
import { useSelector } from "react-redux";
import { selectAuthErrors } from "../../redux/auth/auth.selectors";


/**
 * Creates the first page a user arrives to when navigating to Fakeflix, the sign in/ sign up page.
 * 
 * This page is consisted of two main divs:
 * 		
 * 	1. The Auth div which sets the background of the page along with the fakeflix logo.
 * 	2. The Auth__content div, which is nested in Auth, which contains all the user sign in 
 * 	   and sign up information. Respective sign in or sign up forms are shown based on the
 * 	   user sign up state.
 * 
 * @returns {JSX.Element}
 */
const Auth = () => {
	// Sets whether the user is signed up or not and whether there were any auth erors.
	const [isSignedUp, setIsSignedUp] = useState(true);
	const authError = useSelector(selectAuthErrors);

	return (
		<motion.div
			className="Auth"
			variants={authPageFadeInVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{/* Darkens the background image. */}
			<div className="Auth__opacityLayer" />
			{/* Sets the background image to the image found at SIGNIN_BGIMG_URL. */}
			<div className="Auth__bgLayer" style={{ backgroundImage: `url(${SIGNIN_BGIMG_URL})` }} />
			{/* Sets the logo at the top left of the page, with its image found at LOGO_URL. */}
			<Link to="/" className="Auth__logo">
				<img className="Auth__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
			</Link>

			{/* Div that user interacts with, containing sign in forms. Animated based on
				details found in modalVariants. */}
			<motion.div
				className="Auth__content"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				{/* Div that contains all the different buttons an input fields. Animates based
					on the information contained in stagger one so children come in from the bottom
					one by one. */}
				<motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit">
					{/* Sets the title at the top of the component based on sign up state. */}
					<motion.h2 variants={authFadeInUpVariants} className="Auth__content--title">
						{isSignedUp ? "Sign In" : "Sign Up"}
					</motion.h2>
					{/* Sets disclaimer, also based on sign up state */}
					<motion.small variants={authFadeInUpVariants} className="Auth__content--disclaimer">
						{`Pay attention: this is not the original Netflix ${isSignedUp ? "sign in" : "sign up"}. Don't insert your real credentials here!`}
					</motion.small>
					{/* Based on signed up state, shows user input fields to sign in or sign up. */}
					{isSignedUp ? <SignIn /> : <SignUp />}
					{/* Displays any authentication related errors, such as invalid logins. */}
					{authError && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{authError}</motion.p>}
					{/* Sets the divider between the user input forms/ buttons and sign up state changer. */}
					<motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" />
					{/* Sets the prompt at the bottom of the component which prompts the user to 
						either sign in or sign up, the opposite of the current sign up state.
						Additionally, creates a button allowing to toggle sign up state. */}
					<motion.small variants={authFadeInUpVariants} className="Auth__content--toggleView">
						{isSignedUp
							? `Haven't you registered yet? `
							: "Do you already have an account? "}
						<span className="toggler" onClick={() => setIsSignedUp(!isSignedUp)}>
							{isSignedUp ? "Sign Up" : "Sign In"}
						</span>
					</motion.small>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default Auth;
