let display = document.querySelector(".screen-container .screen .display")

let miniDisplay = document.querySelector(".screen-container .mini-screen")
console.log(miniDisplay);

let numberButtons = Array.from(document.querySelectorAll(".initial"));

let operators = Array.from(document.querySelectorAll(".operator"));

numberButtons.forEach(number => number.addEventListener("click", numberClicked));

let decimal = document.querySelector(".decimal");
console.log(decimal);
let decimalCounter = 0;
decimal.addEventListener("click", decimalClicked);
let firstOperand = 0;
let secondOperand = 0;


function numberClicked(e) {
    digit = (e.target.id);

    let lastElement = display.textContent[display.textContent.length - 1];
    console.log(lastElement);
    console.log(lastElement);
    console.log(lastElement);
    console.log(lastElement);
    console.log(lastElement);
    console.log(lastElement);
    console.log(lastElement);

    console.log(miniDisplay.textContent);
    if ((miniDisplay.textContent === "") && (lastElement === "+" || lastElement === "-" || lastElement === "*" || lastElement === "/" || lastElement === "%")) {
        miniDisplay.textContent = display.textContent;
        clearDisplay(display);
    }



    if (miniDisplay.textContent === "") {
        firstOperand = "";
    }
    else {
        firstOperand = (miniDisplay.textContent);
    }
    console.log(firstOperand);


    if (digit === "delete") {
        deleteClicked(display);
    }

    else if (digit === "clear") {
        clearDisplay(display);
    }

    else if (display.textContent === "0") {
        if (digit === "0") {
            display.textContent = "0";
        }
        // }
        // else if (digit === "-") {
        //     display.textContent = "0-";
        // }
        // else if (digit === "+") {
        //     display.textContent = "0+";
        // }
        // else if (digit === "*") {
        //     display.textContent = "0*";
        // }
        // else if (digit === "/") {
        //     display.textContent = "0/";
        // }
        // else if (digit === "%") {
        //     display.textContent = "0%";
        // }
        else {
            display.textContent = "";
            display.textContent += digit;
        }
    }
    else {
        display.textContent += digit;
    }
    // miniDisplayLastElement = miniDisplay.textContent[]

    if (display.textContent[0] === "+" || display.textContent[0] === "-" || display.textContent[0] === "/" || display.textContent[0] === "*" || display.textContent[0] === "%") {
        secondOperand = display.textContent.slice(1);
        console.log(secondOperand);
    }

    else if (miniDisplay.textContent.includes("+") || miniDisplay.textContent.includes("-") || miniDisplay.textContent.includes("*") || miniDisplay.textContent.includes("/") || miniDisplay.textContent.includes("%")) {
        secondOperand = display.textContent;
        console.log(secondOperand);
    }



    if (display.textContent !== "0" && display.textContent !== "") {
        operators.forEach(operator => operator.addEventListener("click", operatorIsClicked));
    }


    // console.log(typeof display.textContent.length);

    //  }
    if (display.textContent.length < 9) {
        enableDisabledButtons();
    }
    if (display.textContent.length === 9) {
        displayAllButtonsExceptAcAndDelete();
    }
}

function decimalClicked() {

    let lastElement = display.textContent[display.textContent.length - 1];
    if (display.textContent === "") {
        display.textContent = display.textContent;
    }

    else if (decimalCounter === 0) {
        if ((miniDisplay.textContent === "") && (lastElement === "+" || lastElement === "-" || lastElement === "*" || lastElement === "/" || lastElement === "%")) {
            miniDisplay.textContent = display.textContent;
            clearDisplay(display);
        }
        
        display.textContent += ".";
        decimalCounter++;
    }
}

function displayAllButtonsExceptAcAndDelete() {
    for (button of numberButtons) {
        if (button.id !== "clear" && button.id !== "delete") {
            // button.disabled = true;
            // console.log(button);
            button.removeEventListener("click", numberClicked);
        }
    }
}

function enableDisabledButtons() {
    for (button of numberButtons) {
        if (button.id !== "clear" && button.id !== "delete") {
            // button.disabled = true;
            // console.log(button);
            button.addEventListener("click", numberClicked);
        }
    }
}

