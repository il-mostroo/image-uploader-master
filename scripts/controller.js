import { View } from "./view.js";

class Controller {

    constructor(formContainer, fileInput, dropArea, uploadContainer,imageContainer, imageElement, URLElement, copyBtn) {
        this.view = new View(dropArea);
        this.handleSelectedImg(formContainer, fileInput, uploadContainer);
        this.handleDroppedImg(formContainer, dropArea, uploadContainer,imageContainer, imageElement, URLElement);
        this.copyContent(copyBtn, URLElement);
    }

    handleSelectedImg(formContainer, fileInput, uploadContainer) {
        fileInput.addEventListener("change", async (event) => {
            const file = event.target.files[0];
            
            let validationErrors = this.isFileValid(file);
            if (validationErrors.length > 0) {
                this.view.renderErrors(validationErrors);
                validationErrors = [];
            } 
            else if (validationErrors.length === 0) {
                formContainer.style.display = "none";
                uploadContainer.style.display = "flex";
                const fetchResult = await this.uploadImg(file);
                if (fetchResult.error) {
                    const fetchErrors = [];
                    fetchErrors.push(fetchResult.error);
                    this.view.renderErrors(fetchErrors);
                    uploadContainer.style.display = "none";
                    formContainer.style.display = "flex";
                } else if (fetchResult.imageURL) {
                    const imageURL =  fetchResult.imageURL;        
                    uploadContainer.style.display = "none";
                    imageContainer.style.display = "flex";
                    imageElement.src = imageURL;
                    URLElement.textContent = "http://localhost" + imageURL;
                }
            }
        });
    }
    
    async handleDroppedImg(formContainer, dropArea, uploadContainer,imageContainer, imageElement, URLElement) {
        dropArea.addEventListener("drop", async (event) => {
            event.preventDefault();
            const file = event.dataTransfer.files[0];

            let validationErrors = this.isFileValid(file);
            if (validationErrors.length > 0) {
                this.view.renderErrors(validationErrors);
                validationErrors = [];
            } 
            else if (validationErrors.length === 0) {
                formContainer.style.display = "none";
                uploadContainer.style.display = "flex";
                const fetchResult = await this.uploadImg(file);
                if (fetchResult.error) {
                    const fetchErrors = [];
                    fetchErrors.push(fetchResult.error);
                    this.view.renderErrors(fetchErrors);
                    uploadContainer.style.display = "none";
                    formContainer.style.display = "flex";
                } else if (fetchResult.imageURL) {
                    const imageURL =  fetchResult.imageURL;        
                    uploadContainer.style.display = "none";
                    imageContainer.style.display = "flex";
                    imageElement.src = imageURL;
                    URLElement.textContent = "http://localhost" + imageURL;
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
    
        return fetch("/image-uploader-master/includes/model.php", {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            return data;
        });
    }

    copyContent(copyBtn, URLElement) {
        copyBtn.addEventListener("click", () => {
            const text = URLElement.innerHTML;
            navigator.clipboard.writeText(text);
        })
    }
}

const dropArea = document.querySelector(".drop-area");
const fileInput = document.getElementById("file-input");
const formContainer = document.querySelector(".form-container");
const uploadContainer = document.querySelector(".upload-container");
const imageContainer = document.querySelector(".image-container");
const imageElement = document.querySelector(".uploaded-image");
const URLElement = document.querySelector(".link");
const copyBtn = document.querySelector('.link-container > input');

const controller = new Controller(formContainer, fileInput, dropArea, uploadContainer,imageContainer, imageElement, URLElement, copyBtn);
