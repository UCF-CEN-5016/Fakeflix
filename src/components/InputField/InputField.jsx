/*  This component InputField is used throughtout the application to take in different user input, the
    InputField is highly customizable using the different parameters. Depending on the required type of user 
    input a different validation method is used to ensure proper user input.  
*/

import "./inputField.scss"

// Function used for gathering all user inputs throughout the site, can be customized using the different parameters
// Displays specific error messages dynamic error messages for different types of input data, e.g password, email, etc...
//           Parameters and how they are used as follows:
//              type = used to determine the type of input, e.g. text
//              placeholder = used as placeholder text to be displayed until enters input
//              name = used to name the input field
//              additionalClass = used to hide or display input field depending on show condition
//              validationMessage = used to store errors depending on validation
//              validation = used with different validation functions with user inputs compared to a RegEXP, e.g. email
//              errors = used to display different error messages
//              disabled = used to disable the input field depending on conditional value
const InputField = ({
    type,
    placeholder,
    name,
    additionalClass,
    validationMessage,
    validation,
    errors,
    disabled
}) => {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`InputField
                    ${errors?.[name] && "Input--error"}
                    ${additionalClass && additionalClass}
                `}
                ref={validation}
                disabled={disabled}
            />
            {errors?.[name] && (
                <p className="InputField__label">{validationMessage}</p>
            )}
        </>
    )
}

export default InputField