function deleteClicked(display) {

    if (display.textContent.length === 0) {
        clearDisplay(display);
    }

    // display[display.length - 1] = "";
    if (display.textContent[display.length - 1] == ".") {
        decimalCounter == 0;
    }

    display.textContent = display.textContent.replace(display.textContent[display.textContent.length - 1], "")
}


function clearDisplay(display) {



    display.textContent = "";
    // console.log(operators);
    operators.forEach(operator => operator.removeEventListener("click", operatorIsClicked));
}
// console.log(numberButtons)
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


function operatorIsClicked(e) {

    // if (miniDisplay.textContent.includes("+") || miniDisplay.textContent.includes("-") || miniDisplay.textContent.includes("*") || miniDisplay.textContent.includes("/") || miniDisplay.textContent.includes("%") ) {
    //     secondOperand = display.textContent;
    //     console.log(secondOperand);
    // }
    decimalCounter = 0;
    operatorValue = e.target.id;
    let miniDisplayLastElement = miniDisplay.textContent.charAt(miniDisplay.textContent.length - 1);
    console.log(miniDisplayLastElement);


    if (operatorValue === "=") {
        if (miniDisplayLastElement === "+" || miniDisplayLastElement === "-" || miniDisplayLastElement === "/" || miniDisplayLastElement === "*" || miniDisplayLastElement === "%") {
            console.log(firstOperand);
            console.log(secondOperand);
            let resultWhenEqualsSign = operate(firstOperand, secondOperand, miniDisplayLastElement);
            console.log(resultWhenEqualsSign);
            display.textContent = resultWhenEqualsSign;
            miniDisplay.textContent = "";
        }

        else if (display.textContent[0] === "+" || display.textContent[0] === "-" || display.textContent[0] === "/" || display.textContent[0] === "*" || display.textContent[0] === "%") {
            let resultWhenEqualsSign = operate(firstOperand, secondOperand, display.textContent[0])
            display.textContent = resultWhenEqualsSign;
            miniDisplay.textContent = "";
        }

        // else if (typeof parseInt(display.textContent === "number")) {
        //     let resultWhenEqualsSign = operate(firstOperand, secondOperand, display.textContent[0])
        //     display.textContent = resultWhenEqualsSign;
        //     miniDisplay.textContent = "";
        // }

        else if (miniDisplay.textContent === "") {

        }
    }
    else {
        display.textContent += operatorValue;
    }


    miniDisplayLastElement = miniDisplay.textContent.charAt(miniDisplay.textContent.length - 1);


    if (miniDisplayLastElement === "+" || miniDisplayLastElement === "-" || miniDisplayLastElement === "/" || miniDisplayLastElement === "*" || miniDisplayLastElement === "%") {
        let resultWhenRepeatedOperations = operate(firstOperand, secondOperand, miniDisplayLastElement);
        miniDisplay.textContent = resultWhenRepeatedOperations;
        if (resultWhenRepeatedOperations) {
            miniDisplay.textContent = resultWhenRepeatedOperations;
            // miniDisplay.textContent += operatorValue;
            display.textContent = operatorValue;
        }
    }
    else if (display.textContent[0] === "+" || display.textContent[0] === "-" || display.textContent[0] === "/" || display.textContent[0] === "*" || display.textContent[0] === "%") {
        let resultWhenRepeatedOperations = operate(firstOperand, secondOperand, display.textContent[0]);
        miniDisplay.textContent = resultWhenRepeatedOperations;
        // miniDisplay.textContent += operatorValue;
        display.textContent = operatorValue;
    }




    // let firstOperand = parseInt(display.textContent);
    // console.log(firstOperand);

    lastElement = display.textContent[display.textContent.length - 1];
    console.log(lastElement);

    // let demo = display.textContent.split("");

    // for (let i = 0; i < demo.length; i++) {
    //     if (demo[i] === "+" || demo[i] === "-" || demo[i] === "*" || demo[i] === "/" || demo[i] === "%") {
    //         operators.forEach(operator => operator.removeEventListener("click", operatorIsClicked));
    //     }
    // }

    if (lastElement === "+" || lastElement === "-" || lastElement === "*" || lastElement === "/" || lastElement === "%") {
        operators.forEach(operator => operator.removeEventListener("click", operatorIsClicked));

        if (display.textContent.length < 9) {
            enableDisabledButtons();
        }
        if (display.textContent.length === 9) {
            displayAllButtonsExceptAcAndDelete();
        }
    }


}
