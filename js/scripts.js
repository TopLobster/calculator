"use strict";

let histList = document.querySelector(".history");
let active = document.querySelector("#active");
let warn = document.querySelector("#warn");

function operate(expression) {
  let value;
  try {
    warn.textContent = "";
    value = Function('"use strict";return('+expression+')')();
    addHistory(expression, value);
    return value;
  } catch (e) {
    warn.textContent = "malformed input";
    return expression;
  }
}

function addHistory(expression, value) {
  histList.innerHTML = `<div class="hist-elem"><span class="left">`+expression+`</span><span class="right"><span>=</span><span>`+value+`</span></span></div>`+histList.innerHTML;
}

function addKeypress(keyPress) {
  // TODO: insert character depending on the current selection area.
  if (keyPress === "c" || keyPress === "C") {
    active.value = "";
  } else if (keyPress === "Backspace") {
    active.value = active.value.slice(0,active.value.length-1);
  } else if (keyPress === "=" || keyPress === "Enter") {
    active.value = operate(active.value);
  }
  else {
    active.value += keyPress;
  }
}

let buttons = document.querySelectorAll(".number, .operator");
document.addEventListener("click", () => active.focus());
document.querySelector("#clear").addEventListener("dblclick", () => {
  while (histList.firstChild) {
    histList.removeChild(histList.firstChild);
  }
});

// TODO: expand this into separate buttons maybe so there's no constant checking of unnecessary boolean expressions
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    addKeypress(button.value);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "c" && (button.value === e.key || e.key === "Enter" && button.value === "=")) {
      button.classList.add("active");
    }
    if (e.key === "Enter" && button.value === "=") {
      addKeypress(e.key);
    }
  });
  document.addEventListener("keyup", (e) => {
    if (e.key !== "c" && (button.value === e.key || e.key === "Enter" && button.value === "=")) {
      button.classList.remove("active");
    }
  });
});
