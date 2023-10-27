class DragAndDropEffect {

    constructor(dropArea) {
        this.dragOverEffect(dropArea);
        this.dragLeaveEffect(dropArea);
    }

    dragOverEffect(dropArea) {
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropArea.classList.add("isDraggingOver"); 
        });
    }
    dragLeaveEffect(dropArea) {
        dropArea.addEventListener("dragleave", (event) => {
            if (!dropArea.contains(event.relatedTarget)) {
                event.preventDefault();
                dropArea.classList.remove("isDraggingOver");
            }
        });
    }
}

const dropArea = document.querySelector(".drop-area");

dropedImgHandler = new HandleUploadedImage(dropArea);
