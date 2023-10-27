import { RenderValidationErrors } from "./renderValidationErrors.js";

class HandleUserImg {

    constructor(dropArea, url, fileInput) {
        this.handleSelectedImg(fileInput);
        this.handleDroppedImg(dropArea, url);
        this.renderValidationErrors = new RenderValidationErrors();
    }

    handleSelectedImg(fileInput) {
        fileInput.addEventListener("change", (event) => {
            const File = event.target.files[0];
            let errors = this.isFileValid(File);
            if (errors.length === 0) {
                //send the img to the server and render uploading progress bar
            } else if (errors.length > 0) {
                //loop through the array and render errors
                this.renderValidationErrors.renderErrors(errors);
                fileInput.value = "";
            }
        });
    }
    
    handleDroppedImg(dropArea, url) {
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            const File = event.dataTransfer.files[0];
            let errors = this.isFileValid(File);
            if(errors.length === 0) {
                //send the img to the server and render uploading progress bar
            } else if (errors.length > 0) {
                //loop through the array and render errors
                this.renderValidationErrors.renderErrors(errors);
                errors = [];
            }
        });
    }
    
    isFileValid(File) {
        const imgValidationErrors = [];
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        const MAX_FILE_SIZE = 10;
            if (!allowedExtensions.test(File.name)) {
                imgValidationErrors.push("Invalid file format. Please select a valid image.");
            } else if (Math.round(File.size/1024) > MAX_FILE_SIZE) {
                imgValidationErrors.push("File size is too large. Please select a smaller image(<=10MB).");
            } 
            return imgValidationErrors;
    }
}

const dropArea = document.querySelector(".drop-area");
const url = "../includes/controller.php";
const fileInput = document.getElementById("file-input")

dropedImgHandler = new HandleUserImg(dropArea, url, fileInput);