<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $transactionId = $_GET['id'];
        $transaction = $global_transaction->getTransactionById($transactionId);
        if($transaction['type_of_shipping'] != "shipping") {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'This transaction is not shipping type']]);
        }
        else {
            $state = $global_transaction->getTransactionState($transactionId);
            if($state == "delivered") {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'This transaction is already delivered']]);
            }
            else {
                $result = $global_transaction->deleteTransactionAndRestoreQuantity($transactionId);
                if($result) {
                    echo json_encode(['status'=>'success', 'data'=>['msg'=>'Cancel transaction success']]);
                }
                else {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>'Cancel transaction failed']]);
                }
            }
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>