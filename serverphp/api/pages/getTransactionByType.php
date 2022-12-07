<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $transactionCount = $_GET['transactionCount'];
        $type = $_GET['type'];
        $result = $global_page->getTransactionByType($id,$transactionCount,$type);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get transactions by page id success', 'totalPage'=>$result['totalPage'],'transactions'=>$result['transactions']]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>