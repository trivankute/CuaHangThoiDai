<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $user = $global_account->getInformation();
        $body = json_decode(file_get_contents('php://input'));
        $userId = $user['id'];
        $transactionId = $_GET['id'];
        $state = $body->state;
        if($user['role'] == 'customer') {
            $result = $global_transaction->updateShippingTransactionStateByCustomer($userId,$transactionId, $state);
            if($result) {
                echo json_encode(['status' => 'success', 'data' => ['msg' => 'Update shipping state successfully']]);
                exit();
            }
            else {
                echo json_encode(['status' => 'error', 'data' => ['msg' => 'Update shipping state failed']]);
                exit();
            }
        }
        else if($user['role'] == 'employee') {
            $result = $global_transaction->updateShippingTransactionStateByEmployee($transactionId, $state);
            if($result) {
                echo json_encode(['status' => 'success', 'data' => ['msg' => 'Update shipping state successfully']]);
                exit();
            }
            else {
                echo json_encode(['status' => 'error', 'data' => ['msg' => 'Update shipping state failed']]);
                exit();
            }
        }
        else {
            echo json_encode(['status' => 'error', 'data' => ['msg' => 'You are not allowed to access this page']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
    }
?>