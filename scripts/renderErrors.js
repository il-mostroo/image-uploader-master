export class RenderErrors {
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