<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));
        $transactionId = $_GET['id'];
        $deliverPartner = $body->deliverPartner;
        $result = $global_transaction->updateDeliverPartner($transactionId, $deliverPartner);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update shipping partner success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update shipping partner failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
    }
?>