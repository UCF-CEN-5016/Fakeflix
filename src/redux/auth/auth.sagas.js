import { takeLatest, all, put, call } from "redux-saga/effects";
import { authActionTypes } from "./auth.types";
import { auth, createUserProfileDocument, getCurrentUser, googleProvider } from "../../firebase/firebaseUtils";
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./auth.actions";

// auth.sagas.js
//
// This file defines functions that use Redux Saga to handle user authentication.
// Redux sagas are used in React-Redux applications to handle asynchronous communication
// with external resources (in this case, authentication through Firebase).
//
// More info and documentation here:
// https://redux-saga.js.org/

//------------------------------------------------------------------------------
// The sagas below are "worker" sagas that perform the actual actions that
// are to be taken in response to events.  These sagas are triggered by the
// "watcher" sagas that are defined later.

// getSnapshotFromUserAuth
// This saga is invoked after sign-in to retrieve user data from 
// Firebase.  If this succeeds, it dispatches a success action with the
// user data.  If it fails, it dispatches a failure message.
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

// signInWithGoogle
// This saga handles sign-in via Google authentication.
// On successful sign-in, it dispatches an action to retrieve user data.
// On failure, it dispatches a sign-in failure message.
export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

// signInWithEmail
// This saga handles sign-in via e-mail address authentication.
// On successful sign-in, it dispatches an action to retrieve user data.
// On failure, it dispatches a sign-in failure message.
export function* signInWithEmail({payload: { email, password }}) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

// signInAnonymously
// This saga handles anonymous sign-in through Firebase.
// On successful sign-in, it dispatches an action to retrieve user data.
// On failure, it dispatches a sign-in failure message.
export function* signInAnonymously() {
	try {
		const { user } = yield auth.signInAnonymously();
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

// checkIfUserIsAuthenticated
// This saga checks whether a user is currently authenticated.
// It does this by attempting to retrieve the current user.  If that
// succeeds, it then retrieves the user data.
// On failure, it dispatches a sign-in failure message.
export function* checkIfUserIsAuthenticated(){
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

// signOut
// This saga signs out a user from their Firebase authentication.
// On success, it dispatches a sign-out success action.
// On failure, it dispatches a sign-out failure action with a message.
export function* signOut(){
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (e) {
		yield put(signOutFailure(e.message));
	}
}

// signUp
// This saga handles the process of user registration through Firebase.
// It creates a new user, and on success dispatches a success action with the user data.
// Registration failure should throw an exception, which is caught here
// and handled by dispatching a failure action with a message.
export function* signUp({payload: { displayName, email, password }}){
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password);
		yield put(signUpSuccess({ user, additionalData: { displayName } }))
	} catch (e) {
		yield put(signUpFailure(e.message));
	}
}

// signInAfterSignUp
// This saga automatically signs the user in after sign-up.
// It receives the user data from the signUp function via onSignUpSuccess.
export function* signInAfterSignUp({payload: { user, additionalData }}){
	yield getSnapshotFromUserAuth(user, additionalData);
}

//------------------------------------------------------------------------------
// The sagas below are "watcher" sagas that watch for specific Redux actions
// to be dispatched and then trigger the appropriate worker saga.

// onCheckUserSession
// This saga watches for the CHECK_USER_SESSION action, and then triggers
// the checkIfUserIsAuthenticated worker saga.
export function* onCheckUserSession(){
	yield takeLatest(authActionTypes.CHECK_USER_SESSION, checkIfUserIsAuthenticated);
}

// onGoogleSignInStart
// This saga watches for the GOOGLE_SIGN_IN_START action, and then triggers
// the signInWithGoogle worker saga.
export function* onGoogleSignInStart(){
	yield takeLatest(authActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// onEmailSignInStart
// This saga watches for the EMAIL_SIGN_IN_START action, and then triggers
// the signInWithEmail worker saga.
export function* onEmailSignInStart(){
	yield takeLatest(authActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// onAnonymousSignInStart
// This saga watches for the ANONYMOUS_SIGN_IN_START action, and then triggers
// the signInAnonymously worker saga.
export function* onAnonymousSignInStart(){
	yield takeLatest(authActionTypes.ANONYMOUS_SIGN_IN_START, signInAnonymously);
}

// onSignOutStart
// This saga watches for the SIGN_OUT_START action, and then triggers
// the signOut worker saga.
export function* onSignOutStart(){
	yield takeLatest(authActionTypes.SIGN_OUT_START, signOut);
}

// onSignUpStart
// This saga watches for the SIGN_UP_START action, and then triggers
// the signUp worker saga.
export function* onSignUpStart(){
	yield takeLatest(authActionTypes.SIGN_UP_START, signUp);
}

// onSignUpSuccess
// This saga watches for the SIGN_UP_SUCCESS action, and then triggers
// the signInAfterSignUp worker saga.
export function* onSignUpSuccess(){
	yield takeLatest(authActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// authSagas
// This is the "root saga" that consolidates all authentication-related
// sagas into a single entry point.  It yields the "all" effect to run all
// of the watcher sagas concurrently.  Those sagas will then trigger the
// worker sagas in response to actions. 
export function* authSagas() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onAnonymousSignInStart),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}