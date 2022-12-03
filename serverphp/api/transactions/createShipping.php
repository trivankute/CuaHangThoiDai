<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));  
        $typeOfTransaction = $body->typeOfTransaction;
        $typeOfShipping = $body->typeOfShipping;
        $receiverAddress = $body->receiverAddress;
        $deliverPartner = $body->deliverPartner;
        $receiverName = $body->receiverName;
        $receiverPhone = $body->receiverPhone;
        $totalPrice = $body->totalPrice;
        $products = $body->products;
        $user_id = $global_account->getInformation()['id'];
        $result = $global_transaction->createShippingTransaction(
            $typeOfTransaction, 
            $typeOfShipping,
            $user_id, 
            $receiverAddress, 
            $deliverPartner, 
            $receiverName, 
            $receiverPhone, 
            $totalPrice, 
            $products,
            null
        );
        if($result) {
            echo json_encode([
                    'status'=>'success', 'data'=>[
                        'msg'=>'Create shipping transaction success',
                        'transactionId' => $result
                    ]
                ]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Create shipping transaction failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>