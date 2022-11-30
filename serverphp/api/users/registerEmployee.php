<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/registerValidation.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    use Cloudinary\Api\Upload\UploadApi;
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'POST':    
            // get form-data from request body
            $body = [
                'email' => $_POST['email'],
                'username' => $_POST['username'],
                'password' => $_POST['password'],
                'role' => $_POST['role'],
            ];
            if($body['role'] != "employee") {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid role']]);
                exit();
            }
            else {
                $global_account->setInformation(
                    $body['email'],
                    $body['username'],
                    $body['password'],
                    $body['role']
                );
                if($global_account->register())
                {
                    $uploader = new UploadApi();
                    try {
                        $result = (new UploadApi())->upload($_FILES['avatar']["tmp_name"],["folder" => "cuahangthoidai/"]);
                    }
                    catch(Exception $e) {
                        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update load image onto cloudinary failed']]);
                        exit();
                    }
                    $global_account->setAvatar($result["secure_url"]);
                    echo json_encode(['status'=>'success', 'data'=>['msg'=>'Register success']]);
                    exit();
                }
                else {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>'Register failed']]);
                    exit();
                }
                break;
            }
        default:
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
            break;
    }
?>