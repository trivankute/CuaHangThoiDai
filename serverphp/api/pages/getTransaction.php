<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $transactionCount = $_GET['transactionCount'];
        $result = $global_page->getTransactionByPageId($id,$transactionCount);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get transactions by page id success', 'transactions'=>$result]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>