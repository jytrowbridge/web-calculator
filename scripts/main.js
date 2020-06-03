import processButton from "opFuncs.js";

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
