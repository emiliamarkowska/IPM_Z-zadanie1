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

    if(platform.children.length > 0) {
        putBlock(newBlock, platform.children, ev)
    }


    platform.appendChild(newBlock);
}

function setNewBlockInitialStyle(newBlock) {
    newBlock.id = currentId;
    newBlock.style.backgroundColor = randomColor;
    newBlock.style.height = squareSize;
    newBlock.style.width = squareSize;
}

function putBlock(newBlock, allBlocks, event) {
    xCoordinate = newBlock.offsetLeft;
    console.log(allBlocks)
    for(let i = 0; i < allBlocks.length; i++) {
        currentlyCheckedBlock = allBlocks[i];
        currentBoxLeftOffset = currentlyCheckedBlock.offsetLeft;

        let potentialHeightToBeSet = 0;

        if(isSomethingBelowTheBlock(currentBoxLeftOffset, event.offsetX, squareSize)) {
            newBlock.style.left = event.offsetX;
            potentialHeightToBeSet = parseInt(currentlyCheckedBlock.style.bottom) + squareSize;
        }

        newBlock.style.bottom = potentialHeightToBeSet;
    }
}

function isSomethingBelowTheBlock(currentBoxLeftOffset, eventOffset, squareSize) {
    return currentBoxLeftOffset < eventOffset + squareSize && currentBoxLeftOffset + squareSize > eventOffset
}

  
function handleDragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}