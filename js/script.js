let display = document.querySelector(".display"); //selecting the main display

let operatorButtons = Array.from(document.querySelectorAll(".operator")) //selecting the array of all operator buttons
operatorButtons.forEach(button => button.addEventListener("click", operatorClicked)); //adding event listeners for all operator buttons

let clearButton = document.querySelector(".clear"); //selecting the clear button
clearButton.addEventListener("click", clearClicked); //adding event listener to clear button

const backspaceButton = document.querySelector(".backspace");//selecting the backspace button
backspaceButton.addEventListener("click", backspaceClicked); // adding event listener to backspace button

let miniDisplay = document.querySelector(".mini-display") //selecting the mini display

let numberButtons = Array.from(document.querySelectorAll(".numbers")); //selecting the array of all number buttons
numberButtons.forEach(number => number.addEventListener("click", numbersClicked)); //adding event listeners to all number buttons

let equalButton = document.querySelector(".equal") // selecting the mini
equalButton.addEventListener("click", equalClicked); //adding event listeners to equal button

document.addEventListener("keydown", numberFromKeyboard) //keydown event listener for keyboard support
    
document.addEventListener("keydown", operatorFromKeyboard)

// document.addEventListener("keydown", operatorFromKeyboard)


function numberFromKeyboard(e) {
    keyClicked = e.key;
    switch (keyClicked) {
        case "1":
            numbersClicked(e)
            break;
        case "2":
            numbersClicked(e)
            break;
        case "3":
            numbersClicked(e)
            break;
        case "4":
            numbersClicked(e)
            break;
        case "5":
            numbersClicked(e)
            break;
        case "6":
            numbersClicked(e)
            break;
        case "7":
            numbersClicked(e)
            break;
        case "8":
            numbersClicked(e)
            break;
        case "9":
            numbersClicked(e)
            break;
        case "0":
            numbersClicked(e)
            break;
        case ".":
            numbersClicked(e)
            break;

        case "Backspace":
            backspaceClicked(e)
            break;

        case "=":
            equalClicked(e)
            break;

        case "Enter":
            equalClicked(e)
            break;

        case "Delete":
            clearClicked(e)
            break;
    }
}

    
function operatorFromKeyboard(e) {
    keyClicked = e.key;
    switch (keyClicked) {
        case "+":
            operatorClicked(e)
            break;

        case "-":
            operatorClicked(e)
            break;

        case "*":
            operatorClicked(e)
            break;
        
        case "/":
            operatorClicked(e)
            break;

        case "%":
            operatorClicked(e)
            break;
    }
}

//initializing all operands and operators
let firstOperand = "";
let secondOperand = "";
let operatorValue = null;
let lastElement = null;
let decimalCounter = 0;
let signClicked = "";


//exectues when any number is clicked
function numbersClicked(e) {
    let digit = "";

    //checking if input is from keyboard or from clicking on the number buttons
    if (e.type === "click") {
        digit = e.target.id;
    }
    else if (e.type === "keydown") {
        digit = e.key;
    }

    //checking if the last element that came from clicking an operator is an operator
    //if operator matches the last element, second operand is collected
    if (lastElement === "+" || lastElement === "-" || lastElement === "/" || lastElement === "%" || lastElement === "*") {
        secondOperand += digit;
    }

    //edge cases for zero and decimal 
    if (digit === "0") {
        if (miniDisplay.textContent === "" || miniDisplay.textContent === "0") {
            miniDisplay.textContent = "";
        }
    }

    if (digit === ".") {
        if (decimalCounter === 0) {
            if (miniDisplay.textContent === "0" || miniDisplay.textContent === "") {
                miniDisplay.textContent = "0.";
                decimalCounter++;
            }
            else {
                miniDisplay.textContent += ".";
                decimalCounter++;
            }
        }
    }
    else {
        miniDisplay.textContent += digit;
    }


    //enable all operator buttons once number is clicked again
    //if last element of minidisplay is a number
    if (numberButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
        enableOperators();
    }
}

//executes when clear button is clicked
function clearClicked(e) {
    //resets all variables to their initial values
    miniDisplay.textContent = "";
    display.textContent = "";
    firstOperand = "";
    secondOperand = "";
    lastElement = null;
}

