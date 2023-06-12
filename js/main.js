let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

function deleteNumber() {
  currentOperand = currentOperand.slice(0, -1);
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;

  currentOperand += number.toString();
}

function chooseOperation(selectedOperation) {
  if (currentOperand === "") return;

  const regex = /^(-?\d+)([+\-])(\d+)%/;
  const match = currentOperand.match(regex);

  if (match) {
    const [, prev, op, percentage] = match;
    const computedPercentage = (parseFloat(prev) * parseFloat(percentage)) / 100;

    previousOperand = prev;
    operation = op;
    currentOperand = computedPercentage.toString();
  } else {
    compute();
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = "";
  }
}


function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Divisão por zero não é permitida!");
        clear();
        return;
      }
      computation = prev / current;
      break;
    case "%":
      computation = prev + (prev * current) / 100;
      break;
    default:
      return;
  }
  currentOperand = computation.toString();
  operation = undefined;
  previousOperand = "";
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay = isNaN(integerDigits)
    ? ""
    : integerDigits.toLocaleString("pt-br", { maximumFractionDigits: 0 });
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  const currentOperandTextElement = document.querySelector(
    "[data-current-operand]"
  );
  const previousOperandTextElement = document.querySelector(
    "[data-previous-operand]"
  );

  currentOperandTextElement.textContent = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.textContent = `${getDisplayNumber(
      previousOperand
    )} ${operation}`;
  } else {
    previousOperandTextElement.textContent = "";
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.textContent);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});
