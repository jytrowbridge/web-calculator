import {Calculator} from "/scripts/calculator.js";
import cleanNumber from "/scripts/sciNot.js";

export const buttons = document.querySelectorAll('.button');

let touch;
if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  //touch device
  touch = true;
  buttons.forEach(button => button.addEventListener('touchstart', toggleClick));
  document.addEventListener('touchend', processClicked);
 
  console.log('touch')
}else {
  //non-touch
  touch = false;
  buttons.forEach(button => button.addEventListener('mousedown', toggleClick));
  document.addEventListener('mouseup', processClicked);
  
  console.log('non-touch')
}

function toggleClick(e) {
  // If multiple click events, only most recent button clicked will be procesed
  // buttons.forEach(button => button.classList.remove('clicked'));

  this.classList.add('clicked');
}

function processClicked() {
  // find each button clicked, process it, and remove
  buttons.forEach(button => {
    if (button.classList.contains('clicked')) {
      processButton(button);
      button.classList.remove('clicked')
    }
  });
}

function processButton (btn) {
  if (btn.classList.contains('number')) {
    appendNum(btn.id);
  } else if (btn.id == 'on-c') {
    clear();
  } else {
    computeResult(btn.id);
  }
}

const maxLength = 10;

function computeResult(op) { 
  // sends operator and number to computeOp method and adds result to screen dom
  const currNum = fromDispStr(screen.textContent);
  let newNum = calculator.computeOp(currNum, op);
  const cleanNumStr = cleanNumber(newNum, maxLength);
  screen.textContent = toDispStr(cleanNumStr);
  calculator.clearScreen = true;
  return newNum;
};

function toDispStr(num) {
  // returns number with ones prefixed with space
  return num.toString().replace(/1/g, ' 1')
}

function fromDispStr(num) {
  // Given string representation of number, return number with spaces removed
  return parseFloat(num.replace(/ /g, ''));
}

function getNumLen(num) {
  // Given string representing number with 1's prefixed with spaces, return "true" length
  // e.g. '9 1 1' represents the number 911 and its length is 3
  return num.replace(/[ |.]/g, '').length;
}

function clear() { 
  calculator.memory = 0;
  calculator.num1 = undefined;
  calculator.clearScreen = true;
  screen.textContent = '0';
 };

// ------------------------------------------------------

const screen = document.querySelector('#screen');
screen.textContent = '0';
let calculator = new Calculator();

function appendNum(number) {
  let screenNum = calculator.clearScreen ? '' : screen.textContent;
  if (getNumLen(screenNum) >= maxLength) return;
  number = number == 'dot' ? '.' : number;  
  number = number == '1' ? ' 1' : number;  // prefix one with 0
  const numStr = screenNum.concat(number);
  screen.textContent = numStr;
  calculator.clearScreen = false;
}
