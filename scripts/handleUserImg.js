import { RenderErrors } from "./renderErrors.js";

class HandleUserImg {

    constructor(formContainer, fileInput, dropArea, uploadContainer) {
        this.handleSelectedImg(formContainer, fileInput, uploadContainer);
        this.handleDroppedImg(formContainer, dropArea, uploadContainer);
        this.renderErrorsInstance = new RenderErrors();
    }

    handleSelectedImg(formContainer, fileInput, uploadContainer) {
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            let validationErrors = this.isFileValid(file);

            if (validationErrors.length === 0) {
                formContainer.style.display = "none";
                uploadContainer.style.display = "flex";
                this.uploadImg(file);
            } else if (validationErrors.length > 0) {
                this.renderErrorsInstance.renderErrors(validationErrors);
                fileInput.value = "";
            }
        });
    }
    
    handleDroppedImg(formContainer, dropArea, uploadContainer, url) {
        dropArea.addEventListener("drop", (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];

            let validationErrors = this.isFileValid(file);
            let fetchErrors = [];
            if (validationErrors.length > 0) {
                this.renderErrorsInstance.renderErrors(validationErrors);
                validationErrors = [];
            } else if (validationErrors.length === 0) {
                formContainer.style.display = "none";
                uploadContainer.style.display = "flex";
                fetchErrors = this.uploadImg(file);
                console.log(fetchErrors);
                fetchErrors.push('This is an example error.');
                console.log(fetchErrors.length);
                if (fetchErrors) {
                    this.renderErrorsInstance.renderErrors(fetchErrors);
                    uploadContainer.style.display = "none";
                    formContainer.style.display = "flex";
                    console.log(fetchErrors.length);
                }
            } 
        });
    }

    isFileValid(file) {
        return [];
        const imgValidationErrors = [];
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        const MAX_FILE_SIZE = 50000;
            if (!allowedExtensions.test(file.name)) {
                imgValidationErrors.push("Invalid file format. Please select a valid image.");
            } else if (Math.round(file.size/1024) > MAX_FILE_SIZE) {
                imgValidationErrors.push("File size is too large. Please select a smaller image(<=5MB).");
            } 
            return imgValidationErrors;
    }

    uploadImg(imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        let fetchErrors = [];
        fetch("../includes/model.php", {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.text(); 
            }
            return response.text(); 
        })
        .then(message => {
            if (message) {
                const messageObj = JSON.parse(message);
                fetchErrors.push(messageObj.error);
            } else {
                fetchErrors.push('Error uploading the image! Please try again.');
            }
        })
        .catch(error => {
            fetchErrors.push('Error uploading the image! Please try again.');
        });
        return fetchErrors;
    }

}

const dropArea = document.querySelector(".drop-area");
const fileInput = document.getElementById("file-input");
const formContainer = document.querySelector(".form-container");
const uploadContainer = document.querySelector(".upload-container");

dropedImgHandler = new HandleUserImg(formContainer, fileInput, dropArea, uploadContainer);