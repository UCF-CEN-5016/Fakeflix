/**
 * @file utils.js
 * @description This file contains utility functions used throughout the application. 
 * These functions handle various operations including date manipulation, string formatting, 
 * and random number generation to facilitate common tasks across the project.
 */


/**
 * Gets the current date and subtracts one month from it, returning the updated date in YYYY-MM-DD format.
 * @returns {string} formattedDate - Updated month in YYYY-MM-DD format
 */
export const getOneMonthAgoReleaseDate = () => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);
    let formattedDate = date.toJSON().slice(0,10);

    return formattedDate;
}

/**
 * Takes a date object and returns only the year portion as a string in YYYY format.
 * @param {Date} date - Date object
 * @returns {any} - Returns the year in YYYY format
 */
export const dateToYearOnly = date => date.slice(0,4);

/**
 * Takes a string and capitalizes the first letter while keeping the rest of the text unchanged.
 * @param {string} text 
 * @returns text with first letter capitalized
 */
export const capitalizeFirstLetter = text => (
    text.charAt(0).toUpperCase() + text.slice(1)
);


/**
 * Returns a random index based on the length of the input data.
 * @param {any} data 
 * @returns {number} a random number
 */
export const randomize = data => (
    Math.floor(Math.random() * data.length - 1)
);

/**
 * Truncates a string to a specified length and appends an ellipsis if the string is longer than the specified length.
 * @param {string} text - Some text
 * @param {number} n - max length to be shown before truncation (exclusive)
 * @returns {*} truncated text
 * @example 
 * // n = 3, so test will be truncated at the 3rd letter.
 * truncate('test', 3) -> 'te...'
 */
export const truncate = (text, n) => (
    text?.length > n ? text.substr(0, n - 1) + "..." : text
);