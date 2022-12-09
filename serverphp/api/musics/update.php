<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));
        $id = $_GET['id'];
        $musicLink = $body->musicLink;
        $title = $body->title;
        $result = $global_music->updateMusic($id,$musicLink,$title);
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update music success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update music failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>