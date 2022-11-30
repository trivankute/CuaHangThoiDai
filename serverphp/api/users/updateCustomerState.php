<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $id = $_GET['id'];
        $body = json_decode(file_get_contents('php://input'));
        $state = $body->state;
        $result = $global_account->updateCustomerState($id,$state);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update customer state success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update customer state failed']]);
            exit();
        }
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>