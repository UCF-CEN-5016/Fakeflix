import './signIn.scss';
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { emailSignInStart, googleSignInStart, anonymousSignInStart } from "../../redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoadingState } from "../../redux/auth/auth.selectors";


// SignIn component allows users to sign in with email/password, Google, or anonymously
// The email/password sign in is handled with onSubmit, which dispatches an action to Redux
// The component has two different states
// 		1. Loading: disables input fields and shows loaders for buttons
//		2. Not Loading: shows input fields and sign-in buttons


const SignIn = () => {
	const dispatch = useDispatch();
	
	// retrieve current loading state from Redux
	const isLoading = useSelector(selectAuthLoadingState);

	// initialize form handling with Redux useForm hook, and handles input validation whenever input is touched
	const { register, handleSubmit, errors } = useForm({
		mode: "onTouched"
	})


	// handles form submission when valid email and password are entered
	const onSubmit = data => {
		const { email, password } = data;
		dispatch(emailSignInStart({ email, password })); // dispatch action to sign in user with email/password
	}

	return (

		// Form for handling email/password sign-in
		<motion.form
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			className="SignIn__form"
			onSubmit={handleSubmit(onSubmit)} // handles form submission whenever form inputs are valid
		>
			{/* displays an email input field */}
			{/* validate email field with a regex format*/}
			<motion.div variants={authFadeInUpVariants} className="SignIn__form--inputwrp">
				<InputField
					type="text"
					name="email"
					placeholder="E-mail"
					validationMessage="Please enter a valid email address."
					validation={register({
						required: true,
						pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					})}
					errors={errors} // display email validation errors
					disabled={isLoading} // disable input if loading
				/>
			</motion.div>

			{/* displays a password input field */}
			{/* validate passsword field with a min and max length requirement*/}
			<motion.div variants={authFadeInUpVariants} className="SignIn__form--inputwrp">
				<InputField
					type="password"
					name="password"
					placeholder="Password"
					validationMessage="The password should have a length between 6 and 30 characters."
					validation={register({
						required: true,
						minLength: 6,
						maxLength: 30,
					})}
					errors={errors} // display password validation errors
					disabled={isLoading} // disable input if loading
				/>
			</motion.div>

			{/* Sign in button for submitting form */}
			{/* Display a loader while loading */}
			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__submit ${isLoading && 'loading'}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Sign in'}
			</motion.button>
			
			{/* Google sign in button */}
			{/* Display a loader while loading */}
			<motion.button
				type="button"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__google ${isLoading && 'loading'}`}
				onClick={() => dispatch(googleSignInStart())} // activates google sign in
				disabled={isLoading}
			>
				{!isLoading && <FcGoogle />}
				{isLoading ? <Loader /> : 'Sign in with Google'}
			</motion.button>

			{/* Anonymous sign-in button */}
			{/* Display a loader while loading */}
			<motion.button
				type="button"
				variants={authFadeInUpVariants}
				className={`SignIn__form--button button__anonymous ${isLoading && 'loading'}`}
				onClick={() => dispatch(anonymousSignInStart())} // activates anonymous sign in
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : 'Sign in anonymously'}
			</motion.button>
		</motion.form>
	)
}

export default SignIn;