var randomColor;
var currentId = 0;
var squareSize = 50;

function setBlockColor() {
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    block = document.getElementById("block");
    block.style.backgroundColor = randomColor;
}

function onDragStart(ev) {
}

function handleDrop(ev) {
    ev.preventDefault();
    currentBlock = document.getElementById("block")
    newBlock = document.createElement("div");

    setNewBlockInitialStyle(newBlock);
    currentId = currentId + 1;

    newBlock.style.position = "absolute";
    newBlock.style.bottom = 0;
    newBlock.style.left = ev.offsetX;
    console.log(newBlock.style.left);

    if(platform.children.length > 0) {
        isSomethingBelowTheBlock(newBlock, platform.children, ev)
    }


    platform.appendChild(newBlock);
}

function setNewBlockInitialStyle(newBlock) {
    newBlock.id = currentId;
    newBlock.style.backgroundColor = randomColor;
    newBlock.style.height = squareSize;
    newBlock.style.width = squareSize;
}

function isSomethingBelowTheBlock(newBlock, allBlocks, event) {
    xCoordinate = newBlock.offsetLeft;

    for(let i = 0; i < allBlocks.length; i++) {
        currentlyCheckedBlock = allBlocks[i];
        currentBoxLeftOffset = currentlyCheckedBlock.offsetLeft;

        console.log(currentBoxLeftOffset);
        console.log(newBlock.style.left);

        if(event.offsetX + squareSize > currentBoxLeftOffset) {
            console.log("something is below me")
            newBlock.style.left = event.offsetX;
            console.log("height: ")
            console.log(currentlyCheckedBlock.id * squareSize);
            newBlock.style.bottom = currentlyCheckedBlock.id + squareSize;
        }
    }
}

  
function handleDragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}