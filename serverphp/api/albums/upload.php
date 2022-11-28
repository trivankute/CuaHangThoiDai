<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/deserializeUser.php';
    include_once __DIR__ . '/../../middlewares/requireEmployee.php';
    use Cloudinary\Api\Upload\UploadApi;
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'POST') {
        $body = [
            'title' => $_POST['title'],
            'price' => $_POST['price'],
            'page' => $_POST['page'],
            'artistName' => $_POST['artistName'],
            'albumType' => $_POST['albumType'],
        ];
        $global_album->setInformation(
            $body['title'],
            $body['price'],
            $body['page'],
            $body['artistName'],
            $body['albumType']
        );
        if($global_album->create()) {
            $uploader = new UploadApi();
            $artistAvt = (new UploadApi())->upload($_FILES['artistAvatar']["tmp_name"],["folder" => "cuahangthoidai/"]);
            $albumAvt = (new UploadApi())->upload($_FILES['albumAvatar']["tmp_name"],["folder" => "cuahangthoidai/"]);
            $global_album->setAvatar($albumAvt["secure_url"], $artistAvt["secure_url"]);
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Create album success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Create album failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>