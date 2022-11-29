<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    use Cloudinary\Api\Upload\UploadApi;
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $topic = $_POST['topic'];
        $headline = $_POST['headline'];
        $content = $_POST['content'];
        $avatar = $_FILES['image'];
        $employee_id = $global_account->getInformation()['id'];
        $global_blog->setInformation($topic, $headline,$content, $employee_id);
        if($global_blog->create()) {
            $uploader = new UploadApi();
            $result = (new UploadApi())->upload($avatar["tmp_name"],["folder" => "cuahangthoidai/"]);
            $global_blog->setAvatar($result["secure_url"]);
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Create blog success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Create blog failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>