var randomColor;
var currentId = 0;
var squareSize = 50;
var previousBlockColor;

function setBlockColor() {
    randomColor = Math.floor(Math.random()*16777215).toString(16);
    block = document.getElementById("block");
    block.style.backgroundColor = randomColor;
}

function onDragStart(ev) {
    ev.dataTransfer.setData("text", ev.offsetX)
}
  
function allowDrop(event) {
    event.preventDefault();
}
  
function onDragEnd(ev) {
    document.getElementById(ev.srcElement.id).remove();
}

function dragElementStarted(ev) {
    previousBlockColor = ev.srcElement.style.backgroundColor;
    ev.dataTransfer.setData("text", ev.offsetX)
}

function handleDrop(ev) {
    ev.preventDefault();
    let initialOffset = ev.dataTransfer.getData("text");
    currentBlock = document.getElementById("block")
    newBlock = document.createElement("div");
    newBlock.setAttribute("draggable", true);
    newBlock.setAttribute("ondragend", "onDragEnd(event)");
    newBlock.setAttribute("ondragstart", "dragElementStarted(event)");

    setNewBlockInitialStyle(newBlock);
    currentId = currentId + 1;

    newBlock.style.position = "absolute";
    newBlock.style.bottom = 0;
    newBlock.style.left = ev.offsetX;

    if(platform.children.length > 0) {
        putBlock(newBlock, platform.children, ev, initialOffset)
    }


    platform.appendChild(newBlock);
    console.log(platform)
}

function setNewBlockInitialStyle(newBlock) {
    newBlock.id = currentId;
    if(previousBlockColor) {
        newBlock.style.backgroundColor = previousBlockColor;
        previousBlockColor = undefined;
    }
    else {
        newBlock.style.backgroundColor = randomColor;
    }
    newBlock.style.height = squareSize;
    newBlock.style.width = squareSize;
}

function putBlock(newBlock, allBlocks, event, initialOffset) {
    xCoordinate = event.offsetX - initialOffset;
    for(let i = 0; i < allBlocks.length; i++) {
        currentlyCheckedBlock = allBlocks[i];
        currentBoxLeftOffset = currentlyCheckedBlock.offsetLeft;

        let potentialHeightToBeSet = 0;

        if(isSomethingBelowTheBlock(currentBoxLeftOffset, event.offsetX, squareSize)) {
            newBlock.style.left = xCoordinate;
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