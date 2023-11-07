<?php 
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $image = $_FILES['image'];

        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($image['type'], $allowedTypes)) {
            http_response_code(400);
            $response = ['error' => 'Invalid file format. Please select a valid image.'];
            echo json_encode($response);
            exit;
        }

        if ($image['size'] > 5 * 1024) { 
            http_response_code(400);
            $response = ['error' => 'File size is too large. Please select a smaller image(<=5MB).'];
            echo json_encode($response);
            exit;
        }

        http_response_code(200);
        $response = ['error' => 'Image received and is valid.'];
        echo json_encode($response);
    } else {
        http_response_code(400);
        $response = ['error' => 'Error uploading the image! Please try again.'];
        echo json_encode($response);
    }
}