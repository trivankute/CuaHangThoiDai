<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'DELETE') {
        $id = $_GET['id'];
        $global_account->deleteAccount($id);
        echo json_encode([
            'status'=>'success',
            'data'=>[
                'msg'=>"Delete user's account success",
            ]
        ]);
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>