<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    use Cloudinary\Api\Upload\UploadApi;

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST'){
        $uploader = new UploadApi();
        try {
            $result = (new UploadApi())->upload($_FILES['avatar']["tmp_name"],["folder" => "cuahangthoidai/"]);
        }
        catch(Exception $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update load image onto cloudinary failed','token' => '']]);
            exit();
        }
        $global_account->setAvatar($result["secure_url"]);
        echo json_encode([
            'status'=>'success', 
            'data'=>[
                'msg'=>'Update avatar success',
            ]
        ]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>