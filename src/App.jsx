import {useReducer} from 'react';
import DigitButton from './DigitButton';
import './styles.css';
import OperationButton from "./OperationButton.jsx";

// Define what the calculator is supposed to do and store in constant variables
export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CLEAR: 'clear',
    CHOOSE_OPERATION: 'choose-operation',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate',
}

// Reducer function to define the logic for the state and logic it carries
function reducer(state, {type, payload}) {
// Switch statement to handle different actions
    switch (type) {
        case ACTIONS.ADD_DIGIT: // Case for adding a digit
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }
            // If "0" is the initial number pressed, do nothing on subsequent "0" presses
            if (payload.digit === "0" && state.currentOperand === "0") {
                return state
            }
            // If "." is already pressed, do nothing on next "." selection
            if (payload.digit === "." && (state.currentOperand == null || state.currentOperand.includes("."))) {
                return state
            }
            // Otherwise concatenate the digit to the current pressed digit
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
        // Case for choosing an operator symbol
        case ACTIONS.CHOOSE_OPERATION:
            // If both current and previous operands are null, do nothing
            if (state.currentOperand == null && state.previousOperand == null) {
                return state
            }
            // If current operand is null, update the operation
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            // If previous operand is null, set it to the current operand and reset the current operand.
            if (state.previousOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }
            // Evaluate the expression and update the state with the result
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null
            }
        // Case for clearing the state
        case ACTIONS.CLEAR:
            return {}
        // Case for deleting a digit
        case ACTIONS.DELETE_DIGIT:
            // If overwrite mode is on, clear the current operand
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            // If the current operand is null, do nothing
            if (state.currentOperand == null) return state
            // If the current operand has only one character, clear it
            if (state.currentOperand.length === 1) {
                return {
                    ...state,
                    currentOperand: null
                }
            }
            // Otherwise remove the last character from the current operand
            return  {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }
        // Case for evaluating the expression
        case ACTIONS.EVALUATE:
            // If any of the necessary values are null, do nothing
            if (state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state
            }
            // Evaluate the expression and update the state with the result
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            }
    }
}
// Function to evaluate the expression based on the currentOperand, previousOperand, and operation
function evaluate({currentOperand, previousOperand, operation}) {
    // Convert the previous and current operands to floating-point numbers
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    // Check if either prev or current is not a valid number
    if (isNaN(prev) || isNaN(current)) {
        // If not valid numbers, return empty string
        return ""
    }

    // Variable to store the result of the computation
    let computation = ""

    // Switch statement to perform the computation based on the operation
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "÷":
            computation = prev / current
            break
    }
    // Convert result to string and return
    return computation.toString()
}
// Formatting the numbers for readability
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
})

// Function to format the operand, convert to a formatted string
function formatOperand(operand) {
    // If the operand is null, return undefined
    if (operand == null) return

    // Split the operand into integer and decimal parts using the dot as the seperator
    const [integer, decimal] = operand.split('.');
    // If there is no decimal part, format the integer using the INTEGER_FORMATTER
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    // If there is a decimal part, format both and concatenate them
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function App() {
    // useReducer hook to create the variables currentOperand, previousOperand, operation, and dispatch.
    // Will help manage and update the state of the calculator
    const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
            </div>
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
            <OperationButton operation={"÷"} dispatch={dispatch}/>
            <DigitButton digit={"7"} dispatch={dispatch}/>
            <DigitButton digit={"8"} dispatch={dispatch}/>
            <DigitButton digit={"9"} dispatch={dispatch}/>
            <OperationButton operation={"*"} dispatch={dispatch}/>
            <DigitButton digit={"4"} dispatch={dispatch}/>
            <DigitButton digit={"5"} dispatch={dispatch}/>
            <DigitButton digit={"6"} dispatch={dispatch}/>
            <OperationButton operation={"-"} dispatch={dispatch}/>
            <DigitButton digit={"1"} dispatch={dispatch}/>
            <DigitButton digit={"2"} dispatch={dispatch}/>
            <DigitButton digit={"3"} dispatch={dispatch}/>
            <OperationButton operation={"+"} dispatch={dispatch}/>
            <DigitButton digit={"."} dispatch={dispatch}/>
            <DigitButton digit={"0"} dispatch={dispatch}/>
            <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
        </div>
    );
}

export default App
