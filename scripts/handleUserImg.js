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
    
    async handleDroppedImg(formContainer, dropArea, uploadContainer, url) {
        dropArea.addEventListener("drop", async (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];

            let validationErrors = this.isFileValid(file);
            if (validationErrors.length > 0) {
                this.renderErrorsInstance.renderErrors(validationErrors);
                validationErrors = [];
            } 
            else if (validationErrors.length === 0) {
                formContainer.style.display = "none";
                uploadContainer.style.display = "flex";
                const fetchResult = await this.uploadImg(file);
                if (fetchResult.error) {
                    const fetchErrors = [];
                    fetchErrors.push(fetchResult.error);
                    this.renderErrorsInstance.renderErrors(fetchErrors);
                    uploadContainer.style.display = "none";
                    formContainer.style.display = "flex";
                } else if (fetchResult.imageURL) {
                    const imageURL =  fetchResult.imageURL;
                    uploadContainer.style.display = "none";
                    const imageElement = document.createElement('img');
                    imageElement.src = imageURL;
                    imageElement.width = 300;
                    imageElement.height = 300;
                    document.body.appendChild(imageElement);
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
    
        return fetch("../includes/model.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            return data;
        });
    }
}

const dropArea = document.querySelector(".drop-area");
const fileInput = document.getElementById("file-input");
const formContainer = document.querySelector(".form-container");
const uploadContainer = document.querySelector(".upload-container");

dropedImgHandler = new HandleUserImg(formContainer, fileInput, dropArea, uploadContainer);