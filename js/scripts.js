"use strict";

let histList = [];
let active = document.querySelector("#active");


function operate(expression) {
  let value;

  return value;
}

function addKeypress(keyPress) {
  if (keyPress === "clr") {
    active.textContent = "";
  } else if (keyPress === "del") {
    active.textContent = active.textContent.slice(0,active.textContent.length-1);
  } else if (keyPress === "=") {
    active.textContent = operate(active.textContent);
  }
  else {
    active.textContent += keyPress;
  }
}

let buttons = document.querySelector(".buttons").childNodes.forEach(button => {
  button.addEventListener("mousedown", () => button.classList.add("active"));
  button.addEventListener("mouseup", () => {
    button.classList.remove("active");
    addKeypress(button.value);
  });
});

