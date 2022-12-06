<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $id = $_GET['id'];
        $result = $global_account->deleteAccount($id);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Delete account success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Delete account failed']]);
            exit();
        }
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>