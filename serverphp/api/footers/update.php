<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));
        $phone = $body->phone;
        $email = $body->email;
        $address = $body->address;
        $result = $global_footer->updateFooter($phone,$email,$address);
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update footer config success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update footer config failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>