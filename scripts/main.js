const buttons = document.querySelectorAll('.button');

buttons.forEach(button => button.addEventListener('mousedown', toggleClick))
buttons.forEach(button => button.addEventListener('touchstart', toggleClick))
document.addEventListener('mouseup', removeClickedAll)
document.addEventListener('touchend', removeClickedAll)

function toggleClick(e) {
  let clickedDiv = this;
  clickedDiv.classList.add('clicked');
}

function removeClickedAll() {
  buttons.forEach(button => button.classList.remove('clicked'))
}