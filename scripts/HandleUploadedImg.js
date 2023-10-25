class HandleUploadedImage {

    constructor(dropArea, url, fileInput, form) {
        this.dragAndLeaveEffect(dropArea);
        this.submitFormOnChange(fileInput, form);
        this.sendImgToServer(dropArea, url);
    }

    dragAndLeaveEffect(dropArea) {
        this.dragOverEffect(dropArea);
        this.dragLeaveEffect(dropArea);
    }

    dragOverEffect(dropArea) {
        dropArea.addEventListener("dragover", (event) => {
            event.preventDefault();
            console.log("mouse entered to da");
            dropArea.classList.add("isDraggingOver"); 
        });
    }
    dragLeaveEffect(dropArea) {
        dropArea.addEventListener("dragleave", (event) => {
            if (!dropArea.contains(event.relatedTarget)) {
                event.preventDefault();
                console.log("mouse leaved the da");
                dropArea.classList.remove("isDraggingOver");
            }
        });
    }

    submitFormOnChange(fileInput, form) {
        fileInput.addEventListener("change", () => {
            console.log("change event was triggered");
            form.submit();
        });
    }

    sendImgToServer(dropArea, url) {
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            const imageFile = event.dataTransfer.files[0];

            const formData = new FormData();    
            formData.append('image', imageFile);

            fetch(url, {
                method: 'POST',
                body: formData,
              })           
                .catch((error) => {
                  alert('Error:', error);
                  window.location.href = '../index.html';
                });
        });
    }
}

const dropArea = document.querySelector(".drop-area");
const url = "../includes/controller.php";
const fileInput = document.getElementById("file-input")
const form = document.querySelector(".form");

dropedImgHandler = new HandleUploadedImage(dropArea, url, fileInput, form);