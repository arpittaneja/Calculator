let display = document.querySelector(".screen-container .screen .display")



let numberButtons = Array.from(document.querySelectorAll(".initial"));

let operators = Array.from(document.querySelectorAll(".operator"));

numberButtons.forEach(number => number.addEventListener("click", numberClicked));


function numberClicked(e) {
    digit = (e.target.id);


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
    let lastElement = display.textContent[display.textContent.length - 1];
    console.log(lastElement);

    if (lastElement === "+" || lastElement === "-" || lastElement === "*" || lastElement === "/" || lastElement === "%") {
        clearDisplay(display);
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
    // display[display.length - 1] = "";
    display.textContent = display.textContent.replace(display.textContent[display.textContent.length - 1], "")

    if (display.textContent.length === 0) {
        clearDisplay(display);
    }
}

function clearDisplay(display) {
    display.textContent = "";
    // console.log(operators);
    operators.forEach(operator => operator.removeEventListener("click", operatorIsClicked));
}
// console.log(numberButtons)
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function mod(a, b) {
    return a % b;
}

function operate(a, b, sign) {
    if (sign == "+") return add(a, b);
    else if (sign == "-") return subtract(a, b);
    else if (sign == "*") return multiply(a, b);
    else if (sign == "/") return divide(a, b);
    else if (sign == "%") return mod(a, b);
}


function operatorIsClicked(e) {
    operatorValue = e.target.id;
    let firstOperand = parseInt(display.textContent);
    console.log(firstOperand);
    display.textContent += operatorValue;

    lastElement = display.textContent[display.textContent.length - 1];
    console.log(lastElement);

    let demo = display.textContent.split("");

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
