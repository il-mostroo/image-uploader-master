class HandleDropedImage {

    constructor(dropArea) {
        this.dragAndDropEffect(dropArea);
        // this.sendImgToServer(dropArea, url);
    }

    dragAndLeaveEffect(dropArea) {
        this.dragEnterEffect(dropArea);
        this.dragLeaveEffect(dropArea);
    }

    dragCounter = 0;
    dragEnterEffect(dropArea) {
        dropArea.addEventListener("dragenter", (event) => {
            event.preventDefault();
                if (this.dragCounter === 0) {
                    console.log("mouse entered to da");
                    dropArea.classList.add("isDraggingOver"); 
                } 
                this.dragCounter++;
        });
    }
    dragLeaveEffect(dropArea) {
        dropArea.addEventListener("dragleave", (event) => {
            event.preventDefault();
            this.dragCounter--;
                if (this.dragCounter === 0) {
                    console.log("mouse leaved da");
                    dropArea.classList.remove("isDraggingOver");
                }
        });
    }
}

const dropArea = document.querySelector(".drop-area");

dropedImgHandler = new HandleDropedImage(dropArea);
