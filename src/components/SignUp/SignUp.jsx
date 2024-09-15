import "./signUp.scss";
import InputField from "../InputField/InputField";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../motionUtils";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../redux/auth/auth.actions";
import { selectAuthLoadingState } from "../../redux/auth/auth.selectors";

/**
 * SignUp component manages the user registration process.
 * It includes form fields for user display name, email, and password.
 * The form is validated and submission is handled by dispatching an action to the Redux store.
 *
 * The form submission is handled by the `onSubmit` function, which dispatches the `signUpStart` action with form data.
 * The component also displays a loading spinner while the registration process is ongoing.
 */

const SignUp = () => {
  // Redux dispatch function to dispatch actions to the store
  const dispatch = useDispatch();
  // Selector to retrieve the authentication loading state from the Redux store
  const isLoading = useSelector(selectAuthLoadingState);
  // useForm hook provides methods for handling form state and validation
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onTouched",
  });

  /**
   * Handles form submission by dispatching the `signUpStart` action with the form data.
   * @param {Object} data - The form data including displayName, email, and password.
   * @param {string} data.displayName - The user's display name.
   * @param {string} data.email - The user's email address.
   * @param {string} data.password - The user's password.
   */

  const onSubmit = (data) => {
    const { displayName, email, password } = data;
    dispatch(signUpStart({ displayName, email, password }));
  };

  return (
    <motion.form
      variants={staggerOne}
      initial="initial"
      animate="animate"
      exit="exit"
      className="SignUp__form"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Input field for the user's display name */}
      <motion.div
        variants={authFadeInUpVariants}
        className="SignUp__form--inputwrp"
      >
        <InputField
          type="text"
          name="displayName"
          placeholder="Your name"
          validationMessage="Please enter your name."
          validation={register({
            required: true,
            minLength: 2,
            maxLength: 60,
          })}
          errors={errors}
          disabled={isLoading}
        />
      </motion.div>
      {/* Input field for the user's email */}
      <motion.div
        variants={authFadeInUpVariants}
        className="SignUp__form--inputwrp"
      >
        <InputField
          type="text"
          name="email"
          placeholder="E-mail"
          validationMessage="Please enter a valid email address."
          validation={register({
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          errors={errors}
          disabled={isLoading}
        />
      </motion.div>
      {/* Input field for the user's password */}
      <motion.div
        variants={authFadeInUpVariants}
        className="SignUp__form--inputwrp"
      >
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
          errors={errors}
          disabled={isLoading}
        />
      </motion.div>
      {/* Input field for confirming the password */}
      <motion.div
        variants={authFadeInUpVariants}
        className="SignUp__form--inputwrp"
      >
        <InputField
          type="password"
          name="check_password"
          placeholder="Repeat your password"
          validationMessage="Passwords should match"
          validation={register({
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return (
                  (value && password === value) || "Passwords should match!"
                );
              },
            },
          })}
          errors={errors}
          disabled={isLoading}
        />
      </motion.div>
      {/* Submit button */}
      <motion.button
        type="submit"
        variants={authFadeInUpVariants}
        className={`SignUp__form--button button__submit ${
          isLoading && "loading"
        }`}
        disabled={isLoading}
      >
        {isLoading ? <Loader /> : "Sign Up"}
      </motion.button>
    </motion.form>
  );
};

export default SignUp;
