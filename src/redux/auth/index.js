// This file defines the authReducer function, which handles authentication-related actions 
// in the application. It manages the state for user authentication, including sign-in, sign-up, 
// and sign-out processes, as well as loading and error states.
import { authActionTypes } from "./auth.types"


// Initialize the application's state
// currentUser: stores the current user's information, initially set to null
// error: holds any error messages, initially set to null
// loading: indicates whether an operation like login or signup is in progress, initially set to false
const initialState = {
    currentUser: null,
    error: null,
    loading: false
}
// Define the authReducer function to manage the state based on the action type
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle the start of the sign-in or signup process
        case authActionTypes.EMAIL_SIGN_IN_START:
        case authActionTypes.GOOGLE_SIGN_IN_START:
        case authActionTypes.ANONYMOUS_SIGN_IN_START:
        case authActionTypes.SIGN_UP_START:
            return {
                ...state,    // Spread the current state
                loading: true    // Set loading to true to indicate the process has started
            }
        // Handle successful sign-in
        case authActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,    // Spread the current state
                currentUser: action.payload,    // Update the current user with the data from the action
                loading: false,    // Set loading to false as the process has completed
                error: null    // Clear any existing errors
            }
        // Handle successful sign-out
        case authActionTypes.SIGN_OUT_SUCCESS:    
            return {
                ...state,    // Spread the current state
                currentUser: null,    // Clear the current user
                loading: false,    // Set loading to false as the process has completed
                error: null    // Clear any existing errors
            }
        // Handle failed sign-in, signup, or sign-out
        case authActionTypes.SIGN_IN_FAILURE:
        case authActionTypes.SIGN_UP_FAILURE:
        case authActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,    // Spread the current state
                error: action.payload,    // Update the error state with the data from the action
                loading: false    // Set loading to false as the process has completed
            }
        // Return the unchanged state if no action types match
        default:
            return state
    }
}
// Export the authReducer function for use in other files
export default authReducer
