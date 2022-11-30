<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));
        $typeOfTransaction = $body->typeOfTransaction;
        $typeOfShipping = $body->typeOfShipping;
        $customerId = $body->customerId;
        $totalPrice = $body->totalPrice;
        $products = $body->products;
        $user_id = $global_account->getInformation()['id'];
        $result = $global_transaction->createPickupTransaction(
            $typeOfTransaction, 
            $typeOfShipping,
            $customerId, 
            $user_id,
            $totalPrice, 
            $products
        );
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Create pickup transaction success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Create pickup transaction failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>