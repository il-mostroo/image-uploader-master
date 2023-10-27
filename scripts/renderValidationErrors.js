export class RenderValidationErrors {
    renderErrors(errorsToRender) {
        const toastDiv = document.createElement('div');
        toastDiv.id = 'toast';
        errorsToRender.forEach(error => {
            const errorParagraph = document.createElement('p');
            errorParagraph.textContent = error;
            toastDiv.appendChild(errorParagraph);
        });
        document.body.appendChild(toastDiv);
        toastDiv.className = "show";
        setTimeout(() => {
            toastDiv.className = toastDiv.className.replace("show", "");
          }, 3000);
          
    }
}