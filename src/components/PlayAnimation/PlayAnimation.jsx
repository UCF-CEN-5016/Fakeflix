import "./playAnimation.scss"
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { TADUM_SOUND_URL } from "../../requests";

/** The purpsoe of this file is to trigger the Netflix *tadum* sound and animation and then reroute the user to the browing page. */

/** This is the main function that triggers everything in the file. */
const PlayAnimation = () => {

	let history = useHistory();
	const soundRef = useRef(null);

	/** This function's purpose is to play the tadum sound that soundRef references. */
	const handleTadum = () => {

		/** The purpose of the below lines is to make sure the *tadum sound plays from the beginning* */
		soundRef.current.currentTime = 0;
		soundRef.current.play();
	}

	/** An anonymous function is passed to the useEffect hook. This triggers the *tadum* sound and reroutes the user after 4.2 seconds. */
	useEffect(() => {
		handleTadum();
		setTimeout(() => {
			history.push('/browse')
		}, 4200)
	}, [history])

	/** This portion of the code renders the .jsx FAKEFLIX animation. */
	return (
		<div className='PlayAnimation__wrp'>
			<audio ref={soundRef} src={TADUM_SOUND_URL} />
			<span className="PlayAnimation__text">
				FAKEFLIX
			</span>
		</div>
	)
}

export default PlayAnimation
