<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    use Cloudinary\Api\Upload\UploadApi;
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'POST') {
        $id = $_GET['id'];
        $title = $_POST['title'];
        $price = $_POST['price'];
        $quantity = $_POST['quantity'];
        $albumType = $_POST['albumType'];
        $quantity = $_POST['quantity'];
        //updateAlbumById($albumId, $title, $price, $avatar, $albumType, $quantity)
        $result = $global_album->updateAlbumById($id, $title, $price, null,$albumType, $quantity);
        if($result) {
            $uploader = new UploadApi();
            try {
                $albumAvt = (new UploadApi())->upload($_FILES['albumAvatar']["tmp_name"],["folder" => "cuahangthoidai/"]);
            }
            catch(Exception $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update load image onto cloudinary failed']]);
                exit();
            }
            $global_album->setAlbumAvatarForUpdate($title, $albumType, $albumAvt["secure_url"]);
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update album success']]);
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update album failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>