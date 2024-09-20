import { useState, useEffect, useCallback, useRef } from "react";

/*
    useLazyLoad serves as a custom hook that allows for lazy loading in a webpage
*/

const useLazyLoad = (customCallback) => {
    const endPageRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const currentRef = endPageRef.current;

    // ensures callback function isn't recreated on each render unless dependencies change
    const callbackFunction = useCallback((entries) => {
        // array of IntersectionObserverEntry objects 
        const [entry] = entries;

        // updates the state based on whether or not the element intersects with the viewport 
        // if the element is intersecting, call the custom callback passed to the hook
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) customCallback();

    }, [customCallback])

    // manages the IntersectionObserver lifecycle 
    useEffect(() => {
        // an IntersectionObserver is created with the provided callback function 
        const observer = new IntersectionObserver(callbackFunction)
        // if the ref is set, start observing he referenced element 
        if (currentRef) observer.observe(currentRef)

        // cleanup function: stop observing the element when it is no longer relevant 
        return () => {
            if (currentRef) observer.unobserve(currentRef)
        }
    }, [currentRef, callbackFunction])
    // return the ref (to be attached to a DOM element) and the intersection state
    return [endPageRef, isIntersecting];
}

// exports the custom hook to be used by other components
export default useLazyLoad;