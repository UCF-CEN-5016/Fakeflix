// This file defines the Auth component responsible for rendering the authentication page.
// It allows users to toggle between Sign In and Sign Up forms, with animations and error handling.
// The component uses Framer Motion for smooth transitions and Redux to handle authentication errors.

// Import necessary dependencies and styles for the Auth component
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import { authFadeInUpVariants, authPageFadeInVariants, modalVariants, staggerOne } from "../../motionUtils";
import { selectAuthErrors } from "../../redux/auth/auth.selectors";
import { LOGO_URL, SIGNIN_BGIMG_URL } from "../../requests.js";
import "./auth.scss";

// Auth component: Manages the authentication page with the ability to toggle between Sign In and Sign Up forms
const Auth = () => {
  // useState hook to manage the toggle between Sign In and Sign Up forms
  const [isSignedUp, setIsSignedUp] = useState(true);
  
  // useSelector hook to fetch authentication errors from the Redux store
  const authError = useSelector(selectAuthErrors);

  return (
    // Framer Motion animation wrapper for the authentication page
    <motion.div
      className="Auth"
      variants={authPageFadeInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background and opacity layers for the page */}
      <div className="Auth__opacityLayer" />
      <div className="Auth__bgLayer" style={{ backgroundImage: `url(${SIGNIN_BGIMG_URL})` }} />
      
      {/* Logo linking to the home page */}
      <Link to="/" className="Auth__logo">
        <img className="Auth__logo--img" src={LOGO_URL} alt="Fakeflix_logo" />
      </Link>

      {/* Main content area with form toggling and animations */}
      <motion.div
        className="Auth__content"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div variants={staggerOne} initial="initial" animate="animate" exit="exit">
          {/* Page title that changes based on the sign-in or sign-up state */}
          <motion.h2 variants={authFadeInUpVariants} className="Auth__content--title">
            {isSignedUp ? "Sign In" : "Sign Up"}
          </motion.h2>
          
          {/* Disclaimer about the page being a mock interface */}
          <motion.small variants={authFadeInUpVariants} className="Auth__content--disclaimer">
            {`Pay attention: this is not the original Netflix ${isSignedUp ? "sign in" : "sign up"}. Don't insert your real credentials here!`}
          </motion.small>

          {/* Conditionally render SignIn or SignUp form based on isSignedUp state */}
          {isSignedUp ? <SignIn /> : <SignUp />}
          
          {/* Display authentication error if it exists */}
          {authError && <motion.p variants={authFadeInUpVariants} className='Auth__content--errors'>{authError}</motion.p>}

          {/* Divider line between form and toggle view */}
          <motion.hr variants={authFadeInUpVariants} className="Auth__content--divider" />

          {/* Toggle link to switch between Sign In and Sign Up */}
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
