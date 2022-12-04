<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $transactionId = $_GET['id'];
        $transactionCount = $_GET['transactionCount'];
        $userId = $_GET['userId'];
        $currentUser = $global_account->getInformation();
        if($currentUser['role'] == 'customer') {
            if($currentUser['id'] == $userId) {
                $result = $global_page->getTransactionByUserId($transactionId,$userId,$transactionCount);
                echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get transactions by user id success (user)', 'transactions'=>$result]]);
            }
            else {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'You are not allowed to access this page']]);
                exit();
            }
        }
        else if($currentUser['role'] == 'employee' || $currentUser['role'] == 'admin') {
            $result = $global_page->getTransactionByUserId($transactionId,$userId,$transactionCount);
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get transactions by user id success (employee)', 'transactions'=>$result]]);
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'You are not allowed to access this page']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>