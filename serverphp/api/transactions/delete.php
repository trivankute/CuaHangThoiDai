<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    
    if ($user_request_method == 'GET') {
        $transactionId = $_GET['id'];
        $result = $global_transaction->deleteTransactionById($transactionId);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Delete transaction by id success']]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>