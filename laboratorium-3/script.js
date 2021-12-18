let draggedElement;
let elementsList;
let indexOfElementInLToBeDropped;
let indexInWhichElementWillBeDropped;
let draggedElementId;

document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

document.addEventListener("dragstart", ({target}) => {
    draggedElement = target;
    draggedElementId = target.id;
    elementsList = target.parentNode.children;
    for(let i = 0; i < elementsList.length; i += 1) {
        if(elementsList[i] === draggedElement){
            indexOfElementInListToBeDropped = i;
        }
    }
});

document.addEventListener("drop", ({target}) => {
    if(target.id !== draggedElementId && target.className == "dropzone") {
        console.log(draggedElement);
        draggedElement.remove(draggedElement);

        for(let i = 0; i < elementsList.length; i += 1) {
            if(elementsList[i] === target) {
                indexInWhichElementWillBeDropped = i;
            }
        }

        if(indexOfElementInListToBeDropped < indexInWhichElementWillBeDropped
        ) {
            target.after(draggedElement);
        } 
        else {
            target.before(draggedElement);
        }
    }
});