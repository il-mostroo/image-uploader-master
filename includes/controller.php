<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ((isset($_FILES["image"]) && $_FILES["image"]["error"] === 0) || 
    (isset($_FILES["fileInput"]) && $_FILES["fileInput"]["error"] === 0)) {
        echo "successful";
    } else {
        echo "Invalid file or no file was provided.";
    }
}

