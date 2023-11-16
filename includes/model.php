<?php 
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];

        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
        if (!in_array($image['type'], $allowedTypes)) {
            http_response_code(400);
            $response = ['error' => 'Invalid file format. Please select a valid image.'];
            echo json_encode($response);
            exit;
        }

        if ($image['size'] > 5 * 1024 * 1024) { 
            http_response_code(400);
            $response = ['error' => 'File size is too large. Please select a smaller image(<=5MB).'];
            echo json_encode($response);
            exit;
        }

        //send image to permanent folder, generate URL and send it back to javascript:
        // $uploadDirectory = mkdir('/srv/http/image-uploader-master/uploads/');
        $uploadDirectory = '/srv/http/image-uploader-master/uploads/';

        if (move_uploaded_file($image['tmp_name'], $uploadDirectory . $image['name'])) {
            $imageURL = "/uploads/" . $image['name'];
            $responseData = ['imageURL' => $imageURL];
            echo json_encode($responseData);
            exit;
        } else {
            http_response_code(500);
            $response = ['error' => 'Error uploading the image! Please try again.'];
            echo json_encode($response);
            exit;
        }

    } else {
        http_response_code(400);
        $response = ['error' => 'Error uploading the image! Please try again.'];
        echo json_encode($response);
    }

}