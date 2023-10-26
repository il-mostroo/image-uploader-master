class handleUserImg {
    constructor(dropArea, url, fileInput, form) {
        
    }

    handleSelectedImg(fileInput, form) {
        fileInput.addEventListener("change", (event) => {
            const File = event.target.files[0];
            if (this.isFileValid(File).length != 0) {
                //loop through the array and render errors
                //empty fileInput
            } else {
                //send the img to the server and render uploading progress bar
            }
        });
    }
    
    handleDroppedImg(dropArea, url) {
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            const File = event.dataTransfer.files[0];
            if(this.isFileValid(File).length != 0) {
                //loop through the array and render errors
            } else {
                //send the img to the server and render uploading progress bar
            }
        });
    }
    
    isFileValid(File) {
        const imgValidationErrors = [];
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            if (!allowedExtensions.test(File.name)) {
                imgValidationErrors.push("Invalid file format. Please select a valid image.");
            } else if (File.size > MAX_FILE_SIZE) {
                imgValidationErrors.push("File size is too large. Please select a smaller image.");
            } 
            return imgValidationErrors;
    }
}

const dropArea = document.querySelector(".drop-area");
const url = "../includes/controller.php";
const fileInput = document.getElementById("file-input")
const form = document.querySelector(".form");

dropedImgHandler = new HandleUploadedImage(dropArea, url, fileInput, form);