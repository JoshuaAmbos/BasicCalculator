const inputDisplay = document.getElementById("input-display");
const outputDisplay = document.getElementById("output-display");
const allButtons = document.querySelectorAll(".buttons button");
const undoBtn = document.getElementById("undo-btn");

// loop that gets the value of buttons clicked
allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("value");
    const label = button.innerText;

    if (value == "=") {
      calculateResult();
    } else if (value === "*") {
      inputDisplay.value += "×";
    } else if (value === "/100") {
      inputDisplay.value += "%";
    } else if (value === "%") {
      inputDisplay.value += "mod";
    } else if (value === "*Math.PI") {
      inputDisplay.value += "π";
    } else if (value === "^2") {
      inputDisplay.value += "²";
    } else if (value === "/") {
      inputDisplay.value += "÷";
    } else if (!value) {
      return;
    } else {
      inputDisplay.value += value;
    }
  });
});

// outputDisplay.value = "";
// inputDisplay.value = "";

// calculation
// takes the string of text and turns it into a math problem
function calculateResult() {
  let problem = inputDisplay.value;

  problem = problem
    .replace(/%/g, "/100")
    .replace(/mod/g, "%")
    .replace(/π/g, "*Math.PI")
    .replace(/²/g, "**2")
    .replace(/×/g, "*")
    .replace(/÷/g, "/");

  // edge cases
  if (problem.includes("/0") && !problem.includes("/0.")) {
    outputDisplay.value = "Division by zero is undefined";
    return;
  }
  if (problem.includes("**Math.PI")) {
    problem = problem.replace("**Math.PI", "*Math.PI");
  }
  if (problem.includes("(*Math.PI)")) {
    problem = problem.replace("(*Math.PI)", "*Math.PI");
  }

  // handles x(y)
  problem = problem.replace(/(\d|\))(?=\()/g, "$1*");
  // handles (x)y
  problem = problem.replace(/\)(?=\d)/g, ")*");
  // handles √(x)
  problem = problem.replace(/√(\d+(\.\d+)?|\([^)]+\))/g, "Math.sqrt($1)");

  try {
    const result = eval(problem);

    outputDisplay.value = result;
  } catch (error) {
    outputDisplay.value = "Syntax Error";
  }
}

// undo btn
undoBtn.addEventListener("click", () => {
  inputDisplay.value = inputDisplay.value.slice(0, -1);
});

// delete btn
const clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", () => {
  inputDisplay.value = "";
});
