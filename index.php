<?php   
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style.css">
    <title>Image uploader</title>
</head>
<body>
    <div class="form-container">
        <form method="post" enctype="multipart/form-data">
            <p>Upload your image</p>
            <p>File should be Jpeg, Png,...</p>
            <div class="drop-area">
                <img src = "resources/image.svg"/>
                <p>Drag & Drop your image here</p>
            </div>
            <p>Or</p>
            <div class="file-input-container">
                <label for="file-input" class="file-label">Choose a file</label>
                <input type="file" id="file-input" name="file" accept=".jpg, .jpeg, .png" multiple>
            </div>
        </form>
    </div>
</body>
</html>