//executes when backspace button is clicked
function backspaceClicked(e) {
    //if only one element is left then clear screen
    if (miniDisplay.textContent.length === 1) {
        clearClicked();
    }

    else {
        if (miniDisplay.textContent[miniDisplay.textContent.length - 1] === ".") {
            decimalCounter = 0;
        }

        //if last element of minidisplay is a number
        if (numberButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
            enableOperators();
        }
        //if last element of minidisplay is an operator
        if (operatorButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
            secondOperand = "";
        }

        miniDisplay.textContent = miniDisplay.textContent.substring(0, miniDisplay.textContent.length - 1);
    }
}

//executes when an operator is clicked
function operatorClicked(e) {
    decimalCounter = 0;

    if (miniDisplay.textContent === "") {
        disableOperatorButtons();
    }

    else {
        //prevents the user from clicking two operator buttons simultaneously
        //if last element of minidisplay is an operator
        if (operatorButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
            disableOperatorButtons();
        }

        //calculates the firstOperand
        //first case when operator is clicked first time, when seond operand is empty
        if (secondOperand == "") {
            firstOperand = miniDisplay.textContent;
        }
        //second case when second operand exists
        else {
            equalClicked(firstOperand, secondOperand, operatorValue)

            //updating the first operand
            firstOperand = display.textContent;
            if (firstOperand === "" || isNaN(firstOperand)) {
                firstOperand = 0;
            }
            secondOperand = "";
        }

        if (e.type === "click") {
            signClicked = e.target.id;
        }
        else if (e.type === "keydown") {
            signClicked = e.key;
            (signClicked);
        }

        //updating the last element
        miniDisplay.textContent += signClicked;
        lastElement = signClicked;
    }
}


function equalClicked(e) {
    if (miniDisplay.textContent === "") {
        miniDisplay.textContent = "";
    }

    else if (lastElement === null) {
        display.textContent = miniDisplay.textContent;       
    }
        
    else {
        
    //if last element of miniDisplay is an operator
    if (miniDisplay.textContent[miniDisplay.textContent.length - 1] === "+" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "-" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "/" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "*" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "%") {
        equalButton.addEventListener("click", equalClicked);
    }
    else {
        equalize(firstOperand, secondOperand, operatorValue);
    }
    }

}


function equalize(firstOperand, secondOperand, operatorValue) {
    if (secondOperand == null) {
        display.textContent = "";
    }
    let result = operate(parseFloat(firstOperand), parseFloat(secondOperand), lastElement);
    //for division by zero case
    if (typeof result === "string") {
        display.textContent = result;
    }
    else {
        //if length of result is greater than 10, then only prints forst 10 numbers
        if (toString(result).length > 10) {
            let roundedResult = parseFloat(result.toString().substring(0, 10));
            display.textContent = roundedResult;
        }

        else {
            display.textContent = result;
        }
    }

    //updating the first and second operand
    firstOperand = display.textContent;
    if (firstOperand === "" || isNaN(firstOperand)) {
        firstOperand = 0;
    }
    secondOperand = "";
}
//enables all operators
function enableOperators() {
    operatorButtons.forEach(button => button.addEventListener("click", operatorClicked));
    document.removeEventListener("keydown", operatorFromKeyboard);
}

// //disables all numbers
// function disableAllNumbers() {
//     numberButtons.forEach(button => button.removeEventListener("click", operatorClicked));
//     document.addEventListener("keydown", numberFromKeyboard);
// }

//disables all operators
function disableOperatorButtons() {
    operatorButtons.forEach(button => button.removeEventListener("click", operatorClicked));
    document.removeEventListener("keydown", operatorFromKeyboard);
}

//arethmatic functions for calculations
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    if (b === 0) {
        console.log("i aint gonna crash!")
        return "huh?"
    }
    return parseFloat(a) / parseFloat(b);
}

function mod(a, b) {
    return parseFloat(a) % parseFloat(b);
}

//operates the operands with the correect given operator
function operate(a, b, sign) {
    if (sign == "+") return add(a, b);
    else if (sign == "-") return subtract(a, b);
    else if (sign == "*") return multiply(a, b);
    else if (sign == "/") return divide(a, b);
    else if (sign == "%") return mod(a, b);
}