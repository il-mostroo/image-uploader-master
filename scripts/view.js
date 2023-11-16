export class View {

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

    renderErrors(errorsToRender) {
        const toastDiv = document.createElement('div');
        toastDiv.id = 'toast';
        errorsToRender.forEach(error => {
            const errorParagraph = document.createElement('p');
            errorParagraph.textContent = error;
            toastDiv.appendChild(errorParagraph);
        });
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            toastDiv.remove();
          }, 3000);
          
    }
}

