import processInput from "./opFuncs.js";

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

// keyboard functionality
document.addEventListener('keydown', processKey);
document.addEventListener('keyup', processKey)

function toggleClick(e) {
  // If multiple click events, only most recent button clicked will be procesed
  // buttons.forEach(button => button.classList.remove('clicked'));

  this.classList.add('clicked');
}

function processClicked() {
  // find each button clicked, process it, and remove
  buttons.forEach(button => {
    if (button.classList.contains('clicked')) {
      processInput(button.id);
      button.classList.remove('clicked')
    }
  });
}

function processKey(e) {
  console.log(e);
  e.preventDefault();
  let code = e.keyCode;
  const shift = e.shiftKey;
  let id = getId(code, shift);
  if (id != undefined) {
    const button = document.querySelector(`[id='${id}']`);
    if (e.type == 'keydown') {
      button.classList.add('clicked');
    } else {
      processInput(id);
      button.classList.remove('clicked');
    }
  }
}

function getId(code, shift) {
  // Return html id from key code
  let id;
  switch (true) {
    case (code == 191 || code == 111):
      id = 'divide';
      break;
    case((code == 56 && shift) || code == 106): 
      id = 'multiply';
      break;
    case ((code == 187 && shift) || (code == 61 && shift) || code == 107):
      id = 'add';
      break;
    case (code == 189 || code == 173 || code == 109):
      id = 'subtract';
      break;
    case (code == 53 && shift):
      id = 'pct';
      break;
    case (code == 190 || code == 110):
      id = 'dot';
      break;
    case (code == 13 || code == 61|| code == 187):
      id = 'equals';
      break;
    case (code == 67):
      id = 'on-c';
      break;
    case (code >= 48 && code <= 57):
      id = code - 48;
      break;
    case (code >= 96 && code <= 105):
      id = code - 96;
      break;
  } 
  return id; 
}