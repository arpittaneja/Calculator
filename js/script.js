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

document.addEventListener("keydown", function (e) { //keydown event listener for keyboard support
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
        case "+":
            operatorClicked(e)
            break;

        case "-":
            operatorClicked(e)
            break;

        case "/":
            operatorClicked(e)
            break;

        case "%":
            operatorClicked(e)
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
})

let firstOperand = "";
let secondOperand = "";
let operatorValue = null;
let lastElement = null;
let decimalCounter = 0;
let signClicked = "";

function numbersClicked(e) {
    let digit = "";

    //checking if input is from keyboard or from clicking on the number buttons
    if (e.type === "click") {
        digit = e.target.id;
        console.log(digit);
    }
    else if (e.type === "keydown") {
        digit = e.key;
        console.log(digit);
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
    if (numberButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
        operatorButtons.forEach(button => button.addEventListener("click", operatorClicked));
    }
}

//executes when clear button is clicked
function clearClicked(e) {
    // if (numberButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
    //     operatorButtons.forEach(button => button.addEventListener("click", operatorClicked));
    // }
    miniDisplay.textContent = "";
    display.textContent = "";
    firstOperand = "";
    secondOperand = "";
    lastElement = null;
}


function backspaceClicked(e) {

    // if (miniDisplay.textContent.length === 17) {
    //     numberButtons.forEach(button => button.disabled = false);
    // }

    if (miniDisplay.textContent.length === 1) {
        clearClicked();
    }

    else {
        if (miniDisplay.textContent[miniDisplay.textContent.length - 1] === ".") {
            decimalCounter = 0;
        }
        if (numberButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
            operatorButtons.forEach(button => button.disabled = false);
        }
        miniDisplay.textContent = miniDisplay.textContent.substring(0, miniDisplay.textContent.length - 1);
    }
}








function operatorClicked(e) {
    decimalCounter = 0;

    if (miniDisplay.textContent === "") {
        operatorButtons.forEach(button => button.removeEventListener("click", operatorClicked));
        miniDisplay.textContent = "";
    }

    else {
        //prevents the user from clicking two operator buttons simultaneously
        if (operatorButtons.indexOf(miniDisplay.textContent[miniDisplay.textContent.length - 1])) {
            operatorButtons.forEach(button => button.removeEventListener("click", operatorClicked));
        }

        //first case when operator is clicked first time
        if (secondOperand == "") {
            firstOperand = miniDisplay.textContent;
            console.log(firstOperand);
        }

        if (secondOperand != "") {
            equalClicked(firstOperand, secondOperand, operatorValue)

            //zero wali condition
            firstOperand = display.textContent;
            if (firstOperand === "" || isNaN(firstOperand)) {
                firstOperand = 0;
            }
            secondOperand = "";
        }
        if (e.type === "click") {
            signClicked = e.target.id;
            console.log(signClicked);
        }
        else if (e.type === "keydown") {
            signClicked = e.key;
            console.log(signClicked);
        }

        miniDisplay.textContent += signClicked;
        lastElement = signClicked;
    }
}


function equalClicked(e) {
    if (miniDisplay.textContent[miniDisplay.textContent.length - 1] === "+" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "-" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "/" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "*" || miniDisplay.textContent[miniDisplay.textContent.length - 1] === "%") {
        equalButton.addEventListener("click", equalClicked);
    }
    else {
        equalize(firstOperand, secondOperand, operatorValue);
    }
}


function equalize(firstOperand, secondOperand, operatorValue) {
    if (secondOperand == null) {
        display.textContent = "";
    }
    let result = operate(parseFloat(firstOperand), parseFloat(secondOperand), lastElement);
    if (typeof result === "string") {
        display.textContent = result;
    }
    else {
        if (toString(result).length > 10) {
            console.log(result)
            let roundedResult = parseFloat(result.toString().substring(0, 10));
            display.textContent = roundedResult;
        }
        else {
            display.textContent = result;
        }
    }

    firstOperand = display.textContent;
    if (firstOperand === "" || isNaN(firstOperand)) {
        firstOperand = 0;
    }
    secondOperand = "";
}

function disableAllNumbers() {
    numberButtons.forEach(number => number.disabled = true);
}

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
        return "huh?"
    }
    return parseFloat(a) / parseFloat(b);
}

function mod(a, b) {
    return parseFloat(a) % parseFloat(b);
}

function operate(a, b, sign) {
    if (sign == "+") return add(a, b);
    else if (sign == "-") return subtract(a, b);
    else if (sign == "*") return multiply(a, b);
    else if (sign == "/") return divide(a, b);
    else if (sign == "%") return mod(a, b);
}

//separate equals  sign from operators and call equate() function whenever operator sign is called again


function evaluate(firstOperand, secondOperand, previousOperator) {
    return operate(firstOperand, secondOperand, previousOperator);
}

function seriously() {
    miniDisplay.textContent = "";
    display.textContent = "";
    firstOperand = 0;
    secondOperand = 0;
    previousOperator = null;
    operatorValue = "";
    operatorButtons.forEach(button => button.addEventListener("click", operatorClicked))
}