var randomColor;

function setBlockColor() {
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    block = document.getElementById("block");
    block.style.backgroundColor = randomColor;
  }