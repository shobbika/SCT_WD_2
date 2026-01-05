const display = document.getElementById("display");
const keys = document.querySelector(".calculator-keys");

keys.addEventListener("click", (e) => {
  const key = e.target;
  if (!key.classList.contains("key")) return;

  const action = key.dataset.action;
  const keyContent = key.textContent.trim();
  const currentDisplay = display.value;

  // Clear
  if (action === "clear") {
    display.value = "";
    return;
  }

  // Delete last character
  if (action === "delete") {
    display.value = currentDisplay.slice(0, -1);
    return;
  }

  // Operators
  if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const operatorMap = {
      add: "+",
      subtract: "-",
      multiply: "*",
      divide: "/",
    };
    display.value += operatorMap[action];
    return;
  }

  // Calculate
  if (action === "calculate") {
    try {
      // Evaluate the expression safely
      const result = Function(`"use strict"; return (${currentDisplay})`)();
      if (result !== undefined && !Number.isNaN(result)) {
        display.value = result;
      }
    } catch {
      display.value = "Error";
      setTimeout(() => (display.value = ""), 1000);
    }
    return;
  }

  // Digits and dot
  display.value += keyContent;
});
